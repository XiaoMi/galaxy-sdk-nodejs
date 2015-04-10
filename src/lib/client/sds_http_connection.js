/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var crypto = require('crypto');
var util = require('util');
var url = require('url');
var http = require('http');
var https = require('https');
var EventEmitter = require("events").EventEmitter;
var thrift = require('thrift');
var authenticationTypes = require('../sds/Authentication_types');
var errorType = require('../sds/Errors_types');
var sdsException = require('./sds_exception');
var commonTypes = require('../sds/Common_types');
/**
 * @class
 * @name ConnectOptions
 * @property {string} transport - The Thrift layered transport to use (TBufferedTransport, etc).
 * @property {string} protocol - The Thrift serialization protocol to use (TBinaryProtocol, etc.).
 * @property {string} path - The URL path to POST to (e.g. "/", "/mySvc", "/thrift/quoteSvc", etc.).
 * @property {object} headers - A standard Node.js header hash, an object hash containing key/value
 *        pairs where the key is the header name string and the value is the header value string.
 * @property {boolean} https - True causes the connection to use https, otherwise http is used.
 * @property {object} nodeOptions - Options passed on to node.
 * @example
 *     //Use a connection that requires ssl/tls, closes the connection after each request,
 *     //  uses the buffered transport layer, uses the JSON protocol and directs RPC traffic
 *     //  to https://thrift.example.com:9090/hello
 *     var thrift = require('thrift');
 *     var options = {
 *        transport: thrift.TBufferedTransport,
 *        protocol: thrift.TJSONProtocol,
 *        path: "/hello",
 *        headers: {"Connection": "close"},
 *        https: true
 *     };
 *     var con = thrift.createHttpConnection("thrift.example.com", 9090, options);
 *     var client = thrift.createHttpClient(myService, connection);
 *     client.myServiceFunction();
 */

/**
 * Initializes a Thrift HttpConnection instance (use createHttpConnection() rather than
 *    instantiating directly).
 * @constructor
 * @param {string} host - The host name or IP to connect to.
 * @param {number} port - The TCP port to connect to.
 * @param {ConnectOptions} options - The configuration options to use.
 * @throws {error} Exceptions other than ttransport.InputBufferUnderrunError are rethrown
 * @event {error} The "error" event is fired when a Node.js error event occurs during
 *     request or response processing, in which case the node error is passed on. An "error"
 *     event may also be fired when the connectison can not map a response back to the
 *     appropriate client (an internal error), generating a TApplicationException.
 * @classdesc HttpConnection objects provide Thrift end point transport
 *     semantics implemented over the Node.js http.request() method.
 * @see {@link createHttpConnection}
 */
