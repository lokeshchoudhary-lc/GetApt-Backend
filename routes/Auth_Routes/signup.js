const Route = require('express').Router();

const {
  signup,
  emailCheck,
} = require('../../controllers/Auth_Controllers/Signup.controller');

Route.post('/', signup);
Route.post('/check', emailCheck);

module.exports = Route;
