const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');

const {
  getCompanyProfile,
  getCompanyEmployees,
  updateCompanyProfile,
} = require('../../../controllers/Dashboard_Controllers/Company_Contollers/Company.contoller');

Route.get('/', canAccess(['admin']), getCompanyProfile);
Route.get('/emps', getCompanyEmployees);
Route.put('/', canAccess(['admin']), updateCompanyProfile);

module.exports = Route;
