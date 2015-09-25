var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  employeenumber: String,
  name: String,
  department: String,
  phone: String,
  email: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);

