const Route = require('express').Router();
const AssessmentRoutes = require('./Assessment_Routes/assessment');
const AssessmentTypeARoutes = require('./Assessment_Routes/assessmentTypeA');
const AssessmentTypeBRoutes = require('./Assessment_Routes/assessmentTypeB');
const Recruiter = require('./Recruiter_Routes/recuriter');
const Company = require('./Company_Routes/company');

Route.use('/recruiter', Recruiter);
Route.use('/company', Company);
Route.use('/assessment', AssessmentRoutes);
Route.use('/assessment/typea', AssessmentTypeARoutes);
Route.use('/assessment/typeb', AssessmentTypeBRoutes);
module.exports = Route;
