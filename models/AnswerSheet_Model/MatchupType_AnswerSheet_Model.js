const mongoose = require('mongoose');

const MatchupTypeAnswerSheetSchema = new mongoose.Schema({
  answerSheetId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  candidateAnswer: [String],
});

module.exports = mongoose.model(
  'matchup_type_answer_sheet',
  MatchupTypeAnswerSheetSchema
);
