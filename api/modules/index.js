var school = require('./school');
var comment = require('./comment');
var debug = require('./debug');
var feedback = require('./feedback');
var study = require('./study');
var univer = require('./univer');
var geo = require('./geo');
var user = require('./user');
var models = require.main.require('./app/components/models'),
    services = require.main.require('./app/components/services');

models.initAssociations();

exports.school = school;
exports.comment = comment;
exports.debug = debug;
exports.geo = geo;
exports.feedback = feedback;
exports.study = study;
exports.user = user;
exports.univer = univer;
