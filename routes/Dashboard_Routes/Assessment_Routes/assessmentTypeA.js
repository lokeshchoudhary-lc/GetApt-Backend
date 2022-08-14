const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');

const {
  getMyAssessmentTypeA,
  updateAssessmentTypeA,
  putQuestionsInAssessmentTypeA
} = require('../../../controllers/Dashboard_Controllers/Assessment_Controllers/assessmentTypeA.controller');

Route.get('/:id', canAccess(['admin', 'manager']), getMyAssessmentTypeA);
Route.put('/:id', canAccess(['admin', 'manager']), updateAssessmentTypeA);
Route.put('/:id/questions', canAccess(['admin', 'manager']), putQuestionsInAssessmentTypeA);

module.exports = Route;
