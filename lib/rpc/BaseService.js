//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('../thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var Errors_ttypes = require('./Errors_types')


var ttypes = require('./Common_types');
//HELPER FUNCTIONS AND STRUCTURES

BaseService_getServerVersion_args = function(args) {
};
BaseService_getServerVersion_args.prototype = {};
BaseService_getServerVersion_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BaseService_getServerVersion_args.prototype.write = function(output) {
  output.writeStructBegin('BaseService_getServerVersion_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

BaseService_getServerVersion_result = function(args) {
  this.success = null;
  this.se = null;
  if (args instanceof Errors_ttypes.ServiceException) {
    this.se = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.se !== undefined) {
      this.se = args.se;
    }
  }
};
BaseService_getServerVersion_result.prototype = {};
BaseService_getServerVersion_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.Version();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.se = new Errors_ttypes.ServiceException();
        this.se.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BaseService_getServerVersion_result.prototype.write = function(output) {
  output.writeStructBegin('BaseService_getServerVersion_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.se !== null && this.se !== undefined) {
    output.writeFieldBegin('se', Thrift.Type.STRUCT, 1);
    this.se.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

BaseService_validateClientVersion_args = function(args) {
  this.clientVersion = null;
  if (args) {
    if (args.clientVersion !== undefined) {
      this.clientVersion = args.clientVersion;
    }
  }
};
BaseService_validateClientVersion_args.prototype = {};
BaseService_validateClientVersion_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.clientVersion = new ttypes.Version();
        this.clientVersion.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BaseService_validateClientVersion_args.prototype.write = function(output) {
  output.writeStructBegin('BaseService_validateClientVersion_args');
  if (this.clientVersion !== null && this.clientVersion !== undefined) {
    output.writeFieldBegin('clientVersion', Thrift.Type.STRUCT, 1);
    this.clientVersion.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

BaseService_validateClientVersion_result = function(args) {
  this.se = null;
  if (args instanceof Errors_ttypes.ServiceException) {
    this.se = args;
    return;
  }
  if (args) {
    if (args.se !== undefined) {
      this.se = args.se;
    }
  }
};
BaseService_validateClientVersion_result.prototype = {};
BaseService_validateClientVersion_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.se = new Errors_ttypes.ServiceException();
        this.se.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BaseService_validateClientVersion_result.prototype.write = function(output) {
  output.writeStructBegin('BaseService_validateClientVersion_result');
  if (this.se !== null && this.se !== undefined) {
    output.writeFieldBegin('se', Thrift.Type.STRUCT, 1);
    this.se.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

BaseService_getServerTime_args = function(args) {
};
BaseService_getServerTime_args.prototype = {};
BaseService_getServerTime_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BaseService_getServerTime_args.prototype.write = function(output) {
  output.writeStructBegin('BaseService_getServerTime_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

BaseService_getServerTime_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
BaseService_getServerTime_result.prototype = {};
BaseService_getServerTime_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.I64) {
        this.success = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

BaseService_getServerTime_result.prototype.write = function(output) {
  output.writeStructBegin('BaseService_getServerTime_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I64, 0);
    output.writeI64(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

BaseServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
BaseServiceClient.prototype = {};
BaseServiceClient.prototype.seqid = function() { return this._seqid; }
BaseServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
BaseServiceClient.prototype.getServerVersion = function(callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getServerVersion();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getServerVersion();
  }
};

BaseServiceClient.prototype.send_getServerVersion = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getServerVersion', Thrift.MessageType.CALL, this.seqid());
  var args = new BaseService_getServerVersion_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

BaseServiceClient.prototype.recv_getServerVersion = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new BaseService_getServerVersion_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getServerVersion failed: unknown result');
};
BaseServiceClient.prototype.validateClientVersion = function(clientVersion, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_validateClientVersion(clientVersion);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_validateClientVersion(clientVersion);
  }
};

BaseServiceClient.prototype.send_validateClientVersion = function(clientVersion) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('validateClientVersion', Thrift.MessageType.CALL, this.seqid());
  var args = new BaseService_validateClientVersion_args();
  args.clientVersion = clientVersion;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

BaseServiceClient.prototype.recv_validateClientVersion = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new BaseService_validateClientVersion_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  callback(null)
};
BaseServiceClient.prototype.getServerTime = function(callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getServerTime();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getServerTime();
  }
};

BaseServiceClient.prototype.send_getServerTime = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getServerTime', Thrift.MessageType.CALL, this.seqid());
  var args = new BaseService_getServerTime_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

BaseServiceClient.prototype.recv_getServerTime = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new BaseService_getServerTime_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getServerTime failed: unknown result');
};
BaseServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
BaseServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

BaseServiceProcessor.prototype.process_getServerVersion = function(seqid, input, output) {
  var args = new BaseService_getServerVersion_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getServerVersion.length === 0) {
    Q.fcall(this._handler.getServerVersion)
      .then(function(result) {
        var result = new BaseService_getServerVersion_result({success: result});
        output.writeMessageBegin("getServerVersion", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new BaseService_getServerVersion_result(err);
        output.writeMessageBegin("getServerVersion", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getServerVersion( function (err, result) {
      var result = new BaseService_getServerVersion_result((err != null ? err : {success: result}));
      output.writeMessageBegin("getServerVersion", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

BaseServiceProcessor.prototype.process_validateClientVersion = function(seqid, input, output) {
  var args = new BaseService_validateClientVersion_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.validateClientVersion.length === 1) {
    Q.fcall(this._handler.validateClientVersion, args.clientVersion)
      .then(function(result) {
        var result = new BaseService_validateClientVersion_result({success: result});
        output.writeMessageBegin("validateClientVersion", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new BaseService_validateClientVersion_result(err);
        output.writeMessageBegin("validateClientVersion", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.validateClientVersion(args.clientVersion,  function (err, result) {
      var result = new BaseService_validateClientVersion_result((err != null ? err : {success: result}));
      output.writeMessageBegin("validateClientVersion", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

BaseServiceProcessor.prototype.process_getServerTime = function(seqid, input, output) {
  var args = new BaseService_getServerTime_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getServerTime.length === 0) {
    Q.fcall(this._handler.getServerTime)
      .then(function(result) {
        var result = new BaseService_getServerTime_result({success: result});
        output.writeMessageBegin("getServerTime", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new BaseService_getServerTime_result(err);
        output.writeMessageBegin("getServerTime", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getServerTime( function (err, result) {
      var result = new BaseService_getServerTime_result((err != null ? err : {success: result}));
      output.writeMessageBegin("getServerTime", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

