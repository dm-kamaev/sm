var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');
var searchTypeEnum = require('../../school/enums/searchType');

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


/**
 * @param {object} data
 * @param {object} data.subject - subject instance
 * @param {number||null} data.giaAvg
 * @param {number||null} data.egeAvh
 * @param {number} subject.dataValues.average
 * TODO: city filter
 */
exports.setCityAverage = async(function(data) {
    var subject = data.subject;
    var city = await (services.city.getMoscow());
    var subjectAvg = await (models.CityResult.findOne({
        where: {
            cityId: city.id,
            subjectId: subject.id
        }
    }));
    if (subjectAvg) {
        await(subjectAvg.update({
            giaResult: data.giaAvg,
            egeResult: data.egeAvg
        }));
    } else {
       await (models.CityResult.create({
            cityId: city.id,
            subjectId: subject.id,
            giaResult: data.giaAvg,
            egeResult: data.egeAvg
       }));
    }
});

/**
 * @param params {{
 *     model: {object},
 *     modelAs: {string},
 *     filterName: {string}
 * }}
 */
var generateFilters = async(function(params) {
    var subjects = await (models.Subject.findAll());
    var filters = await (params.model.findAll({
        attributes: ['subject_id'],
        group: 'subject_id'
    }));

    var formatedSubjects = subjects
        .filter(subject =>
            filters.find(filter =>
                filter.subject_id == subject.id))
        .map(subject => {
            return {
                label: subject.displayName,
                value: subject.id,
                alias: subject.alias
            };
        });

    return {
        filter: params.filterName,
        values: formatedSubjects
    };
});

/**
 * @private
 */
exports.egeFilters = async (function() {
    var params = {
        model: models.EgeResult,
        modelAs: 'egeResult',
        filterName: searchTypeEnum.fields.EGE
    };
    return await (generateFilters(params));
});

/**
 * @private
 */
exports.giaFilters = async (function() {
    var params = {
        model: models.GiaResult,
        modelAs: 'giaResult',
        filterName: searchTypeEnum.fields.GIA
    };
    return await (generateFilters(params));
});

/**
 * @private
 */
exports.olympFilters = async (function() {
    var params = {
        model: models.OlimpResult,
        modelAs: 'olimpResult',
        filterName: searchTypeEnum.fields.OLIMPIAD
    };
    return await (generateFilters(params));
});

/**
 * get all the subjects with city default gia results
 */
exports.listCityResults = async (() => {
    var includeParams = {
        cityResult: true
    };

    return await (models.Subject.findAll({
        include: sequelizeInclude(includeParams)
    }));
});

/**
 * Get array with subjects ids by array with aliases
 * @param {Array.<string>} aliases
 * @return {Array.<number>}
 */
exports.getIdsByAliasses = async ((aliases) => {
    var searchParams = {
        where: {
            alias: {
                $in: aliases
            }
        },
        attributes: ['id']
    };
    var subjects = await(models.Subject.findAll(searchParams));

    return subjects.map((subject) => {
        return subject.id;
    });
});