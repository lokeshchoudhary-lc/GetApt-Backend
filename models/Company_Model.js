const mongoose = require('mongoose');

const Company = new mongoose.Schema({
  name: {
    type: String,
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  numberOfEmployees: {
    type: String,
  },
});

module.exports = mongoose.model('company', Company);
