const Route = require('express').Router();

const {
  login,
} = require('../../controllers/Auth_Controllers/Login.controller');

Route.post('/', login);

module.exports = Route;
