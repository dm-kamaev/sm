var soy = require('./../../node_modules/clobl/soy');

exports.render = function(template, data) {
    return soy.render(template, data);
};
