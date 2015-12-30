var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize = require.main.require('./app/components/db');

exports.name = 'studyResult';


const OLIMP_TYPES = [
    {
        name: 'Всероссийская олимпиада',
        value: 'всероссийская'
    }, {
        name: 'Московская олимпиада',
        value: 'московская'
    }
];

/**
 * param {int} school_id
 */
exports.dropEgeResults = async(function(school_id) {
    await(models.EgeResult.destroy({
        where: {
            schoolId: school_id
        }
    }));
});

exports.setSchoolOlimp = async((school, olimpResults) => {
    await(models.OlimpResult.destroy({
        where: {
            schoolId: school.id
        }
    }));
    await(olimpResults.forEach(olimp => {
        var subject = await(services.subject.getOrCreate(olimp.subject)),
            type = OLIMP_TYPES.find(tp => tp.name == olimp.type),
            status = olimp.status || null;
        if (!type) 
            throw new Error('Undefined olimp type: '+ olimp.type);
        await(models.OlimpResult.create({
            schoolId: school.id,
            subjectId: subject.id,
            type: type.value,
            stage: olimp.stage || null,
            class: olimp.class || null,
            status: status.replace('ё','е'), //TODO: craete an enum controller and refactor this
            year: olimp.year || null
        }));
    }));
});

exports.getAllGia = async(() => {
    return await(models.GiaResult.findAll());
});

/**
 * @return {array<object>} subjects with gia average
 * @param {integer} cityId
 * TODO: count avg for city
 */
exports.getGiaAverage = async(function (cityId) {
    var sqlString = 'select subject_id, AVG(result) ' + 
        'from gia_result group by subject_id';
    var sqlRes = await(sequelize.query(
            sqlString, 
            { type: sequelize.QueryTypes.SELECT}
        )
    );
    return sqlRes.map(res => { 
        return {
            subjectId: res.subject_id,
            result: res.avg,
            type: 'gia',
            cityId: cityId
        };
    });
});

/**
 * @return {array<object>} subjects with ege average
 * @param {integer} cityId
 * TODO: count avg for city
 */
exports.getEgeAverage = async(function(cityId) {
    var sqlString = 'select subject_id, year, AVG(result) ' + 
        'from ege_result group by year, subject_id';
    var sqlRes = await(sequelize.query(
            sqlString, 
            { type: sequelize.QueryTypes.SELECT}
        )
    );
    return sqlRes.map(res => { 
        return {
            subjectId: res.subject_id,
            year: res.year,
            result: res.avg,
            type: 'ege',
            cityId: cityId
        };
    });
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
exports.getGia = async ((gia, opt_option) => {
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
exports.createGia = async((gia, opt_option) => {
        var option = opt_option || {};
        var res;

        if (option.updateIfExists) {
            var giaFound = await (this.getGia({
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
/**
 * @param {
 *      year: int,
 *      schoolId: int,
 *      result: float,
 *      subject_id: int
 * } ege
 */
exports.createEge = async(function(ege){
    await (models.EgeResult.create(ege));   
});
