/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});



/**********************
 * Example get method *
 **********************/

// app.get('/items', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

// app.get('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'get call succeed!', url: req.url});
// });

/****************************
* Example post method *
****************************/

const { Expo } = require('expo-server-sdk');
let expo = new Expo();
const mysql = require('mysql2/promise');

app.post('/items', async function(req, res) {
  // Add your code here

  const db_setting = {
    host   : process.env['ENDPOINT'],
    user   : process.env['USER'],
    password : process.env['PASSWORD'],
    database : process.env['DB']
  };
  let mycon = null;
  let ret = "";
   try {
    console.log(1);
    mycon = await mysql.createConnection(db_setting);
    console.log(2);

   }catch(e){
    console.log(e);
   }
  // ExponentPushToken[im3PhvNozRcUbsAKG6tJIF]
  //  let sql = 'select PushToken from `Users`';
  //  let d = [];
  //  const [rows, fields] = await mycon.execute(sql,d);
  //  logout(rows);
   
   if( mycon ){
     ret = "suc"
     mycon.end();
   }
  
  // const messages = req.body;
  req.body = {"test":ret};

  // const tickets = await sendPushNotifications(messages);

  // exports.handler = async (event, context) => {
      // 通知メッセージを取得
      // const messages = await getMessages(event);
      // 通知する
      // const tickets = await sendPushNotifications(messages);

      // 通知結果を保存する（必要に応じて）
      // await saveTickets(tickets);
  // }

  const getMessages = async (event) => {
      // ここに通知するメッセージを取得する処理を書く
      
      return [
          // 1つ1つのメッセージは以下の形式で
          {
                  "to": "ExponentPushToken[RvJ8y9AVvTouyLKVoFu6Ra]", // Expoプッシュトークン
                  "sound": 'default',  // 通知時の音を鳴らすかどうかの設定
                  "title": "title",  // 通知タイトル
                  "body": "body"  // 通知本文
              }
      ]
  }

  const sendPushNotifications = async (messages) => {
      // The Expo push notification service accepts batches of notifications so
      // that you don't need to send 1000 requests to send 1000 notifications. We
      // recommend you batch your notifications to reduce the number of requests
      // and to compress them (notifications with similar content will get
      // compressed).
      let chunks = expo.chunkPushNotifications(messages);
      let tickets = [];

      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
          try {
              let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
              tickets.push(...ticketChunk);
              // NOTE: If a ticket contains an error code in ticket.details.error, you
              // must handle it appropriately. The error codes are listed in the Expo
              // documentation:
              // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
          } catch (error) {
              console.error(error);
          }
      }
      return tickets;
  }

  const saveTickets = async (tickets) => {
      // ticketsをデータベースに保存するような処理
  }
  const messages = await getMessages("test");
  const tickets = await sendPushNotifications(messages);

  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

// app.post('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example put method *
// ****************************/

// app.put('/items', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example delete method *
// ****************************/

// app.delete('/items', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/items/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.listen(3000, function() {
//     console.log("App started")
// });

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
