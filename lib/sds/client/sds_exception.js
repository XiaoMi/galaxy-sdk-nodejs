/**
 * Created by lshangq on 15-4-4.
 */
var util = require('util');
var errorsTypes = require('../Errors_types');

var SdsException = exports.SdsException = function (args) {
  this.name = 'SdsException';
  this.httpStatusCode = null;
  this.errorCode = null;
  this.errorMessage = null;
  this.details = null;
  this.callId = null;
  this.requestId = null;
  this.type = null;
  if (args) {
    if (args.httpStatusCode !== undefined) {
      this.httpStatusCode = args.httpStatusCode;
    }
    if (args.errorCode !== undefined) {
      this.errorCode = args.errorCode;
    }
    if (args.errorMessage !== undefined) {
      this.errorMessage = args.errorMessage;
    }
    if (args.details !== undefined) {
      this.details = args.details;
    }
    if (args.callId !== undefined) {
      this.callId = args.callId;
    }
    if (args.requestId !== undefined) {
      this.requestId = args.requestId;
    }
    if (args.type !== undefined) {
      this.type = args.type;
    }
  }
  Error.call(this, this.getErrorString());
};
util.inherits(SdsException, Error);


SdsException.prototype.getErrorString = function () {
  var errorCodeName = ErrorCodeName[this.errorCode];
  if (this.type === 'transport') {
    return "HTTP transport error [http status code: " + this.httpStatusCode +
      ", errorCode: " + errorCodeName + ", error message: " + this.errorMessage + "]";
  } else if (this.type === 'service') {
    return "Service error [error code: " + this.errorCode +
      ", error message: " + this.errorMessage + ", details: " + this.details +
      ", call id: " + this.callId + ", request id: " + this.requestId + "]";
  } else {
    return "Unknown exception";
  }
};

ErrorCodeName = {
  1: 'INTERNAL_ERROR',
  2: 'SERVICE_UNAVAILABLE',
  3: 'UNKNOWN',
  20: 'END_OF_INTERNAL_ERROR',
  21: 'ACCESS_DENIED',
  22: 'VALIDATION_FAILED',
  23: 'SIZE_EXCEED',
  24: 'QUOTA_EXCEED',
  25: 'THROUGHPUT_EXCEED',
  26: 'RESOURCE_NOT_FOUND',
  27: 'RESOURCE_ALREADY_EXISTS',
  28: 'RESOURCE_UNAVAILABLE',
  29: 'UNSUPPORTED_VERSION',
  30: 'UNSUPPORTED_OPERATION',
  31: 'INVALID_AUTH',
  32: 'CLOCK_TOO_SKEWED',
  33: 'REQUEST_TOO_LARGE',
  34: 'BAD_REQUEST',
  35: 'TTRANSPORT_ERROR',
  36: 'UNSUPPORTED_TPROTOCOL',
  37: 'REQUEST_TIMEOUT'
};

exports.createServiceException = function (type, errorCode, errorMessage, details, callId, requestId) {
  var args = {
    type: type,
    errorCode: errorCode,
    errorMessage: errorMessage,
    details: details,
    callId: callId,
    requestId: requestId
  };
  return new SdsException(args);
};

exports.createTransportException = function (type, httpStatusCode, errorMessage) {
  var errorCode;
  switch (httpStatusCode) {
    case errorsTypes.HttpStatusCode.INVALID_AUTH:
      errorCode = errorsTypes.ErrorCode.INVALID_AUTH;
      break;
    case errorsTypes.HttpStatusCode.CLOCK_TOO_SKEWED:
      errorCode = errorsTypes.ErrorCode.CLOCK_TOO_SKEWED;
      break;
    case errorsTypes.HttpStatusCode.REQUEST_TOO_LARGE:
      errorCode = errorsTypes.ErrorCode.REQUEST_TOO_LARGE;
      break;
    case errorsTypes.HttpStatusCode.BAD_REQUEST:
      errorCode = errorsTypes.ErrorCode.BAD_REQUEST;
      break;
    case errorsTypes.HttpStatusCode.INTERNAL_ERROR:
      errorCode = errorsTypes.ErrorCode.INTERNAL_ERROR;
      break;
    default :
      errorCode = errorsTypes.ErrorCode.UNKNOWN;
  }
  var args = {
    type: type,
    httpStatusCode: httpStatusCode,
    errorCode: errorCode,
    errorMessage: errorMessage
  };
  return new SdsException(args);
};
