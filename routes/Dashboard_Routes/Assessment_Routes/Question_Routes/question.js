const Route = require('express').Router();
const { canAccess } = require('../../../../utils/role_verify');

const {
  addSingleQuestion,
  deleteSingleQuestion,
  getSingleQuestion,
  updateSingleQuestion,
} = require('../../../../controllers/Dashboard_Controllers/Assessment_Controllers/Question_Controllers/question.controller');

Route.get('/:id', getSingleQuestion);
Route.post('/', canAccess(['admin', 'manager']), addSingleQuestion);
Route.put('/:id', canAccess(['admin', 'manager']), updateSingleQuestion);
Route.delete('/:id', canAccess(['admin', 'manager']), deleteSingleQuestion);

module.exports = Route;
