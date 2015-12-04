var modules = require.main.require('./api/modules');
var models = require.main.require('./app/components/models').all;

/**
 * Generates sequelize include object by params object
 *
 * if emptyAttributes is passed results for joined models
 * wouldnt contain any data. Need for 'group by'
 *
 */

var generate = function (includes, emptyAttributes) {
    emptyAttributes = emptyAttributes || false;

    var dictionary = {
      comment: models.Comment,
      commentGroup: models.CommentGroup,
      addresses: models.Address,
      nearMetro: models.Metro,
      univer: models.Univer,
      school: models.School,
      subject: models.Subject,
      city: models.City,
      cityResult: models.CityResult,
      giaResults: models.GiaResult,
      ratings: models.Rating,
      searchData: models.SearchData,
      olimpResults: models.OlimpResult,
      department: models.Department
    };

    var result = [];
    for (var prop in includes){
        if (prop != 'where') {
            var modelInList = dictionary[prop] /*|| models[prop]*/;
            if (!modelInList)
                throw new Error('Cant find association for relation \'' + prop +
                        '\' Check dictionary in sequelizeInclude.js');
            var node = {
                model: modelInList,
                as: prop
            };
            if (emptyAttributes)
                node.attributes = [];
            if (includes[prop].where)
                node.where = includes[prop].where;
            if (typeof includes[prop] != 'boolean')
                node.include = generate(includes[prop], emptyAttributes);
            result.push(node);
        }
    }
    return result;
};

module.exports = generate;

