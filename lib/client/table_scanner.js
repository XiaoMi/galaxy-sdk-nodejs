/**
 * Created by lshangq on 15-4-8.
 */
var TableScanner = exports.TableScanner = function (tableClient, scanRequest) {
  this.tableClient = tableClient;
  this.scanRequest = scanRequest;
  this.startKey = scanRequest.startKey || null;
  this.retryTime = 0;
  this.baseWaitTime = 500;
  this.finish = false;
};

TableScanner.prototype.forEach = function (callback) {
  var self = this;
  if (self.finish) {
    return;
  }
  self.scanRequest.startKey = self.startKey;
  self.tableClient.scan(self.scanRequest, function (error, result) {
    if (error) {
      callback(error, null);
    } else {
      if (result.nextStartKey) {
        self.startKey = result.nextStartKey;
        if (result.records.length == self.scanRequest.limit) {
          self.retryTime = 0;
        } else {
          self.retryTime++;
        }
      } else {
        self.finish = true;
      }
      result.records.forEach(function (record) {
        callback(null, record)
      });
      if (!self.finish) {
        if (self.retryTime > 0) {
          setTimeout(function () {
            self.forEach(callback)
          }, (self.baseWaitTime << (self.retryTime - 1)));
        } else {
          self.forEach(callback);
        }
      }
    }
  })
};
