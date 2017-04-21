/**
 * Created by haxiaolin on 17-4-18.
 */
var emqClient = require('galaxy-sdk-nodejs');
var authenticationTypes = emqClient.authenticationTypes;
var clientFactory = emqClient.emqClientFactory;
var queueTypes = emqClient.queueTypes
var messageTypes = emqClient.messageTypes

var appKey = ''; // your appKey
var appSecret = ''; // your appSecret
var userType = authenticationTypes.UserType.APP_SECRET;
var endpoint = ''; // emq service endpoint

var credential = new authenticationTypes.Credential({
  type: userType,
  secretKeyId: appKey,
  secretKey: appSecret
});

var cf = new clientFactory.ClientFactory(credential);

var queueClient = cf.newQueueClient(endpoint);
var messageClient = cf.newMessageClient(endpoint);

var example = function () {
  var createQueueRequest = new queueTypes.CreateQueueRequest({
    queueName: "emqNodejsSDKExampleQueue"
  });
  var queueName;
  var messageCount = 10;
  var current = 0;
  queueClient.createQueue(createQueueRequest, function (error, result) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      queueName = result.queueName;
      sendMessage(queueName);
      receiveDeleteMessage(queueName);
      setTimeout(deleteQueue(queueName), 10000);
    }
  });
  var sendMessage = function (queueName) {
    for (var i = 0; i < messageCount; ++i) {
      messageClient.sendMessage(new messageTypes.SendMessageRequest({
        queueName: queueName,
        messageBody: "testMessageBody" + i
      }), function (error, res1) {
        if (error) {
          console.log(error);
        } else {
          console.log("sent message result: ");
          console.log(res1)
        }
      })
    }
  };
  var receiveDeleteMessage = function (queueName) {
    messageClient.receiveMessage(new messageTypes.ReceiveMessageRequest({
      queueName: queueName
    }), function (error, res2) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(res2);
        if ((res2 === undefined || res2.length === 0) && current < messageCount) {
          setTimeout(receiveDeleteMessage(queueName), 2000);
        } else {
          var deleteMessageBatchEntryList = [];
          current += res2.length;
          for (var i = 0, l = res2.length; i < l; i++) {
            console.log("received message: ");
            console.log(res2[i]);
            deleteMessageBatchEntryList[i] = new messageTypes.DeleteMessageBatchRequestEntry({
              receiptHandle: res2[i].receiptHandle
            });
          }
          messageClient.deleteMessageBatch(new messageTypes.DeleteMessageBatchRequest({
            queueName: queueName,
            deleteMessageBatchRequestEntryList: deleteMessageBatchEntryList
          }), function (error, res3) {
            if (error) {
              console.log(error);
              throw error;
            } else {
              console.log("deleted message handle: ");
              console.log(deleteMessageBatchEntryList);
              if (current < messageCount)
                receiveDeleteMessage(queueName);
            }
          });
        }
      }
    })
  };
  var deleteQueue = function (queueName) {
    queueClient.deleteQueue(new queueTypes.DeleteQueueRequest({
      queueName: queueName
    }), function (error, res1) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log("deleted queue: ");
        console.log(queueName);
      }
    })
  };
};

example();
