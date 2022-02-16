const Route = require('express').Router();

const {
  signup,
} = require('../../controllers/Auth_Controllers/Signup.controller');

Route.post('/', signup);

module.exports = Route;
