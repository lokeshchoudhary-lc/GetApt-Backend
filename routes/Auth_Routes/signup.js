const Route = require('express').Router();

const {
  signup,
} = require('../../controllers/Auth_Controllers/signup.controller');

Route.post('/', signup);

module.exports = Route;
