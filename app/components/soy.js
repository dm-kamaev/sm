var soynode = require('soynode');

exports.render = function(template, data) {
    return soynode.render(template, data);
};
