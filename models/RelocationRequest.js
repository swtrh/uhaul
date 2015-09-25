var mongoose = require('mongoose');

var RelocationRequestSchema = new mongoose.Schema({
  requestor: {
    employeenumber: String,
    name: String,
    department: String,
    phone: String,
    email: String
  },
  from: {
    location: String,
    block_floor: String,
    workspace: String
  },
  to: {
    location: String,
    block_floor: String,
    workspace: String,
    new_department: String
  },
  equipment: [{
    yellownumber: String,
    type: String
  }],
  comment: String
});

var RelocationRequest =  mongoose.model('RelocationRequest', RelocationRequestSchema);

module.exports = RelocationRequest;
