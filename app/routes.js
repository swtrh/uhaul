var mongoose = require('mongoose');

var RelocationRequest = require('../models/RelocationRequest');
var Employee = require('../models/Employee');
var Equipment = require('../models/Equipment');

var config = require("./config.js");

var requestById = function(req,res) {
  var id = req.params.id;
  RelocationRequest.findById(id, function(err, request) {
    if (err) res.json(500, err);
    else if (request) res.json(request);
    else res.send(404);
  });
};

exports.getAllRequests = function(req,res) {
  RelocationRequest.find({}, function(err, requests) {
    if(err) res.json(500, err);
    else res.json(requests);
  });
};
//
exports.getRequestById = requestById;

exports.createRequest = function(req,res) {
  var request = req.body;
  //console.log(RelocationRequest);
  var relocationRequest = new RelocationRequest(request);
  relocationRequest.save(function(err, request) {
    if (err) res.json(500, err);
    else res.json(201, request);
  });
};

exports.updateRequest = function(req,res) {
  var id = req.params.id;
  var request = req.body;
  RelocationRequest.findByIdAndUpdate( id, { $set: request }, function (err) {
    if (err) res.json(409, err);
    requestById(req,res);
  });
};

exports.deleteRequest = function(req,res) {
  var id = req.params.id;
  RelocationRequest.findByIdAndRemove(id, function (err) {
    if (err) res.json(500, err);
    else res.send(204);
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
