'use strict';

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider({

  uuid: 'RS_W056147'

});

console.log('lets connect to the drone!');


rollingSpider.connect(function (error) {
  if (error)
    {console.log("error: ", error)}

  console.log('lets set up the drone');
  rollingSpider.setup(function () {
    console.log('lets ping the drone!')
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    temporal.queue([
      {
        delay: 5000,
        task: function () {
          rollingSpider.takeOff();
          rollingSpider.flatTrim();
        }
      },
      {
        delay: 5000,
        task: function () {
          rollingSpider.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          process.exit(0);
        }
      }
    ]);
  });
});
