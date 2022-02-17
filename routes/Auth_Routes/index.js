const Route = require('express').Router();
const { authVerification } = require('../../utils/jwt_helper');
const login = require('./Login');
const logout = require('./Logout');
const signup = require('./Signup');
const invite = require('./Invite');
const ForgotPassword = require('./ForgotPassword');

Route.use('/login', login);
Route.use('/logout', logout);
Route.use('/signup', signup);
Route.use('/invite', authVerification, invite);
Route.use('/forgotPassword', ForgotPassword);
module.exports = Route;
