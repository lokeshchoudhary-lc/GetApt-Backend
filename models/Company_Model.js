const mongoose = require('mongoose');

const Company = new mongoose.Schema({
  Name: {
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
  Country: {
    type: String,
  },
  City: {
    type: String,
  },
});

module.exports = mongoose.model('company', Company);
