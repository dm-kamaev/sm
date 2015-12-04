var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');  

exports.name = 'subject';

/**
 * @param {{
 *     name?: string
 * }} subject
 * @return {Object} Subject model instance
 */
exports.create = async (subject => {
    return await (models.Subject.create(subject));
});

/**
 * @param {{
 *     id?: number,
 *     name?: string
 * }} subject
 * @param {{
 *     count?: 'one',
 *     createIfNotExists?: boolean
 * }} opt_option
 * @return {object} Subject model instance or instances
 */
exports.get = async ((subject, opt_option) => {
    var option = opt_option || {},
        res = null;

    var searchTerms = {
        where: subject
    };

    if (option.count == 'one') {
        res = await (models.Subject.findOne(searchTerms));
    } else {
        res = await (models.Subject.findAll(searchTerms));
    }

    if (!res && option.createIfNotExists) {
        res = await (this.create(subject));
    }

    return res;
});

exports.getOrCreate = async(name => {
    name = name.toLowerCase();
    var res = await (models.Subject.findOne({
        where: {
            name: name
        }
    }));
    if (!res) {
        res = await(models.Subject.create({
            name: name
        }));
    }
    return res;

});

exports.list = async (function(){
    return await (models.Subject.findAll());
}); 
/**
 * get all the subjects with city default gia results
 */
exports.listCityResults = async (() => {
    var includeParams = {
        cityResult: true 
    }
    return await (models.Subject.findAll({
        include: sequelizeInclude(includeParams) 
    }));
});
