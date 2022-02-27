const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');

const {
  getMyAssessmentTypeA,
  updateAssessmentTypeA,
} = require('../../../controllers/Dashboard_Controllers/Assessment_Controllers/AssessmentTypeA.controller');

Route.get('/:id', canAccess(['admin', 'manager']), getMyAssessmentTypeA);
Route.put('/:id', canAccess(['admin', 'manager']), updateAssessmentTypeA);
module.exports = Route;
