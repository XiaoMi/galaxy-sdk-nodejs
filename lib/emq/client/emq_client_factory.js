/**
 * Created by haxiaolin on 17-4-17.
 */
var constants = require('../Constants_types')
var queueServiceClient = require('../QueueService')
var messageServiceClient = require('../MessageService')
var retryProxy = require('./emq_retry_proxy')

var ClientFactory = exports.ClientFactory = function (credential) {
  this.credential = credential;
};

ClientFactory.prototype.newDefaultQueueClient = function () {
  var url = constants.DEFAULT_SERVICE_ENDPOINT + constants.QUEUE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, queueServiceClient, 'QueueService',
    constants.DEFAULT_CLIENT_SOCKET_TIMEOUT, false, 0);
};

ClientFactory.prototype.newDefaultMessageClient = function () {
  var url = constants.DEFAULT_SERVICE_ENDPOINT + constants.MESSAGE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, messageServiceClient, 'MessageService',
    constants.DEFAULT_CLIENT_SOCKET_TIMEOUT, false, 0);
};

ClientFactory.prototype.newQueueClient = function (endpoint) {
  var url = endpoint + constants.QUEUE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, queueServiceClient, 'QueueService',
    constants.DEFAULT_CLIENT_SOCKET_TIMEOUT, false, 0);
};

ClientFactory.prototype.newMessageClient = function (endpoint) {
  var url = endpoint + constants.MESSAGE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, messageServiceClient, 'MessageService',
    constants.DEFAULT_CLIENT_SOCKET_TIMEOUT, false, 0);
};

ClientFactory.prototype.newQueueClient = function (endpoint, socketTimeout) {
  var url = endpoint + constants.QUEUE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, queueServiceClient, 'QueueService',
    socketTimeout, false, 0);
};

ClientFactory.prototype.newMessageClient = function (endpoint, socketTimeout) {
  var url = endpoint + constants.MESSAGE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, messageServiceClient, 'MessageService',
    socketTimeout, false, 0);
};

ClientFactory.prototype.newQueueClient = function (endpoint, retryIfSocketTimeout, maxRetryIfSocketTimeout) {
  var url = endpoint + constants.QUEUE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, queueServiceClient, 'QueueService',
    constants.DEFAULT_CLIENT_SOCKET_TIMEOUT, retryIfSocketTimeout, maxRetryIfSocketTimeout);
};

ClientFactory.prototype.newMessageClient = function (endpoint, retryIfSocketTimeout, maxRetryIfSocketTimeout) {
  var url = endpoint + constants.MESSAGE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, messageServiceClient, 'MessageService',
    constants.DEFAULT_CLIENT_SOCKET_TIMEOUT, retryIfSocketTimeout, maxRetryIfSocketTimeout);
};

ClientFactory.prototype.newQueueClient = function (endpoint, socketTimeout, retryIfSocketTimeout,
                                                   maxRetryIfSocketTimeout) {
  var url = endpoint + constants.QUEUE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, queueServiceClient, 'QueueService',
    socketTimeout, retryIfSocketTimeout, maxRetryIfSocketTimeout);
};

ClientFactory.prototype.newMessageClient = function (endpoint, socketTimeout, retryIfSocketTimeout,
                                                     maxRetryIfSocketTimeout) {
  var url = endpoint + constants.MESSAGE_SERVICE_PATH;
  return new retryProxy.RetryProxy(this.credential, url, messageServiceClient, 'MessageService',
    socketTimeout, retryIfSocketTimeout, maxRetryIfSocketTimeout);
};
