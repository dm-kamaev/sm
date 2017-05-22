var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
var sequelizeInclude = require('../../../../api/components/sequelizeInclude');

const entityRoutes = require('../../entity/enums/entityRoutes').routes;
const universityEgeSubjectsOrder =
    require('../views/constants/universityEgeSubjectsOrder');

exports.name = 'subject';

/**
 * @param {{
 *     name?: string
 * }} subject
 * @return {Object} Subject model instance
 */
exports.create = async(subject => {
    return await(models.Subject.create(subject));
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
exports.get = async((subject, opt_option) => {
    var option = opt_option || {},
        res = null;

    var searchTerms = {
        where: subject
    };

    if (option.count == 'one') {
        res = await(models.Subject.findOne(searchTerms));
    } else {
        res = await(models.Subject.findAll(searchTerms));
    }

    if (!res && option.createIfNotExists) {
        res = await(this.create(subject));
    }

    return res;
});


/**
 * Return all subjects
 * @return {Array<models.Subject>}
 */
exports.getAll = async(function() {
    return await(models.Subject.findAll({
        raw: true
    }));
});

exports.getOrCreate = async(name => {
    name = name.toLowerCase();
    var res = await(models.Subject.findOne({
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
    var city = await(services.city.getMoscow());
    var subjectAvg = await(models.CityResult.findOne({
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
        await(models.CityResult.create({
            cityId: city.id,
            subjectId: subject.id,
            giaResult: data.giaAvg,
            egeResult: data.egeAvg
        }));
    }
});

/**
 * get all the subjects with city default gia results
 */
exports.listCityResults = async(() => {
    var includeParams = {
        cityResult: true
    };

    return await(models.Subject.findAll({
        include: sequelizeInclude(includeParams)
    }));
});

/**
 * @param  {Array<number>} ids
 * @return {Promise<Array<Subject>>}
 */
exports.getByIds = async(function(ids) {
    return models.Subject.findAll({
        where: {
            id: {
                $in: ids
            }
        }
    });
});

/**
 * @async
 * @param  {string}  name
 * @param  {string?} type
 * @return {Promise<SubjectModel[]>}
 */
exports.searchByName = async(function(name, type) {
    const nameSearch = {
        $ilike: `%${name}%`
    };
    if (type === entityRoutes.UNIVERSITY.route) {
        nameSearch['$in'] = universityEgeSubjectsOrder;
    }
    return models.Subject.findAll({
        where: {
            name: nameSearch
        }
    });
});
