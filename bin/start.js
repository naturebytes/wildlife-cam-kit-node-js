/**

  Start streamer:
  ./mjpg_streamer -o "output_http.so -p 8080" -i "input_raspicam.so -fps 22 -q 14 -hf -y 360"

**/

var io = require('socket.io')();
var config = require('../config');

var endpoints = require('../controllers/endpoints');
var http = require('../controllers/http');

//Binds Socket.IO to port 80 and begins accepting requests.
function initialize(){
  console.log("Attempting to run Socket.IO server...");
  endpoints.setup(io);
  http.setup();
  io.listen(http.server);
  console.log("Socket.IO has attached to the web server.");
}

//Closes connections before exiting
function shutdown(){
  io.close();
}

//Runs when the app is killed (gracefully with CTRL-C)
process.on('SIGINT', function () {
  console.log();
  console.log("Gracefully stopping the application...");
  shutdown();
  console.log("Shutdown complete.");
  process.exit();
});

initialize();
