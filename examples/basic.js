/**
 * Created by lshangq on 15-4-9.
 */
var sdsClient = require('galaxy-sdk-nodejs');
var authenticationTypes = sdsClient.authenticationTypes;
var commonTypes = sdsClient.commonTypes;
var errorTypes = sdsClient.errorsTypes;
var tableTypes = sdsClient.tableTypes;
var datumUtil = sdsClient.datumUtil;
var clientFactory = sdsClient.clientFactory;
var tableScanner = sdsClient.tableScanner;

var appKey = ''; // your appKey
var appSecret = ''; // your appSecret
var userType = authenticationTypes.UserType.APP_SECRET;
var endpoint = 'http://cnbj0.sds.api.xiaomi.com';
var cities = ["北京", "Beihai", "Dalian", "Dandong", "Fuzhou", "Guangzhou", "Haikou",
  "Hankou", "Huangpu", "Jiujiang", "Lianyungang", "Nanjing", "Nantong", "Ningbo",
  "Qingdao", "Qinhuangdao", "Rizhao", "Sanya", "Shanghai", "Shantou", "Shenzhen",
  "Tianjin", "Weihai", "Wenzhou", "Xiamen", "Yangzhou", "Yantai"];

var credential = new authenticationTypes.Credential({
  type: userType,
  secretKeyId: appKey,
  secretKey: appSecret});

var cf = new clientFactory.ClientFactory(credential);

var adminClient = cf.newAdminClient(endpoint + commonTypes.ADMIN_SERVICE_PATH,
  commonTypes.DEFAULT_ADMIN_CLIENT_TIMEOUT);
var tableClient = cf.newTableClient(endpoint + commonTypes.TABLE_SERVICE_PATH,
  commonTypes.DEFAULT_CLIENT_TIMEOUT);

var tableName = 'nodejs-test-weather';

var mainLogic = function () {
  var schema = new tableTypes.TableSchema();
  schema.primaryIndex = [new tableTypes.KeySpec({attribute: 'cityId'}),
    new tableTypes.KeySpec({attribute: 'timestamp', asc: false})];
  schema.attributes = {'cityId': tableTypes.DataType.STRING,
    'timestamp': tableTypes.DataType.INT64,
    'score': tableTypes.DataType.DOUBLE,
    'pm25': tableTypes.DataType.INT64};
  var metadata = new tableTypes.TableMetadata();
  metadata.quota = new tableTypes.TableQuota({'size': 100 * 1024 * 1024});
  metadata.throughput = new tableTypes.ProvisionThroughput({
    'readCapacity': 20, 'writeCapacity': 20});
  var tableSpec = new tableTypes.TableSpec();
  tableSpec.schema = schema;
  tableSpec.metadata = metadata;
  adminClient.createTable(tableName, tableSpec, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log('create table success');
      var now = Math.floor(Date.now() / 1000);
      var M = 10;
      var count = M;
      // if M is large, please use batch to reduce request times
      for (var i = 0; i < M; i++) {
        var put = new tableTypes.PutRequest({tableName: tableName, record: {
          'cityId': datumUtil.DatumUtil.datum(cities[i]),
          'timestamp': datumUtil.DatumUtil.datum(now, tableTypes.DataType.INT64),
          'score': datumUtil.DatumUtil.datum(Math.random() * 100,
            tableTypes.DataType.DOUBLE),
          'pm25': datumUtil.DatumUtil.datum(Math.floor(Math.random() * 500),
            tableTypes.DataType.INT64)}});
        tableClient.put(put, function (error, result) {
          if (error) {
            console.log(error)
          } else {
            count--;
            console.log('put record');
            if (count == 0) {
              var get = new tableTypes.GetRequest({tableName: tableName, keys: {
                'cityId': datumUtil.DatumUtil.datum(cities[0],
                  tableTypes.DataType.STRING),
                'timestamp': datumUtil.DatumUtil.datum(now,
                  tableTypes.DataType.INT64)}});
              tableClient.get(get, function (error, result) {
                if (error) {
                  console.log(error);
                } else {
                  var item = result.item;
                  console.log('cityId: ' +
                    datumUtil.DatumUtil.value(item.cityId));
                  console.log('timestamp: ' +
                    datumUtil.DatumUtil.value(item.timestamp));
                  console.log('score: ' + datumUtil.DatumUtil.value(item.score));
                  console.log('pm25: ' + datumUtil.DatumUtil.value(item.pm25));
                  var scan = new tableTypes.ScanRequest({tableName: tableName,
                    attributes: ['cityId', 'score'], limit: 10});
                  var scanner = new tableScanner.TableScanner(tableClient, scan);
                  scanner.forEach(function (error, record) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('cityId: ' +
                        datumUtil.DatumUtil.value(record.cityId));
                      console.log('score: ' +
                        datumUtil.DatumUtil.value(record.score));
                    }
                  })
                }
              });
            }
          }
        });
      }
    }
  });
};

adminClient.dropTable(tableName, function (error, result) {
  if (error) {
    if (error.errorCode == errorTypes.ErrorCode.RESOURCE_NOT_FOUND) {
      mainLogic();
    } else {
      console.log(error);
    }
  } else {
    mainLogic();
  }
});
