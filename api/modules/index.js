var school = require('./school');
var comment = require('./comment');
var debug = require('./debug');

var models = require.main.require('./app/components/models');
models.initAssociations();

exports.school = school;
exports.comment = comment;
exports.debug = debug;
