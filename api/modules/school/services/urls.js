var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var translit = require('translitit-cyrillic-russian-to-latin');
exports.name = 'urls';

/**
 * @param {object} school - school instance
 */
exports.generateUrl = async(function(school) {
    var url = encodeURIComponent(translit(school.name));
    try {
        await(school.update(
            {url: url},
            {hooks: false})
        );
    } catch (e) {
        /*if url in use generate different*/
        url = url + '_';
        await(school.update(
            {url: url},
            {hooks: false})
        );
    } finally {
        await(models.SchoolUrl.create({
            schoolId: school.id,
            url: url
        }));
    }
});

exports.createIdUrls = async(function() {
    var schools = await(models.School.findAll());
    await(schools.forEach(school => {
        models.SchoolUrl.create({
            schoolId: school.id,
            url: school.id
        });
    }));
});

exports.updateAll = async(function() {
    var schools = await(models.School.findAll());
    await(schools.forEach(school => this.generateUrl(school)));
});


/**
 * @param {string} url
 * @return {id || null} school
 */
exports.getSchoolByUrl = async(function(url){
    var school = await(models.School.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url']
    }))    
    if (!school) {
        record = await(models.SchoolUrl.findOne({
            where: {
                url: url
            }
        }));
        school = record ? 
            await(models.School.findOne({where: {id: record.schoolId}})) :
            null;
    }
    return school;
});
