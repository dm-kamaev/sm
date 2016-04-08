var school = require('./school');
var comment = require('./comment');
var debug = require('./debug');
var feedback = require('./feedback');
var study = require('./study');
var mail = require('./mail');
var univer = require('./univer');
var geo = require('./geo');
var user = require('./user');
var models = require('../../app/components/models'),
    services = require('../../app/components/services');

models.initAssociations();

exports.school = school;
exports.comment = comment;
exports.debug = debug;
exports.geo = geo;
exports.feedback = feedback;
exports.mail = mail;
exports.study = study;
exports.user = user;
exports.univer = univer;
