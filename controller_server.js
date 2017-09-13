'use strict';
// Here first we are stablishing a connection to the drone,
//and inside that connection we are stablishing a socket server connection
var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider({
  // uuid: 'RS_W056147'
  uuid: 'RS_B138046'
});

console.log('lets connect to the drone!');
rollingSpider.connect(function (error) {
  if (error){
    console.log("error: ", error)
  }

  console.log('lets set up the drone');
  rollingSpider.setup(function () {
    console.log('lets ping the drone!')
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();


    var WebSocket = require('ws')
    var ws = new WebSocket('ws://' + 'localhost' + ':3001');
    ws.addEventListener('open', () => {
      //Telling the socket server that this is the controller
      ws.send(JSON.stringify({type:"controller"}));
    });

    ws.addEventListener('message', (event) => {
      console.log(event.data)
      var data=JSON.parse(event.data);
      if(data.type === "command"){
        if(data.content === "takeoff"){
          rollingSpider.takeoff()
        }else if(data.content === "land"){
          rollingSpider.land()
        }else if(data.content === "up"){
          rollingSpider.up()
        }else if(data.content === "down"){
          rollingSpider.down()
        }else if(data.content === "forward"){
          rollingSpider.forward()
        }else if(data.content === "backward"){
          rollingSpider.backward()
        }else if(data.content === "left"){
          rollingSpider.left()
        }else if(data.content === "right"){
          rollingSpider.right()
        }else if(data.content === "clockwise"){
          rollingSpider.clockwise()
        }else if(data.content === "counterclockwise"){
          rollingSpider.counterClockwise()
        }else if(data.content === "back"){
          rollingSpider.backFlip()
        }

      }
    });

    setTimeout(() => {
      console.log("Simulating incoming message");
    });
  });
});
