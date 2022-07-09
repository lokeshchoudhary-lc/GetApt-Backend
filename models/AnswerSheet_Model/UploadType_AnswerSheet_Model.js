const mongoose = require('mongoose');

const UploadTypeAnswerSheetSchema = new mongoose.Schema({
  answerSheetId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  candidateAnswer: {
    type: String,
  },
  candidateUpload: {
    type: String,
  },
  givenScore: {
    type: String,
  },
});

module.exports = mongoose.model(
  'upload_type_answer_sheet',
  UploadTypeAnswerSheetSchema
);
