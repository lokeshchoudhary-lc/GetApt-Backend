const mongoose = require('mongoose');

const Candidate = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Contact: {
    type: String,
  },
  ExperienceStatus: {
    enum: ['WorkingProfessional', 'Fresher'],
    type: String,
    default: 'Fresher',
  },
  WorkExperience: {
    type: String,
  },
  EducationInfo: [
    {
      Degree: {
        type: String,
      },
      Specialization: {
        type: String,
      },
      CollegeName: {
        type: String,
      },
      PassingYear: {
        type: String,
      },
    },
  ],
  SocialProfile: [
    {
      Link: {
        type: String,
      },
      Platform: {
        type: String,
      },
    },
  ],
  UploadResume: {
    type: String,
  },
});

module.exports = mongoose.model('candidate', Candidate);