var HttpConnection = exports.HttpConnection = function (host, port, options, credential) {
  //Initialize the emitter base object
  EventEmitter.call(this);

  //Set configuration
  var self = this;
  this.options = options || {};
  this.host = host;
  this.port = port;
  this.https = this.options.https || false;
  this.transport = this.options.transport || thrift.TBufferedTransport;
  this.protocol = this.options.protocol || thrift.TBinaryProtocol;
  this.timeout = -1;
  this.credential = credential;
  this.supportAccountKey = false;
  this.retryIfOperationTimeout = false;
  this.clockOffset = 0;
  //Prepare Node.js options
  this.nodeOptions = {
    host: this.host,
    port: this.port || 80,
    path: this.options.path || '/',
    method: 'POST',
    headers: this.options.headers || {}
  };
  for (var attrname in this.options.nodeOptions) {
    this.nodeOptions[attrname] = this.options.nodeOptions[attrname];
  }
  /*jshint -W069 */
  if (!this.nodeOptions.headers["Connection"]) {
    this.nodeOptions.headers["Connection"] = "keep-alive";
  }
  /*jshint +W069 */

  //The sequence map is used to map seqIDs back to the
  //  calling client in multiplexed scenarios
  this.seqId2Service = {};

  function decodeCallback(transport_with_data) {
    var proto = new self.protocol(transport_with_data);
    try {
      while (true) {
        var header = proto.readMessageBegin();
        var dummy_seqid = header.rseqid * -1;
        var client = self.client;
        //The Multiplexed Protocol stores a hash of seqid to service names
        //  in seqId2Service. If the SeqId is found in the hash we need to
        //  lookup the appropriate client for this call.
        //  The client var is a single client object when not multiplexing,
        //  when using multiplexing it is a service name keyed hash of client
        //  objects.
        //NOTE: The 2 way interdependencies between protocols, transports,
        //  connections and clients in the Node.js implementation are irregular
        //  and make the implementation difficult to extend and maintain. We
        //  should bring this stuff inline with typical thrift I/O stack
        //  operation soon.
        //  --rareq.setTimeout(1);
        var service_name = self.seqId2Service[header.rseqid];
        if (service_name) {
          client = self.client[service_name];
          delete self.seqId2Service[header.rseqid];
        }
        /*jshint -W083 */
        client._reqs[dummy_seqid] = function (err, success) {
          transport_with_data.commitPosition();
          var clientCallback = client._reqs[header.rseqid];
          delete client._reqs[header.rseqid];
          if (clientCallback) {
            clientCallback(err, success);
          }
        };
        /*jshint +W083 */
        if (client['recv_' + header.fname]) {
          client['recv_' + header.fname](proto, header.mtype, dummy_seqid);
        } else {
          delete client._reqs[dummy_seqid];
          self.emit("error",
            new thrift.Thrift.TApplicationException(
              thrift.Thrift.TApplicationExceptionType.WRONG_METHOD_NAME,
              "Received a response to an unknown RPC function"));
        }
      }
    }
    catch (e) {
      if (e instanceof thrift.InputBufferUnderrunError) {
        transport_with_data.rollbackPosition();
      } else {
        console.log(e);
        throw e;
      }
    }
  }

  //Response handler
  //////////////////////////////////////////////////
  this.responseCallback = function (response) {
    var data = [];
    var dataLen = 0;

    response.on('error', function (e) {
      self.emit("error", e);
    });

    response.on('data', function (chunk) {
      data.push(chunk);
      dataLen += chunk.length;
    });

    response.on('end', function () {
      var buf = new Buffer(dataLen);
      for (var i = 0, len = data.length, pos = 0; i < len; i++) {
        data[i].copy(buf, pos);
        pos += data[i].length;
      }
      if (response.statusCode === errorType.HttpStatusCode.CLOCK_TOO_SKEWED) {
        var now = Math.floor(Date.now() / 1000);
        var serverTime = response.headers['x-xiaomi-timestamp']
        self.clockOffset = serverTime - now;
      }
      if (response.statusCode !== 200) {
        self.emit("error", sdsException.createTransportException('transport',
          response.statusCode, response.statusMessage));
      } else {
        //Get thre receiver function for the transport and
        //  call it with the buffer
        self.transport.receiver(decodeCallback)(buf);
      }
    });
  };
};
util.inherits(HttpConnection, EventEmitter);


HttpConnection.prototype.getAuthenticationHeaders = function (data) {
  var self = this;
  var headers = new Array(authenticationTypes.HK_HOST, authenticationTypes.HK_TIMESTAMP,
    authenticationTypes.HK_CONTENT_MD5);
  var md5Str = crypto.createHash('md5').update(data).digest('hex');
  var timestamp = '' + Math.floor(Date.now() / 1000);
  self.nodeOptions.headers[authenticationTypes.HK_HOST] = self.host;
  self.nodeOptions.headers[authenticationTypes.HK_TIMESTAMP] =
    '' + (Math.floor(Date.now() / 1000) + self.clockOffset);
  self.nodeOptions.headers[authenticationTypes.HK_CONTENT_MD5] = md5Str;
  var values = new Array(self.host, timestamp, md5Str);
  var signData = values.join('\n');
  var sign = crypto.createHmac('sha1', self.credential.secretKey).update(signData).digest('hex');
  var authHeader = new authenticationTypes.HttpAuthorizationHeader();
  authHeader.algorithm = authenticationTypes.MacAlgorithm.HmacSHA1;
  authHeader.signedHeaders = headers;
  authHeader.userType = self.credential.type;
  authHeader.secretKeyId = self.credential.secretKeyId;
  authHeader.signature = sign;
  authHeader.supportAccountKey = self.supportAccountKey;
  var bt = new thrift.TBufferedTransport();
  var protocol = new thrift.TJSONProtocol(bt);
  authHeader.write(protocol);
  self.nodeOptions.headers[authenticationTypes.HK_AUTHORIZATION] = bt.outBuffers.toString();
};

HttpConnection.prototype.addHeader = function (key, value) {
  var self = this;
  self.nodeOptions.headers[key] = value;
};

HttpConnection.prototype.setTimeout = function (timeout) {
  var self = this;
  self.timeout = timeout;
};

HttpConnection.prototype.setRetryIfOperationTimeout = function (retryIfOperationTimeout) {
  var self = this;
  self.retryIfOperationTimeout = retryIfOperationTimeout;
};

