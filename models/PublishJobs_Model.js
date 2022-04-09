const mongoose = require('mongoose');

const PublishJobs = new mongoose.Schema({
  time: {
    type: String,
  },
  assessment_Id: { type: mongoose.Schema.Types.ObjectId },
});

PublishJobs.index({ time: 1 });

module.exports = mongoose.model('publish_job', PublishJobs);
