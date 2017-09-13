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

 wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
       if (client.readyState === wsLib.OPEN) {
        client.send(data);
       }
    });
  };

  var line = [];

wss.on('connection', (ws) => {
  line.push(ws);

  wss.broadcast(JSON.stringify({type:"count", count:wss.clients.size}));
  ws.on('message',(str)=>{
    wss.broadcast(str);
    // Checking if it's a command
    var controlerType = JSON.parse(str).type;
    // putting the controller client in the controller variable
    if(controlerType === "controller"){
      var controller = ws;
      controller.send(JSON.stringify({content: "I am recognized as the controller"}));
    }
  });


  ws.on('close', () => {
    //removing the client from line
    var clientIndex = line.indexOf(ws);
    if (clientIndex > -1) {
      line.splice(clientIndex, 1);
    }

    // console.log('Client disconnected');
    wss.broadcast(JSON.stringify({type:"count", count:wss.clients.size}));
    // line[0].send(JSON.stringify({type:"count", count:1000}))
  });

});

