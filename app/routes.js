var monk = require("monk");

var config = require("./config.js");

var db = monk(config.dbUrl);

var movingOrders = db.get("movingOrders");


exports.getAllOrders = function(req,res) {
  movingOrders.find({}, function(err, orders) {
    if(err) res.json(500, err);
    else res.json(orders);
  });
};

exports.getOrderById = function(req,res) {
  var id= req.params.id;
  movingOrders.findById(id, function(err, order) {
    if(err) res.json(500, err);
    else if(order) res.json(order);
    else res.send(404);
  });
};

exports.createOrder = function(req,res) {
  var order = req.body;
  movingOrders.insert(order, function(err, order) {
    if(err) res.json(500, err);
    else res.json(201, order);
  });
};

