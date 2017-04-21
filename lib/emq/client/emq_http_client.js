/**
 * Created by haxiaolin on 17-4-18.
 * Copied from thrift/http_connection.js
 */
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
var util = require('util');
var http = require('http');
var https = require('https');
var EventEmitter = require("events").EventEmitter;
var thrift = require('../../thrift');
var constants = require('../Constants_types')
var crypto = require('crypto');
var url = require('url');

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
var HttpConnection = exports.HttpConnection = function (host, port, options, credential,
                                                        retryIfSocketTimeout, maxRetryIfSocketTimeout) {
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
  this.credential = credential;
  this.retryIfSocketTimeout = retryIfSocketTimeout;
  this.maxRetryIfSocketTimeout = maxRetryIfSocketTimeout;

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
        //  --ra
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
            new thrift.TApplicationException(
              thrift.TApplicationExceptionType.WRONG_METHOD_NAME,
              "Received a response to an unknown RPC function"));
        }
      }
    }
    catch (e) {
      if (e instanceof thrift.InputBufferUnderrunError) {
        transport_with_data.rollbackPosition();
      } else {
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
      //Get thre receiver function for the transport and
      //  call it with the buffer
      self.transport.receiver(decodeCallback)(buf);
    });
  };
};
util.inherits(HttpConnection, EventEmitter);

/**
 * Writes Thrift message data to the connection
 * @param {Buffer} data - A Node.js Buffer containing the data to write
 * @returns {void} No return value.
 * @event {error} the "error" event is raised upon request failure passing the
 *     Node.js error object to the listener.
 */
HttpConnection.prototype.write = function (data) {
  var self = this;
  self.nodeOptions['timeout'] = this.timeout;
  self.setEMQHeaders(data);
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
      if (retryTime < self.maxRetryIfSocketTimeout && self.retryIfSocketTimeout) {
        self.retryRequest(retryTime + 1, data);
      } else {
        self.emit('error', new Error("Request Timeout, " + err.message));
      }
    } else {
      self.emit("error", new Error(err.message));
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

/**
 * Creates a new HttpConnection object, used by Thrift clients to connect
 *    to Thrift HTTP based servers.
 * @param {string} host - The host name or IP to connect to.
 * @param {number} port - The TCP port to connect to.
 * @param {ConnectOptions} options - The configuration options to use.
 * @returns {HttpConnection} The connection object.
 * @see {@link ConnectOptions}
 */
exports.createHttpConnection = function (host, port, options) {
  return new HttpConnection(host, port, options);
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

HttpConnection.prototype.setEMQHeaders = function (data) {
  this.setHeader(data);
  this.authHeaders();
}
var clockOffset = 0
HttpConnection.prototype.setHeader = function (data) {
  var self = this;
  self.nodeOptions.headers[constants.HOST] = self.host;
  self.nodeOptions.headers[constants.CONTENT_TYPE] =
    "application/x-thrift-binary";
  var timestamp = '' + (Math.floor(Date.now() / 1000) + clockOffset);
  self.nodeOptions.headers[constants.TIMESTAMP] = timestamp;
  var date = new Date();
  self.nodeOptions.headers[constants.MI_DATE] = date.toUTCString();
  self.nodeOptions.headers[constants.CONTENT_LENGTH] = data.length;
  var md5Str = crypto.createHash('md5').update(data).digest('hex');
  self.nodeOptions.headers[constants.CONTENT_MD5] = md5Str;
}

HttpConnection.prototype.authHeaders = function () {
  var self = this;
  var stringArray = [];
  stringArray.push('POST\n');
  stringArray.push(self.nodeOptions.headers[constants.CONTENT_MD5]);
  stringArray.push('\n');
  stringArray.push(self.nodeOptions.headers[constants.CONTENT_TYPE]);
  stringArray.push('\n\n');
  stringArray.push(self.canonicalizeXiaomiHeaders());
  stringArray.push(self.canonicalizeResource());
  var stringToSign = stringArray.join('');
  var signBytes = crypto.createHmac('sha1', self.credential.secretKey).update(stringToSign).digest();
  self.nodeOptions.headers[constants.AUTHORIZATION] = 'Galaxy-V2 ' +
    self.credential.secretKeyId + ":" + new Buffer(signBytes).toString('base64');
};

HttpConnection.prototype.canonicalizeXiaomiHeaders = function () {
  var self = this;
  if (!self.nodeOptions.headers) {
    return ''
  }
  var canonicalizedHeaders = {};
  var canonicalizedKeys = [];
  for (var key in self.nodeOptions.headers) {
    var lowerKey = key.toLowerCase();
    if (lowerKey.indexOf(constants.XIAOMI_HEADER_PREFIX) === 0) {
      canonicalizedKeys.push(lowerKey);
      if (isArray(self.nodeOptions.headers[key])) {
        canonicalizedHeaders[lowerKey] = '';
        for (var k in self.nodeOptions.headers[key]) {
          canonicalizedHeaders[lowerKey] = canonicalizedHeaders[lowerKey] +
            self.nodeOptions.headers[key][k];
          if (k < self.nodeOptions.headers[key].length - 1) {
            canonicalizedHeaders[lowerKey] = canonicalizedHeaders[lowerKey] + ',';
          }
        }
      } else {
        canonicalizedHeaders[lowerKey] = self.nodeOptions.headers[key];
      }
    }
  }
  var result = '';
  var sortedKeys = canonicalizedKeys.sort();
  for (var k in sortedKeys) {
    result += sortedKeys[k] + ':' + canonicalizedHeaders[sortedKeys[k]] + '\n';
  }
  return result;
};

var isArray = function (o) {
  return Object.prototype.toString.call(o) == '[object Array]';
};

exports.createEMQHttpConnection = function (url_, socketTimeout, credential, retryIfSocketTimeout, maxRetryIfSocketTimeout) {
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
    headers: {
      // "Connection": "close",
      "User-Agent": "Node.js/THttpClient",
    },
    https: isHttps,
    timeout: socketTimeout
  };
  return new HttpConnection(host, port, options, credential, retryIfSocketTimeout, maxRetryIfSocketTimeout);
};

HttpConnection.prototype.appendPath = function (append) {
  var self = this;
  self.nodeOptions.path = self.nodeOptions.path + '?' + append;
};

HttpConnection.prototype.canonicalizeResource = function () {
  var self = this;
  var subresource = ['acl', 'quota', 'uploads', 'partNumber', 'uploadId', 'storageAccessToken', 'metadata'];
  var parse = url.parse(self.nodeOptions.path);
  var result = self.nodeOptions.path.split('?')[0];
  var query = parse.query;
  if (query) {
    var queryArgs = query.split('&');
    queryArgs = queryArgs.sort();
    var i = 0;
    for (var k in queryArgs) {
      var key = queryArgs[k].split('=');
      if (subresource.indexOf(key[0]) != -1) {
        if (i == 0) {
          result += '?';
        } else {
          result += '&';
        }
        if (key.length == 1) {
          result += key[0];
        } else {
          result += key[0] + "=" + key[1];
        }
        i++;
      }
    }
  }
  return result;
};