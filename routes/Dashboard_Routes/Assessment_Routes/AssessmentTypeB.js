const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');

const {
  getMyAssessmentTypeB,
  updateAssessmentTypeB,
} = require('../../../controllers/Dashboard_Controllers/Assessment_Controllers/AssessmentTypeB.controller');

Route.get('/:id', canAccess(['admin', 'manager']), getMyAssessmentTypeB);
Route.put('/:id', canAccess(['admin', 'manager']), updateAssessmentTypeB);
module.exports = Route;
