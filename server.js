
var http = require('http');
var path = require('path');

var express = require('express');

var routes = require("./app/routes.js");

var config = require("./app/config.js");

var router = express();
router.use(express.bodyParser());

router.get('/api/movingOrders', routes.getAllOrders);
router.post('/api/movingOrders', routes.createOrder);
router.get('/api/movingOrders/:id', routes.getOrderById);
router.put('/api/movingOrders/:id', routes.updateOrder);
router.delete('/api/movingOrders/:id', routes.deleteOrder);
router.get('/api/locations', routes.getAllLocations);
router.post('/api/locations', routes.createLocation);
router.get('/api/locations/:id', routes.getLocationById);

router.use(express.static(path.resolve(__dirname, 'client')));

var server = http.createServer(router);

server.listen(config.port, config.ip, function(){
  var addr = server.address();
  console.log("U-haul server listening at", addr.address + ":" + addr.port);
});
