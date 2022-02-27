const Route = require('express').Router();
const AssessmentRoutes = require('./Assessment_Routes/Assessment');
const AssessmentTypeARoutes = require('./Assessment_Routes/AssessmentTypeA');
const AssessmentTypeBRoutes = require('./Assessment_Routes/AssessmentTypeB');
const Recruiter = require('./Recruiter_Routes/Recuriter');
const Company = require('./Company_Routes/Company');

Route.use('/recruiter', Recruiter);
Route.use('/company', Company);
Route.use('/assessment', AssessmentRoutes);
Route.use('/assessment/typea', AssessmentTypeARoutes);
Route.use('/assessment/typeb', AssessmentTypeBRoutes);
module.exports = Route;