HttpConnection.prototype.setSupportAccountKey = function (supportAccountKey) {
  var self = this;
  self.supportAccountKey = supportAccountKey;
};

HttpConnection.prototype.setQueryStr = function (queryStr) {
  var self = this;
  self.nodeOptions.path = self.nodeOptions.path + '?' + queryStr;
};


/**
 * Writes Thrift message data to the connection
 * @param {Buffer} data - A Node.js Buffer containing the data to write
 * @returns {void} No return value.
 * @event {error} the "error" event is raised upon request failure passing the
 *     Node.js error object to the listener.
 */
HttpConnection.prototype.write = function (data) {
  var self = this;
  self.nodeOptions.headers["Content-length"] = data.length;
  self.nodeOptions['timeout'] = this.timeout;
  self.getAuthenticationHeaders(data);
  self.retryRequest(0, data);
};

HttpConnection.prototype.retryRequest = function (retryTime, data) {
  var self = this;
  var isTimeout = false;
  var req = (self.https) ?
    self.httpsRequest(self.nodeOptions, self.responseCallback) :
    self.httpRequest(self.nodeOptions, self.responseCallback);
  req.on('error', function (err) {
    if (isTimeout) {
      if (retryTime < 3 && self.retryIfOperationTimeout) {
        self.retryRequest(retryTime + 1, data);
      } else {
        self.emit('error', sdsException.createTransportException('transport', 0,
            "Request Timeout, " + err.message));
      }
    } else {
      self.emit("error", sdsException.createTransportException('transport', 0, err.message));
    }
  });
  req.on('timeout', function () {
    isTimeout = true;
    req.abort();
  });
  req.write(data);
  req.end();
};


function requestWithTimeout(_request) {
  return function (options, callback) {
    var timeout = options['timeout'], timeoutEventId;
    var req = _request(options, function (res) {
      res.on('end', function () {
        clearTimeout(timeoutEventId);
      });

      res.on('close', function () {
        clearTimeout(timeoutEventId);
      });

      res.on('error', function () {
        clearTimeout(timeoutEventId);
      });
      callback(res);
    });

    timeout && (timeoutEventId = setTimeout(function () {
      req.emit('timeout', {message: 'have been timeout...'});
    }, timeout));

    req.on('error', function () {
      clearTimeout(timeoutEventId);
    });
    return req;
  };
}

HttpConnection.prototype.httpRequest = requestWithTimeout(http.request);

HttpConnection.prototype.httpsRequest = requestWithTimeout(https.request);
//

/**
 * Creates a new HttpConnection object, used by Thrift clients to connect
 *    to Thrift HTTP based servers.
 * @param {string} host - The host name or IP to connect to.
 * @param {number} port - The TCP port to connect to.
 * @param {ConnectOptions} options - The configuration options to use.
 * @returns {HttpConnection} The connection object.
 * @see {@link ConnectOptions}
 */
exports.createHttpConnection = function (host, port, options, credencial) {
  return new HttpConnection(host, port, options, credencial);
};

exports.createSdsHttpConnection = function (url_, credential, timeout) {
  var isHttps = false;
  var parse = url.parse(url_);
  var scheme = parse['protocol'];
  var port = parse['port'];
  if (port === null) {
    if (scheme === 'http:') {
      port = 80;
    } else if (scheme === 'https:') {
      isHttps = true;
      port = 443;
    } else {
      throw new Error("Unsupported scheme: " + scheme);
    }
  }
  var host = parse['hostname'];
  var path = parse['path'];
  var options = {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol,
    path: path,
    headers: {"Connection": "close"},
    https: isHttps
  };
  options.headers['User-Agent'] = 'Node.js/THttpClient';
  options.headers['Content-Type'] = commonTypes.THRIFT_BINARY_HEADER;
  options.headers['Accept'] = commonTypes.THRIFT_BINARY_HEADER;
  var connection = new HttpConnection(host, port, options, credential);
  connection.setTimeout(timeout);
  return connection;
};


/**
 * Creates a new client object for the specified Thrift service.
 * @param {object} cls - The module containing the service client
 * @param {HttpConnection} httpConnection - The connection to use.
 * @returns {object} The client object.
 * @see {@link createHttpConnection}
 */
exports.createHttpClient = function (cls, httpConnection) {
  if (cls.Client) {
    cls = cls.Client;
  }
  httpConnection.client =
    new cls(new httpConnection.transport(undefined, function (buf) {
        httpConnection.write(buf);
      }),
      httpConnection.protocol);
  return httpConnection.client;
};

