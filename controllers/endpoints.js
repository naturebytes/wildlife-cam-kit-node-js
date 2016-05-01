var exports = {};

var config = require('../config');
var files = require('./files');

//Registers Socket.IO events
exports.setup = function(server){
  server.on('connection', function(socket){
    socket.server = server;
    registerEndpoints(socket);
    console.log("New connection established (" + socket.handshake.address + ").");
  });
}

//Sets up listeners on a new socket
function registerEndpoints(socket){
  socket.on('takePhoto', function(name){
    console.log("/takePhoto (" + socket.handshake.address + ")");
    var fileName = new Date().getTime();
    var input = "http://" + config.streamer.address + ":" + config.streamer.port;
    files.download(input + "/?action=snapshot", fileName + ".jpeg", function(){
      socket.server.sockets.emit('takePhoto', {success: true, fileName: fileName + ".jpeg"});
    });
  });

  socket.on('listAll', function(){
    console.log("/listAll (" + socket.handshake.address + ")");
    files.getAllPhotos(function(fileArray){
      socket.emit('listAll', {success: true, fileNames: fileArray.reverse()});
    });
  });

  socket.on('deletePhoto', function(fileName){
    console.log("/deletePhoto (" + socket.handshake.address + ")");
    files.deletePhoto(fileName, function(error){
      if(!error) socket.server.sockets.emit('deletePhoto', {success: true, fileName: fileName});
      else socket.server.sockets.emit('deletePhoto', {success: false, error: error, fileName: fileName});
    });
  });
}

module.exports = exports;
