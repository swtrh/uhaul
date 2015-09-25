var mongoose = require('mongoose');

var EquipmentSchema = new mongoose.Schema({
  yellownumber: String,
  type: String
});

module.exports = mongoose.model('Equipment', EquipmentSchema);

