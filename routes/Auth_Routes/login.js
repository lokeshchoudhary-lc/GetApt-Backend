const Route = require('express').Router();

const {
  login,
} = require('../../controllers/Auth_Controllers/login.controller');

Route.post('/', login);

module.exports = Route;
