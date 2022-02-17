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
    enum: ['indi', 'admin', 'manager', 'member'],
    default: 'indi',
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  usedGoogleAuth: {
    type: Boolean,
  },
});

module.exports = mongoose.model('recruiter', Recruiter);
