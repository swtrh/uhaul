//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var routes = require("./app/routes.js");

var config = require("./app/config.js");

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
router.use(express.bodyParser());

var server = http.createServer(router);

router.get('/api/movingOrders', routes.getAllOrders);
router.get('/api/movingOrders/:id', routes.getOrderById);
router.post('/api/movingOrders', routes.createOrder);

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(config.port, config.ip, function(){
  var addr = server.address();
  console.log("U-haul server listening at", addr.address + ":" + addr.port);
});
