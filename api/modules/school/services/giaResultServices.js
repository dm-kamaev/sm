var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

exports.getAll = async(() => {
    return await(models.GiaResult.findAll());
});

/**
 * @param {{
 *     id?: number,
 *     count?: number,
 *     result?: number,
 *     school_id?: number,
 *     subject_id?: number
 * }} gia
 * @param {{
 *     count?: 'one',
 *     createIfNotExists?: Boolean
 * }} opt_option
 *
 * @return {Promise} A promise that returns GiaResult model instance / instances
 */
exports.get = async ((gia, opt_option) => {
    var option = opt_option || {};

    var searchTerms = {
        where: gia
    };

    var res;

    if (option.createIfNotExists) {
        searchTerms = {
            where: {
                school_id: gia.school_id,
                subject_id: gia.subject_id
            }
        };

        var foundGia = await(models.GiaResult.findOne(searchTerms));
        res = foundGia || await(this.create(gia));

    } else if (option.count == 'one') {
        res = await(models.GiaResult.findOne(searchTerms));
    } else {
        res = await(models.GiaResult.findAll(searchTerms));
    }

    return res;
});

/**
 * @param {{
 *     count?: number,
 *     result?: number,
 *     school_id?: number,
 *     subject_id?: number
 * }} gia
 * @param {{
 *     updateIfExists?: Boolean
 * }} opt_option
 * @return {Promise} A promise that returns GiaResult model instance
 */
exports.create = async((gia, opt_option) => {
        var option = opt_option || {};
        var res;

        if (option.updateIfExists) {
            var giaFound = await (this.get({
                school_id: gia.school_id,
                subject_id: gia.subject_id
            }, {count: 'one'}));

            res = giaFound ?
                await (giaFound.update(gia)) :
                await (models.GiaResult.create(gia));
        } else {
            res = await (models.GiaResult.create(gia));
        }

        return res;
    }
);
