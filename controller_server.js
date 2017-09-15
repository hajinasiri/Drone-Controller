'use strict';
// Here first we are stablishing a connection to the drone,
//and inside that connection we are stablishing a socket server connection
var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider({
  uuid: 'RS_W056147'
  // uuid: 'RS_B138046'
});

var ACTIVE = true;
var STEPS = 5;

function cooldown() {
  ACTIVE = false;
  setTimeout(function() {
    ACTIVE = true;
  }, STEPS * 12);
};


var i = 1;
while(i === 1){
  i = 0;
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

      // rollingSpider.on('battery', function () {
      // console.log('Battery: ' + rollingSpider.status.battery + '%');
      // rollingSpider.signalStrength(function (err, val) {
      //   console.log('Signal: ' + val + 'dBm');
      // });
      // });


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
            rollingSpider.takeoff();
          }else if(data.content === "land"){
            rollingSpider.land();
          }else if(data.content === "up"){
            rollingSpider.up({ steps: STEPS });
          }else if(data.content === "down"){
            rollingSpider.down({ steps: STEPS });
          }else if(data.content === "forward"){
            rollingSpider.forward({ steps: STEPS });
          }else if(data.content === "backward"){
            rollingSpider.backward({ steps: STEPS });
          }else if(data.content === "left"){
            rollingSpider.left({ steps: STEPS });
          }else if(data.content === "right"){
            rollingSpider.right({ steps: STEPS });
          }else if(data.content === "clockwise"){
            rollingSpider.clockwise({ steps: STEPS });
          }else if(data.content === "counterclockwise"){
            rollingSpider.counterClockwise({ steps: STEPS });
          }
        }
      });

      setTimeout(() => {
        console.log("Simulating incoming message");
      });
    });
  });
};
