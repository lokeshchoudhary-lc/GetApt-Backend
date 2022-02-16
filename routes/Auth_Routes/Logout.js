const Route = require('express').Router();

const {
  logout,
} = require('../../controllers/Auth_Controllers/Logout.controller');

Route.get('/', logout);

module.exports = Route;
