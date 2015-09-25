
var http = require('http');
var path = require('path');
var express = require('express');
var routes = require("./app/routes.js");
var config = require("./app/config.js");
var mongoose = require('mongoose');

//var MONGODB = process.env.VCAP_SERVICES.user_provided.credentials;
//var MONGODB_CONNECTION_URI="mongodb://" + MONGODB.user + ":" + MONGODB.password + "@" + MONGODB.uri + ":" + MONGODB.port + "/flappernews";
mongoose.connect('mongodb://localhost/request');

var router = express();
router.use(express.bodyParser());

router.get('/api/relocationRequest', routes.getAllRequests);
router.post('/api/relocationRequest', routes.createRequest);
router.get('/api/relocationRequest/:id', routes.getRequestById);
router.put('/api/relocationRequest/:id', routes.updateRequest);
router.delete('/api/relocationRequest/:id', routes.deleteRequest);
router.get('/api/locations', routes.getAllLocations);
router.post('/api/locations', routes.createLocation);
router.get('/api/locations/:id', routes.getLocationById);

router.use(express.static(path.resolve(__dirname, 'client')));

var server = http.createServer(router);

server.listen(config.port, config.ip, function(){
  var addr = server.address();
  console.log("U-haul server listening at", addr.address + ":" + addr.port);
});
