const mongoose = require('mongoose');

const PublishToList = new mongoose.Schema({
  email: {
    type: String,
  },
  publishedAssessment_Id: { type: mongoose.Schema.Types.ObjectId },
});

PublishToList.index({ publishedAssessment_Id: 1 });

module.exports = mongoose.model('publish_to_list', PublishToList);
