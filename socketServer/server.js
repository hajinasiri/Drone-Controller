// server.js
'use strict';

const express = require('express');
const wsLib = require('ws');
const SocketServer = wsLib.Server;
const http =require('http');
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({server});
//this is a function sends names of the people in line to every client
//plus the position of that special client in the line
function sendLineInfo(line){
  var lineInfo = [];
  line.forEach(function(element){
    lineInfo.push(element.name);
  });
  lineInfo.push(-1);//initializing the user's position in the line
  wss.clients.forEach(function each(client) {
    if (client.readyState === wsLib.OPEN) {
      var clientIndex = line.findIndex(arr => arr.ws === client);

      if(clientIndex > -1){
        lineInfo.splice(-1,1);//removing the initial position value
        lineInfo.push(clientIndex);//adding the actual position of the user to the array
      }
      client.send(JSON.stringify({type:"lineInfo", lineInfo:lineInfo}));
      console.log(lineInfo);

    }
  });
}

 wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
       if (client.readyState === wsLib.OPEN) {
        client.send(data);
       }
    });
  };
  var controller = {};
  var line = [];
  var clientInfo = [];
  var lineIndex = 0;

wss.on('connection', (ws) => {

  wss.broadcast(JSON.stringify({type:"count", count:wss.clients.size-1}));
  ws.on('message',(str)=>{
    var theData = JSON.parse(str);
    console.log(theData);
    var messType = theData.type;


    if(messType === "controller"){
      controller = ws;
      controller.send(JSON.stringify({content: "I am recognized as the controller"}));
    // putting the controller client in the controller variable
    }else if (messType === "postNotification" || messType === "name"){
      wss.broadcast(str);
    }else if(messType === "command"){
      controller.send(str)
    }else if(messType === "request"){
      if(theData.reqstate === -1){//if it is controll request
        line.push({ws:ws,name:theData.name});
      }else if(theData.reqstate === 1){ //if it is cancel request removes the client from line
        lineIndex = line.findIndex(arr => arr.ws === ws);
        line.splice(lineIndex, 1);
      }
      sendLineInfo(line);
    }
  });
  ws.on('close', () => {
    // removing the client from line
    lineIndex = line.findIndex(arr => arr.ws === ws);
    if (lineIndex > -1) {
      line.splice(lineIndex, 1);
    }
    sendLineInfo(line);
    // console.log('Client disconnected');
    wss.broadcast(JSON.stringify({type:"count", count:wss.clients.size}));
    // line[0].send(JSON.stringify({type:"count", count:1000}))
  });

});

