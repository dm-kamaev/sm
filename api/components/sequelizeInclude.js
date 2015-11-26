var modules = require.main.require('./api/modules');
var models = require.main.require('./app/components/models').all;



var generate = function (includes) {
    var dictionary = {
      comment: models.Comment,
      commentGroup: models.CommentGroup,
      addresses: models.Address,
      nearMetro: models.Metro,
      univer: models.Univer,
      school: models.School,
      subject: models.Subject,
      city: models.City,
      cityGia: models.CityGia,
      giaResults: models.GiaResult,
      ratings: models.Rating
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
            if (includes[prop].where)
                node.where = includes[prop].where;
            if (typeof includes[prop] != 'boolean')
                node.include = generate(includes[prop]);
            result.push(node);
        }
    }
    return result;
};

module.exports = generate;

