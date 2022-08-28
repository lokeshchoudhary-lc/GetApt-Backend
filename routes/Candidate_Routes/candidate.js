const Route = require('express').Router();

const {
  getLinkInfo,
  createAssessmentLink,
  createCandidateProfile,
  updateCandidateProfile,
  startAssessmentOfType,
  candidateFeedback,
  getAnswerSheet,
  updateAnswerSheet,
  submitAndMarkAnswers,
  getCandidateProfile,
} = require('../../controllers/Candidate_Controllers/candidate.controller');

const {
  getSingleAnswer,
  updateSingleAnswer,
} = require('../../controllers/Candidate_Controllers/Answer_Controllers/answer.controller');

Route.get('/link/:link', getLinkInfo);
Route.post('/link', createAssessmentLink);
Route.get('/start/', startAssessmentOfType);
Route.get('/:id', getCandidateProfile);
Route.post('/', createCandidateProfile);
Route.put('/:id', updateCandidateProfile);
Route.post('/feedback', candidateFeedback);
Route.get('/submit', submitAndMarkAnswers);
Route.get('/answerSheet', getAnswerSheet);
Route.put('/answerSheet', updateAnswerSheet);
Route.get('/answer/:id', getSingleAnswer);
Route.post('/answer', updateSingleAnswer);

module.exports = Route;
