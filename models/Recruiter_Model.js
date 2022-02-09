const mongoose = require('mongoose');

const Recruiter = new mongoose.Schema({
  FromComapny: { type: mongoose.Schema.Types.ObjectId },
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  Contact: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Role: {
    type: String,
    enum: ['Admin', 'Manager', 'Member'],
    default: 'Admin',
  },
  Country: {
    type: String,
  },
  City: {
    type: String,
  },
});

module.exports = mongoose.model('recruiter', Recruiter);
