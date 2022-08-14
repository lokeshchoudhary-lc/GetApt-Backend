const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');

const {
  getMyAssessmentTypeB,
  updateAssessmentTypeB,
  putQuestionsInAssessmentTypeB
} = require('../../../controllers/Dashboard_Controllers/Assessment_Controllers/assessmentTypeB.controller');

Route.get('/:id', canAccess(['admin', 'manager']), getMyAssessmentTypeB);
Route.put('/:id', canAccess(['admin', 'manager']), updateAssessmentTypeB);
Route.put('/:id/questions', canAccess(['admin', 'manager']), putQuestionsInAssessmentTypeB);

module.exports = Route;
