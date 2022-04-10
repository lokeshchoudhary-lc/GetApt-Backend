const Route = require('express').Router();

const {
  signup,
  emailCheck,
} = require('../../controllers/Auth_Controllers/signup.controller');

Route.post('/', signup);
Route.post('/check', emailCheck);

module.exports = Route;
