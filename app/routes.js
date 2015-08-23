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
  var id = req.params.id;
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

var locations = [
   { name: 'Bergen',
     sites: ['BE-SA', 'BE-SV', 'BE-TN', 'BE-TS', 'BE-ÅG']
   },
   { name: 'Hammerfest',
     sites: ['HAMM', 'MEL']
   },
   { name: 'Harstad',
     sites: ['HA']
   },
   { name: 'Kollsnes',
     sites: ['BE-KO']
   },
   { name: 'Kårstø',
     sites: ['KÅ']
   },
   { name: 'Mongstad',
     sites: ['MO']
   },
   { name: 'Oslo',
     sites: ['OS-FBU']
   },
   { name: 'Stavanger',
     sites: ['ST-DU', 'ST-FH', 'ST-FO', 'ST-FV', 'ST-GDR', 'ST-GR', 'ST-TN', 'ST-TV5', 'ST-VB', 'ST-VS']
   },
   { name: 'Stjørdal',
     sites: ['STJ', 'STJ2']
   },
   { name: 'Trondheim',
     sites: ['TR-RO']
   }
  ];
  
exports.getAllLocations = function (req, res) {
  res.send(locations);
};

exports.getLocationById = function (req, res) {
  var id = req.params.id;
  res.send(locations.filter(function (location) { return location.name===id }));
};

exports.createLocation = function (req, res) {
  var location = req.body;
  locations.push(location);
};
