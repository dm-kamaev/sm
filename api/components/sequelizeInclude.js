var modules = require.main.require('./api/modules');
var models = require.main.require('./app/components/models').all;

var dictionary = {
  comment: models.Comment,
  address: models.Address,
  nearMetro: models.Metro,
  univer: models.Univer,
  school: models.School
};

var generate = function (includes) {
    var result = [];
    for (var prop in includes) {
        var node = {
            model: dictionary[prop],
            as: prop
        };
        if (typeof includes[prop] != 'boolean')
            node.include = generate(includes[prop]);
        result.push(node);
    }
    return result;
};

module.exports = generate;

