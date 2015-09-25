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

