const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');

const {
  getMyAssessment,
  getCompanyAssessment,
  createAssessment,
  getSingleAssessment,
  useTemplate,
  updateAssessment,
  deleteAssessment,
  mergeAssessment,
  candidateResponse,
  candidateResult,
  preview,
} = require('../../../controllers/Dashboard_Controllers/Assessment_Controllers/assessment.controller');

Route.get('/my', getMyAssessment);
Route.get('/company', getCompanyAssessment);
Route.get('/preview/:id', preview);
Route.get('/:id', getSingleAssessment);
Route.post('/template/:id', canAccess(['admin', 'manager']), useTemplate);
Route.post('/', canAccess(['admin', 'manager']), createAssessment);
Route.post('/merge', canAccess(['admin', 'manager']), mergeAssessment);
Route.put('/:id', canAccess(['admin', 'manager']), updateAssessment);
Route.delete('/:id', canAccess(['admin', 'manager']), deleteAssessment);
Route.get('/response/:id', candidateResponse);
Route.get('/result/:id', candidateResult);

module.exports = Route;
