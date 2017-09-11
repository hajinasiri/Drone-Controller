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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  line.push(ws);
  wss.broadcast(JSON.stringify({type:"count", count:wss.clients.size}));
  ws.on('message',(str)=>{

    wss.broadcast(str);
    // Checking if it's a command
    var command = JSON.parse(str).content;
    if(command === "run the drone"){
      ws.send(JSON.stringify({type: "count", count: 1000}))

    }

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // console.log('Client disconnected');
    wss.broadcast(JSON.stringify({type:"count", count:wss.clients.size}));
  });

});

