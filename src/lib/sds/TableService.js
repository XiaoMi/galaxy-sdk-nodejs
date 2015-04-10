//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var Errors_ttypes = require('./Errors_types')
var Common_ttypes = require('./Common_types')
var Authentication_ttypes = require('./Authentication_types')


var BaseService = require('./BaseService')
var BaseServiceClient = BaseService.Client
var BaseServiceProcessor = BaseService.Processor
var ttypes = require('./Table_types');
//HELPER FUNCTIONS AND STRUCTURES

TableService_get_args = function(args) {
  this.request = null;
  if (args) {
    if (args.request !== undefined) {
      this.request = args.request;
    }
  }
};
TableService_get_args.prototype = {};
TableService_get_args.prototype.read = function(input) {
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
        this.request = new ttypes.GetRequest();
        this.request.read(input);
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

TableService_get_args.prototype.write = function(output) {
  output.writeStructBegin('TableService_get_args');
  if (this.request !== null && this.request !== undefined) {
    output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
    this.request.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TableService_get_result = function(args) {
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
TableService_get_result.prototype = {};
TableService_get_result.prototype.read = function(input) {
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
        this.success = new ttypes.GetResult();
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

TableService_get_result.prototype.write = function(output) {
  output.writeStructBegin('TableService_get_result');
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

TableService_put_args = function(args) {
  this.request = null;
  if (args) {
    if (args.request !== undefined) {
      this.request = args.request;
    }
  }
};
TableService_put_args.prototype = {};
TableService_put_args.prototype.read = function(input) {
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
        this.request = new ttypes.PutRequest();
        this.request.read(input);
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

TableService_put_args.prototype.write = function(output) {
  output.writeStructBegin('TableService_put_args');
  if (this.request !== null && this.request !== undefined) {
    output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
    this.request.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TableService_put_result = function(args) {
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
TableService_put_result.prototype = {};
TableService_put_result.prototype.read = function(input) {
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
        this.success = new ttypes.PutResult();
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

TableService_put_result.prototype.write = function(output) {
  output.writeStructBegin('TableService_put_result');
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

TableService_increment_args = function(args) {
  this.request = null;
  if (args) {
    if (args.request !== undefined) {
      this.request = args.request;
    }
  }
};
TableService_increment_args.prototype = {};
TableService_increment_args.prototype.read = function(input) {
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
        this.request = new ttypes.IncrementRequest();
        this.request.read(input);
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

TableService_increment_args.prototype.write = function(output) {
  output.writeStructBegin('TableService_increment_args');
  if (this.request !== null && this.request !== undefined) {
    output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
    this.request.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TableService_increment_result = function(args) {
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
TableService_increment_result.prototype = {};
TableService_increment_result.prototype.read = function(input) {
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
        this.success = new ttypes.IncrementResult();
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

TableService_increment_result.prototype.write = function(output) {
  output.writeStructBegin('TableService_increment_result');
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

TableService_remove_args = function(args) {
  this.request = null;
  if (args) {
    if (args.request !== undefined) {
      this.request = args.request;
    }
  }
};
TableService_remove_args.prototype = {};
TableService_remove_args.prototype.read = function(input) {
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
        this.request = new ttypes.RemoveRequest();
        this.request.read(input);
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

TableService_remove_args.prototype.write = function(output) {
  output.writeStructBegin('TableService_remove_args');
  if (this.request !== null && this.request !== undefined) {
    output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
    this.request.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TableService_remove_result = function(args) {
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
TableService_remove_result.prototype = {};
TableService_remove_result.prototype.read = function(input) {
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
        this.success = new ttypes.RemoveResult();
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

TableService_remove_result.prototype.write = function(output) {
  output.writeStructBegin('TableService_remove_result');
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

TableService_scan_args = function(args) {
  this.request = null;
  if (args) {
    if (args.request !== undefined) {
      this.request = args.request;
    }
  }
};
TableService_scan_args.prototype = {};
TableService_scan_args.prototype.read = function(input) {
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
        this.request = new ttypes.ScanRequest();
        this.request.read(input);
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

TableService_scan_args.prototype.write = function(output) {
  output.writeStructBegin('TableService_scan_args');
  if (this.request !== null && this.request !== undefined) {
    output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
    this.request.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TableService_scan_result = function(args) {
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
TableService_scan_result.prototype = {};
TableService_scan_result.prototype.read = function(input) {
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
        this.success = new ttypes.ScanResult();
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

TableService_scan_result.prototype.write = function(output) {
  output.writeStructBegin('TableService_scan_result');
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

TableService_batch_args = function(args) {
  this.request = null;
  if (args) {
    if (args.request !== undefined) {
      this.request = args.request;
    }
  }
};
TableService_batch_args.prototype = {};
TableService_batch_args.prototype.read = function(input) {
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
        this.request = new ttypes.BatchRequest();
        this.request.read(input);
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

TableService_batch_args.prototype.write = function(output) {
  output.writeStructBegin('TableService_batch_args');
  if (this.request !== null && this.request !== undefined) {
    output.writeFieldBegin('request', Thrift.Type.STRUCT, 1);
    this.request.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

TableService_batch_result = function(args) {
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
TableService_batch_result.prototype = {};
TableService_batch_result.prototype.read = function(input) {
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
        this.success = new ttypes.BatchResult();
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

TableService_batch_result.prototype.write = function(output) {
  output.writeStructBegin('TableService_batch_result');
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

TableServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
Thrift.inherits(TableServiceClient, BaseServiceClient);
TableServiceClient.prototype.seqid = function() { return this._seqid; }
TableServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
TableServiceClient.prototype.get = function(request, callback) {
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
    this.send_get(request);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_get(request);
  }
};

TableServiceClient.prototype.send_get = function(request) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('get', Thrift.MessageType.CALL, this.seqid());
  var args = new TableService_get_args();
  args.request = request;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TableServiceClient.prototype.recv_get = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TableService_get_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('get failed: unknown result');
};
TableServiceClient.prototype.put = function(request, callback) {
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
    this.send_put(request);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_put(request);
  }
};

TableServiceClient.prototype.send_put = function(request) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('put', Thrift.MessageType.CALL, this.seqid());
  var args = new TableService_put_args();
  args.request = request;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TableServiceClient.prototype.recv_put = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TableService_put_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('put failed: unknown result');
};
TableServiceClient.prototype.increment = function(request, callback) {
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
    this.send_increment(request);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_increment(request);
  }
};

TableServiceClient.prototype.send_increment = function(request) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('increment', Thrift.MessageType.CALL, this.seqid());
  var args = new TableService_increment_args();
  args.request = request;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TableServiceClient.prototype.recv_increment = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TableService_increment_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('increment failed: unknown result');
};
TableServiceClient.prototype.remove = function(request, callback) {
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
    this.send_remove(request);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_remove(request);
  }
};

TableServiceClient.prototype.send_remove = function(request) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('remove', Thrift.MessageType.CALL, this.seqid());
  var args = new TableService_remove_args();
  args.request = request;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TableServiceClient.prototype.recv_remove = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TableService_remove_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('remove failed: unknown result');
};
TableServiceClient.prototype.scan = function(request, callback) {
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
    this.send_scan(request);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_scan(request);
  }
};

TableServiceClient.prototype.send_scan = function(request) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('scan', Thrift.MessageType.CALL, this.seqid());
  var args = new TableService_scan_args();
  args.request = request;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TableServiceClient.prototype.recv_scan = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TableService_scan_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('scan failed: unknown result');
};
TableServiceClient.prototype.batch = function(request, callback) {
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
    this.send_batch(request);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_batch(request);
  }
};

TableServiceClient.prototype.send_batch = function(request) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('batch', Thrift.MessageType.CALL, this.seqid());
  var args = new TableService_batch_args();
  args.request = request;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

TableServiceClient.prototype.recv_batch = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new TableService_batch_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.se) {
    return callback(result.se);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('batch failed: unknown result');
};
TableServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
Thrift.inherits(TableServiceProcessor, BaseServiceProcessor)
TableServiceProcessor.prototype.process = function(input, output) {
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

TableServiceProcessor.prototype.process_get = function(seqid, input, output) {
  var args = new TableService_get_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.get.length === 1) {
    Q.fcall(this._handler.get, args.request)
      .then(function(result) {
        var result = new TableService_get_result({success: result});
        output.writeMessageBegin("get", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TableService_get_result(err);
        output.writeMessageBegin("get", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.get(args.request,  function (err, result) {
      var result = new TableService_get_result((err != null ? err : {success: result}));
      output.writeMessageBegin("get", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TableServiceProcessor.prototype.process_put = function(seqid, input, output) {
  var args = new TableService_put_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.put.length === 1) {
    Q.fcall(this._handler.put, args.request)
      .then(function(result) {
        var result = new TableService_put_result({success: result});
        output.writeMessageBegin("put", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TableService_put_result(err);
        output.writeMessageBegin("put", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.put(args.request,  function (err, result) {
      var result = new TableService_put_result((err != null ? err : {success: result}));
      output.writeMessageBegin("put", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TableServiceProcessor.prototype.process_increment = function(seqid, input, output) {
  var args = new TableService_increment_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.increment.length === 1) {
    Q.fcall(this._handler.increment, args.request)
      .then(function(result) {
        var result = new TableService_increment_result({success: result});
        output.writeMessageBegin("increment", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TableService_increment_result(err);
        output.writeMessageBegin("increment", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.increment(args.request,  function (err, result) {
      var result = new TableService_increment_result((err != null ? err : {success: result}));
      output.writeMessageBegin("increment", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TableServiceProcessor.prototype.process_remove = function(seqid, input, output) {
  var args = new TableService_remove_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.remove.length === 1) {
    Q.fcall(this._handler.remove, args.request)
      .then(function(result) {
        var result = new TableService_remove_result({success: result});
        output.writeMessageBegin("remove", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TableService_remove_result(err);
        output.writeMessageBegin("remove", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.remove(args.request,  function (err, result) {
      var result = new TableService_remove_result((err != null ? err : {success: result}));
      output.writeMessageBegin("remove", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TableServiceProcessor.prototype.process_scan = function(seqid, input, output) {
  var args = new TableService_scan_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.scan.length === 1) {
    Q.fcall(this._handler.scan, args.request)
      .then(function(result) {
        var result = new TableService_scan_result({success: result});
        output.writeMessageBegin("scan", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TableService_scan_result(err);
        output.writeMessageBegin("scan", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.scan(args.request,  function (err, result) {
      var result = new TableService_scan_result((err != null ? err : {success: result}));
      output.writeMessageBegin("scan", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

TableServiceProcessor.prototype.process_batch = function(seqid, input, output) {
  var args = new TableService_batch_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.batch.length === 1) {
    Q.fcall(this._handler.batch, args.request)
      .then(function(result) {
        var result = new TableService_batch_result({success: result});
        output.writeMessageBegin("batch", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new TableService_batch_result(err);
        output.writeMessageBegin("batch", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.batch(args.request,  function (err, result) {
      var result = new TableService_batch_result((err != null ? err : {success: result}));
      output.writeMessageBegin("batch", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

