const mongoose = require('mongoose');

const Company = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Contact: {
    type: String,
  },
  Website: {
    type: String,
  },
  Logo: {
    type: String,
  },
  NumberOfEmployees: {
    type: String,
  },
  Address: [String],
});

module.exports = mongoose.model('company', Company);
