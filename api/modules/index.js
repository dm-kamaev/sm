var school = require('./school');
var comment = require('./comment');
var debug = require('./debug');
var feedback = require('./feedback');
var study = require('./study');
var mail = require('./mail');
var university = require('./university');
var geo = require('./geo');
var user = require('./user');
var favorite = require('./favorite');
var entity = require('./entity');
var course = require('./course');
var models = require('../../app/components/models');

models.initAssociations();

exports.school = school;
exports.course = course;
exports.comment = comment;
exports.debug = debug;
exports.geo = geo;
exports.feedback = feedback;
exports.mail = mail;
exports.study = study;
exports.user = user;
exports.university = university;
exports.favorite = favorite;
exports.entity = entity;
