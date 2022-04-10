const Route = require('express').Router();
const { canAccess } = require('../../utils/role_verify');

const {
  createInvite,
  useInvite,
} = require('../../controllers/Auth_Controllers/invite.controller');

Route.post('/create', canAccess(['admin', 'manager']), createInvite);
Route.post('/:InviteLink', useInvite);

module.exports = Route;
