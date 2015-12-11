var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var transaction = require.main.require('./api/components/transaction.js');
var enums = require.main.require('./api/components/enums').all;
var service = {
    name : 'rating'
};

/**
 * Add raiting row
 * @param {Object} params
 */
service.addRating = async((school, params) => {
    return await(models.Rating.create(params).then(instance => {
                return school.addRatings(instance);
            })).ratings;
});


/**
 * Get all data from table
 */
service.getAll = async(() => {
    return await(models.Rating.findAll());
});


/**
 * Update rating data
 */
service.update = async((school, params) => {
    return await(rating.update(params));
});


/**
 * Get rating by school
 */
// service.getRating = async((school) => {
//     return await(school.getRatings());
// });

module.exports = service;