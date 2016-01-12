var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var translit = require('translitit-cyrillic-russian-to-latin');

var service = {
    name: 'urls'
}

/**
 * @param {string} string
 * @return {string}
 */
service.stringToURL = function(string) {
    string = string.toLowerCase()
        .replace(/и/g,'i')
        .replace(/\ /g, '-')
        .replace(/\./g, '-')
        .replace(/(--)/g, '-')
        .replace(/(\№|«|»|%|(|))/g, '');
    var latin = translit(string);
    return encodeURIComponent(latin);
};

/**
 * @param {object} school - school instance
 */
service.generateUrl = async(function(school) {
    var url = service.stringToURL(school.name);
    try {
        await(school.update(
            {url: url},
            {hooks: false})
        );
    } catch (e) {
        /*if url in use then generate different url*/
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

/**
 * Used once to generate urls by school id
 */
service.createIdUrls = async(function() {
    var schools = await(models.School.findAll());
    await(schools.forEach(school => {
        models.SchoolUrl.create({
            schoolId: school.id,
            url: school.id
        });
    }));
});

/**
 * Used in console script to initialise urls 
 */
service.updateAll = async(function() {
    var schools = await(models.School.findAll());
    await(schools.forEach(school => this.generateUrl(school)));
});


/**
 * @param {string} url
 * @return {id || null} school
 */
service.getSchoolByUrl = async(function(url){
    var school = await(models.School.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url']
    }));
    if (!school) {
        var record = await(models.SchoolUrl.findOne({
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

module.exports = service;

