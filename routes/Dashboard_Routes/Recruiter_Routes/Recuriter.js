const Route = require('express').Router();
const { canAccess } = require('../../../utils/role_verify');
const {
  getMyProfile,
  getOthersProfile,
  updateMyProfile,
  updateOthersProfileRole,
  deleteOthersProfile,
} = require('../../../controllers/Dashboard_Controllers/Recruiter_Controllers/Recuriter.controller');

Route.get('/', getMyProfile);
Route.get('/:id', getOthersProfile);
Route.put('/', updateMyProfile);
Route.put('/:id', canAccess(['admin']), updateOthersProfileRole);
Route.delete('/:id', canAccess(['admin']), deleteOthersProfile);

module.exports = Route;
