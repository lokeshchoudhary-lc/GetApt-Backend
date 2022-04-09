const mongoose = require('mongoose');

const AnswerSheetTypeBSchema = new mongoose.Schema({
  question: [
    {
      problemStatement: {
        type: String,
      },
      scoreOfQuestion: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('answersheet_type_b', AnswerSheetTypeBSchema);
