const mongoose = require('mongoose');

const Recruiter = new mongoose.Schema({
  fromCompany: { type: mongoose.Schema.Types.ObjectId },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  contact: {
    type: String,
  },
  designation: {
    type: String,
  },
  role: {
    type: String,
    enum: ['', 'admin', 'manager', 'member'],
    default: '',
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model('recruiter', Recruiter);
