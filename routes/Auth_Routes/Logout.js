const Route = require('express').Router();

const {
  logout,
} = require('../../controllers/Auth_Controllers/logout.controller');

Route.get('/', logout);

module.exports = Route;
