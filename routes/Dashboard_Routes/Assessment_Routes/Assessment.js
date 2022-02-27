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
} = require('../../../controllers/Dashboard_Controllers/Assessment_Controllers/Assessment.controller');

Route.get('/my', getMyAssessment);
Route.get('/company', getCompanyAssessment);
Route.get('/:id', getSingleAssessment);
Route.post('/template/:id', canAccess(['admin', 'manager']), useTemplate);
Route.post('/', canAccess(['admin', 'manager']), createAssessment);
Route.put('/:id', canAccess(['admin', 'manager']), updateAssessment);
Route.delete('/:id', canAccess(['admin', 'manager']), deleteAssessment);

module.exports = Route;
