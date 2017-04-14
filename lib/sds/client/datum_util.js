/**
 * Created by lshangq on 15-4-4.
 */
var tableTypes = require('../Table_types');
var DatumUtil = exports.DatumUtil = function () {
};

DatumUtil.datum = function (value, type) {
  if (value === undefined || value === null) {
    throw new Error('Datum must not be null');
  }
  var val = null;
  if (type === undefined) {
    switch (typeof (value)) {
      case 'boolean' :
        type = tableTypes.DataType.BOOL;
        break;
      case 'string' :
        type = tableTypes.DataType.STRING;
        break;
      default :
        throw new Error("Unsupported data type: " + typeof (value) +
          " or type must be set for it");
    }
  }
  switch (type) {
    case tableTypes.DataType.BOOL:
      val = new tableTypes.Value({boolValue: value});
      break;
    case tableTypes.DataType.INT8 :
      val = new tableTypes.Value({int8Value: value});
      break;
    case tableTypes.DataType.INT16:
      val = new tableTypes.Value({int16Value: value});
      break;
    case tableTypes.DataType.INT32:
      val = new tableTypes.Value({int32Value: value});
      break;
    case tableTypes.DataType.INT64:
      val = new tableTypes.Value({int64Value: value});
      break;
    case tableTypes.DataType.FLOAT:
      val = new tableTypes.Value({doubleValue: value});
      break;
    case tableTypes.DataType.DOUBLE:
      val = new tableTypes.Value({doubleValue: value});
      break;
    case tableTypes.DataType.STRING:
      val = new tableTypes.Value({stringValue: value});
      break;
    case tableTypes.DataType.BINARY:
      val = new tableTypes.Value({binaryValue: value});
      break;
    case tableTypes.DataType.BOOL_SET:
      val = new tableTypes.Value({boolSetValue: value});
      break;
    case tableTypes.DataType.INT8_SET:
      val = new tableTypes.Value({int8SetValue: value});
      break;
    case tableTypes.DataType.INT16_SET:
      val = new tableTypes.Value({int16SetValue: value});
      break;
    case tableTypes.DataType.INT32_SET:
      val = new tableTypes.Value({int32SetValue: value});
      break;
    case tableTypes.DataType.INT64_SET:
      val = new tableTypes.Value({int64SetValue: value});
      break;
    case tableTypes.DataType.FLOAT_SET:
      val = new tableTypes.Value({doubleSetValue: value});
      break;
    case tableTypes.DataType.DOUBLE_SET:
      val = new tableTypes.Value({doubleSetValue: value});
      break;
    case tableTypes.DataType.STRING_SET:
      val = new tableTypes.value({stringSetValue: value});
      break;
    case tableTypes.DataType.BINARY_SET:
      val = new tableTypes.value({binarySetValue: value});
      break;
    default :
      throw new Error("Unsupported data type: " + type);
  }
  return new tableTypes.Datum({value: val, type: type});
};

DatumUtil.value = function (datum) {
  switch (datum.type) {
    case tableTypes.DataType.BOOL:
      return datum.value.boolValue;
    case tableTypes.DataType.STRING:
      return datum.value.stringValue;
    case tableTypes.DataType.INT8:
      return datum.value.int8Value;
    case tableTypes.DataType.INT16:
      return datum.value.int16Value;
    case tableTypes.DataType.INT32:
      return datum.value.int32Value;
    case tableTypes.DataType.INT64:
      return datum.value.int64Value;
    case tableTypes.DataType.FLOAT:
      return datum.value.doubleValue;
    case tableTypes.DataType.DOUBLE:
      return datum.value.doubleValue;
    case tableTypes.DataType.BINARY:
      return datum.value.binaryValue;
    case tableTypes.DataType.BOOL_SET:
      return datum.value.boolSetValue;
    case tableTypes.DataType.INT8_SET:
      return datum.value.int8SetValue;
    case tableTypes.DataType.INT16_SET:
      return datum.value.int16SetValue;
    case tableTypes.DataType.INT32_SET:
      return datum.value.int32SetValue;
    case tableTypes.DataType.INT64_SET:
      return datum.value.int64SetValue;
    case tableTypes.DataType.STRING_SET:
      return datum.value.stringSetValue;
    case tableTypes.DataType.FLOAT_SET:
      return datum.value.doubleSetValue;
    case tableTypes.DataType.DOUBLE_SET:
      return datum.value.doubleSetValue;
    case tableTypes.DataType.BINARY_SET:
      return datum.value.binarySetValue;
    default :
      throw new Error("Unsupported data type: " + datum.type);
  }
};
