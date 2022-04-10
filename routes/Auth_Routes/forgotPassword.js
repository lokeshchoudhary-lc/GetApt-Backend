const Route = require('express').Router();

const {
  createResetLink,
  useResetLink,
} = require('../../controllers/Auth_Controllers/forgotPassword.controller');

Route.post('/', createResetLink);
Route.post('/:identifier/:link', useResetLink);

module.exports = Route;
