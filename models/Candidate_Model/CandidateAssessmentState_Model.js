const mongoose = require('mongoose');

const CandidateAssessmentState = mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  answerSheetId: { type: mongoose.Schema.Types.ObjectId },
  answerSheetTypeA_Id: { type: mongoose.Schema.Types.ObjectId },
  answerSheetTypeB_Id: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model(
  'candidate_assessment_state',
  CandidateAssessmentState
);
