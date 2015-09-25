
var http = require('http');
var path = require('path');
var express = require('express');
var relocationRequestService = require("./app/relocationRequestService.js");
var locationService = require("./app/locationService.js");
var config = require("./app/config.js");
var mongoose = require('mongoose');

//var MONGODB = process.env.VCAP_SERVICES.user_provided.credentials;
//var MONGODB_CONNECTION_URI="mongodb://" + MONGODB.user + ":" + MONGODB.password + "@" + MONGODB.uri + ":" + MONGODB.port + "/flappernews";
mongoose.connect('mongodb://localhost/request');

var router = express();
router.use(express.bodyParser());

router.get('/api/relocationRequest', relocationRequestService.getAllRequests);
router.post('/api/relocationRequest', relocationRequestService.createRequest);
router.get('/api/relocationRequest/:id', relocationRequestService.getRequestById);
router.put('/api/relocationRequest/:id', relocationRequestService.updateRequest);
router.delete('/api/relocationRequest/:id', relocationRequestService.deleteRequest);
router.get('/api/locations', locationService.getAllLocations);
router.post('/api/locations', locationService.createLocation);
router.get('/api/locations/:id', locationService.getLocationById);

router.use(express.static(path.resolve(__dirname, 'client')));

var server = http.createServer(router);

server.listen(config.port, config.ip, function(){
  var addr = server.address();
  console.log("U-haul server listening at", addr.address + ":" + addr.port);
});
