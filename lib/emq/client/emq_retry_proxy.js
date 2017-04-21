/**
 * Created by haxiaolin on 17-4-17.
 */
var thrift = require('../../thrift');
var crypto = require('crypto');
var url = require('url');
var emq_http_client = require('./emq_http_client')
var commonTypes = require('../Common_types')

var clientMethodMap = {
  QueueService: ['createQueue', 'deleteQueue', 'purgeQueue', 'setQueueAttribute',
    'setQueueQuota', 'getQueueInfo', 'listQueue', 'setQueueRedrivePolicy', 'removeQueueRedrivePolicy',
    'setPermission', 'revokePermission', 'queryPermission', 'queryPermissionForId', 'listPermissions',
    'createTag', 'deleteTag', 'getTagInfo', 'listTag', 'queryPrivilegedQueue', 'copyQueue', 'getQueueMeta'],
  MessageService: ['sendMessage', 'sendMessageBatch', 'receiveMessage', 'changeMessageVisibilitySeconds',
    'changeMessageVisibilitySecondsBatch', 'deleteMessage', 'deleteMessageBatch', 'deadMessage',
    'deadMessageBatch']
};

var RetryProxy = exports.RetryProxy =
  function (credential, url, cls, serviceType, socketTimeout, retryIfSocketTimeout, maxRetryIfSocketTimeout) {
    this.credential = credential;
    this.url = url;
    this.socketTimeout = socketTimeout;
    this.retryIfSocketTimeout = retryIfSocketTimeout;
    this.maxRetryIfSocketTimeout = maxRetryIfSocketTimeout;
    for (var p in clientMethodMap[serviceType]) {
      var methodName = clientMethodMap[serviceType][p];
      RetryProxy.prototype[methodName] = makeRetryInvoke(this, cls, methodName);
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

var retryInvoke = function (proxy, cls, args, callback, method, methodName, retryTime) {
  var connection = proxy.createEMQHttpClient();
  connection.appendPath('id=' + S4() + S4() + "&type=" + methodName);
  var client = emq_http_client.createHttpClient(cls, connection);
  var fixedArgs = [];
  for (var i = 0; i < args.length; i++) {
    fixedArgs.push(args[i]);
  }
  args.push(function (error, result) {
    if (error) {
      var sleepMs = commonTypes.ERROR_BACKOFF[error.errorCode] / 1000.0 * (1 << retryTime);
      if (sleepMs > 0 && retryTime < 3) {
        setTimeout(function () {
          retryInvoke(proxy, cls, fixedArgs, callback, method, methodName,
            retryTime + 1);
        }, sleepMs);
      } else {
        callback(new commonTypes.GalaxyEmqServiceException(error), result);
      }
    }
    else {
      callback(error, result);
    }
  });
  connection.once('error', function (err) {
    if (err.name === 'GalaxyEmqServiceException') {
      var sleepMs = commonTypes.ERROR_BACKOFF[err.errorCode] / 1000.0 * (1 << retryTime);
      if (sleepMs > 0 && retryTime < 3) {
        setTimeout(function () {
          retryInvoke(proxy, cls, fixedArgs, callback, method, methodName,
            retryTime + 1);
        }, sleepMs);
      }
    } else {
      callback(err, null);
    }
  });
  method.apply(client, args);
};

RetryProxy.prototype.createEMQHttpClient = function () {
  return emq_http_client.createEMQHttpConnection(this.url, this.socketTimeout, this.credential,
    this.retryIfSocketTimeout, this.maxRetryIfSocketTimeout);
};

var S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1).toLowerCase();
};