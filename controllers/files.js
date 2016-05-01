var exports = module.exports = {};

var config = require('../config');
var fs = require('fs');
var request = require('request');

exports.getAllPhotos = function(callback){
  //Sends a list of all valid photo IDs
  fs.readdir(config.storage.path, function(error, files){
    if(error) callback(undefined);
    callback(files);
  });
};

exports.deletePhoto = function(fileName, callback){
  exports.getAllPhotos(function(photos){
    var exists = photos.indexOf(fileName) !== -1;
    if(!exists) callback(new Error('File with specified ID does not exist.'));

    //Attempt to delete the file (we know it exists)
    fs.unlink(config.storage.path + fileName, function(error){
      if(!error){
        callback(undefined);
      }else{
        callback(new Error('Something prevented the file from being deleted.'));
      }
    });
  });
};

exports.download = function(input, output, callback){
  request(input).pipe(fs.createWriteStream(config.storage.path + output)).on('close', callback);
}
