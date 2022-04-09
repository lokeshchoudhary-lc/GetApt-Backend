const Route = require('express').Router();
const { authVerification } = require('../../utils/jwt_helper');
const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const invite = require('./invite');
const ForgotPassword = require('./forgotPassword');

Route.use('/login', login);
Route.use('/logout', logout);
Route.use('/signup', signup);
Route.use('/invite', authVerification, invite);
Route.use('/forgotPassword', ForgotPassword);
module.exports = Route;
