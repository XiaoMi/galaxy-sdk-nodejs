/**
 * Created by lshangq on 15-4-7.
 */
var sdsException = require('./sds_exception');
var errorsTypes = require('../sds/Errors_types');
var commonTypes = require('../sds/Common_types');
var httpConnection = require('./sds_http_connection');
var authServiceClient = require('../sds/AuthService');
var adminServiceClient = require('../sds/AdminService');
var tableServiceClient = require('../sds/TableService');

var clientMethodMap = {
  AuthServiceClient: ['getServerVersion', 'validateClientVersion', 'getServerTime',
    'createCredential'],
  AdminServiceClient: ['getServerVersion', 'validateClientVersion', 'getServerTime',
    'saveAppInfo', 'getAppInfo', 'findAllApps', 'findAllTables', 'createTable', 'dropTable',
    'lazyDropTable', 'alterTable', 'cloneTable', 'disableTable', 'enableTable', 'describeTable',
    'getTableState', 'getTableSplits', 'queryMetric', 'queryMetrics', 'findAllAppInfo'],
  TableServiceClient: ['getServerVersion', 'validateClientVersion', 'getServerTime',
    'get', 'put', 'increment', 'remove', 'scan', 'batch']
};


var ClientFactory = exports.ClientFactory = function (credential, retryIfOperationTimeout,
                                                      thriftProtocol) {
  this.credential = credential;
  this.retryIfOperationTimeout = retryIfOperationTimeout == undefined ?
    false : retryIfOperationTimeout;
  this.thriftProtocol = thriftProtocol == undefined ?
    commonTypes.ThriftProtocol.TBINARY : thriftProtocol;
};

ClientFactory.prototype.newDefaultAuthClient = function () {
  var url = commonTypes.DEFAULT_SERVICE_ENDPOINT + commonTypes.AUTH_SERVICE_PATH;
  var timeout = commonTypes.DEFAULT_CLIENT_TIMEOUT;
  return new RetriableProxy(this.credential, this.retryIfOperationTimeout, url, timeout, false,
    authServiceClient, 'AuthServiceClient', this.thriftProtocol);
};

ClientFactory.prototype.newAuthClient = function (url, timeout, supportAccountKey) {
  var supportAccountKey_ = supportAccountKey == undefined ? false : supportAccountKey;
  return new RetriableProxy(this.credential, this.retryIfOperationTimeout, url, timeout,
    supportAccountKey_, authServiceClient, 'AuthServiceClient', this.thriftProtocol);
};

ClientFactory.prototype.newDefaultAdminClient = function () {
  var url = commonTypes.DEFAULT_SERVICE_ENDPOINT + commonTypes.ADMIN_SERVICE_PATH;
  var timeout = commonTypes.DEFAULT_ADMIN_CLIENT_TIMEOUT;
  return new RetriableProxy(this.credential, this.retryIfOperationTimeout, url, timeout, false,
    adminServiceClient, 'AdminServiceClient', this.thriftProtocol);
};

ClientFactory.prototype.newAdminClient = function (url, timeout, supportAccountKey) {
  var supportAccountKey_ = supportAccountKey == undefined ? false : supportAccountKey;
  return new RetriableProxy(this.credential, this.retryIfOperationTimeout, url, timeout,
    supportAccountKey_, adminServiceClient, 'AdminServiceClient', this.thriftProtocol);
};

ClientFactory.prototype.newDefaultTableClient = function () {
  var url = commonTypes.DEFAULT_SERVICE_ENDPOINT + commonTypes.TABLE_SERVICE_PATH;
  var timeout = commonTypes.DEFAULT_CLIENT_TIMEOUT;
  return new RetriableProxy(this.credential, this.retryIfOperationTimeout, url, timeout, false,
    tableServiceClient, 'TableServiceClient', this.thriftProtocol);
};

ClientFactory.prototype.newTableClient = function (url, timeout, supportAccountKey) {
  var supportAccountKey_ = supportAccountKey == undefined ? false : supportAccountKey;
  return new RetriableProxy(this.credential, this.retryIfOperationTimeout, url, timeout,
    supportAccountKey_, tableServiceClient, 'TableServiceClient', this.thriftProtocol);
};

var backOffTime = function (errorCode) {
  if (errorsTypes.ERROR_BACKOFF[errorCode] !== undefined) {
    return errorsTypes.ERROR_BACKOFF[errorCode];
  } else {
    return -1;
  }
};

var S4 =  function() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1).toLowerCase();
};

var retryInvoke = function (proxy, cls, args, callback, method, methodName, retryTime) {
  var connection = proxy.getHttpConnection();
  connection.setQueryStr('id=' + S4() + S4() + '&type=' + methodName);
  var client = httpConnection.createHttpClient(cls, connection);
  var fixedArgs = [];
  for (var i = 0; i < args.length; i++) {
    fixedArgs.push(args[i]);
  }
  args.push(function (error, result) {
    if (error) {
      var sleepMs = backOffTime(error.errorCode);
      if (retryTime >= errorsTypes.MAX_RETRY || sleepMs < 0) {
        callback(sdsException.createServiceException('service', error.errorCode,
          error.errorMessage, error.details, error.callId, error.requestId), result);
      } else {
        setTimeout(function () {
          retryInvoke(proxy, cls, fixedArgs, callback, method, methodName,
              retryTime + 1);
        }, sleepMs << retryTime);
      }
    } else {
      callback(error, result);
    }
  });
  connection.once('error', function (err) {
    if (err.name === 'SdsException') {
      var sleepMs = backOffTime(err.errorCode);
      if (retryTime >= errorsTypes.MAX_RETRY || sleepMs < 0) {
        callback(err, null);
      } else {
        setTimeout(function () {
          retryInvoke(proxy, cls, fixedArgs, callback, method, methodName,
              retryTime + 1);
        }, sleepMs << retryTime);
      }
    } else {
      callback(err, null);
    }
  });
  method.apply(client, args);
};

var RetriableProxy = function (credential, retryIfOperationTimeout, url, timeout, supportAccountKey,
                               cls, serviceType, thriftProtocol) {
  this.credential = credential;
  this.retryIfOperationTimeout = retryIfOperationTimeout;
  this.url = url;
  this.timeout = timeout;
  this.supportAccountKey = supportAccountKey;
  this.thriftProtocol = thriftProtocol;
  for (var p in clientMethodMap[serviceType]) {
    var methodName = clientMethodMap[serviceType][p];
    RetriableProxy.prototype[methodName] = makeRetryInvoke(this, cls, methodName);
  }
};

var makeRetryInvoke = function (proxy, cls, methodName) {
  return function () {
    var callback = arguments[arguments.length - 1];
    var args = [];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }
    retryInvoke(proxy, cls, args, callback, cls.Client.prototype[methodName], methodName, 0);
  };
};

RetriableProxy.prototype.getHttpConnection = function () {
  var connection = httpConnection.createSdsHttpConnection(this.url, this.credential,
    this.timeout, this.thriftProtocol);
  connection.setRetryIfOperationTimeout(this.retryIfOperationTimeout);
  connection.setSupportAccountKey(this.supportAccountKey);
  return connection;
};
