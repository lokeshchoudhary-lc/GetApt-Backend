const mongoose = require('mongoose');

const Candidate = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  experienceStatus: {
    enum: ['workingProfessional', 'fresher'],
    type: String,
    default: 'fresher',
  },
  workExperience: {
    type: String,
  },
  educationInfo: [
    {
      degree: {
        type: String,
      },
      specialization: {
        type: String,
      },
      collegeName: {
        type: String,
      },
      passingYear: {
        type: String,
      },
    },
  ],
  socialProfile: [
    {
      link: {
        type: String,
      },
      platform: {
        type: String,
      },
    },
  ],
  uploadResume: {
    type: String,
  },
});

module.exports = mongoose.model('candidate', Candidate);
