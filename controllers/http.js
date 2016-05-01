var exports = module.exports = {};

var config = require('../config');

var http = require('http');
var MjpegProxy = require('mjpeg-proxy').MjpegProxy;
var express = require('express');

var stream = "http://" + config.streamer.address + ":" + config.streamer.port + "/?action=stream";
var piProxy = new MjpegProxy(stream).proxyRequest;

exports.setup = function(){
  var app = express();

  app.use('/', express.static('./interface'));
  app.get('/stream.jpg', piProxy);
  app.use('/photos', express.static(config.storage.path));

  app.server = http.createServer(app);
  app.server.listen(config.web.port);
  exports.server = app.server;
}
