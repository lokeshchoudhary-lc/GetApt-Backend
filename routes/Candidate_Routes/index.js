const Route = require('express').Router();

const candidateRoutes = require('./candidate');

Route.use('/candidate', candidateRoutes);

module.exports = Route;