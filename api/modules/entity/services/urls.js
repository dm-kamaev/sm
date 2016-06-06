'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var translit = require('translitit-cyrillic-russian-to-latin');

var logger = require('../../../../app/components/logger/logger').getLogger('app');

var models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityType = require('../enums/entityType');

var service = {
    name: 'urls'
};

/**
 * @param {string} string
 * @return {string}
 */
service.stringToURL = function(string) {
    string = string.toLowerCase()
        .replace(/\ /g, '-')
        .replace(/\./g, '-')
        .replace(/(\№|«|»|%|(|))/g, '');
    var latin = translit(string)
        .replace(/(--)/g, '-');
    return encodeURIComponent(latin);
};

/**
 * @param {object} school - school instance
 */
service.generateUrl = async(function(school) {
    if (!school.name) {
        console.log(
            'WARN:'.yellow +
            ' can\'t create url to school with id', school.id
        );
    }
    else {
        var url = service.stringToURL(school.name);
        if (url != school.url) {
            try {
                await(school.update(
                    {url: url},
                    {hooks: false})
                );
            } catch (error) {
                /*if url in use then generate different url*/
                logger.error(error);
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
        }
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
 * get all urls from database
 * @return {Array}
 */
service.getAllUrls = async(function() {
    var schools = await(models.School.findAll({
        attributes: ['url']
    }));
    return schools.map(school => school.url);
});

/**
 * @param {string} alias
 * @return {id || null} school
 */
service.getSchoolByUrl = async(function(alias) {
    var page = await(services.page.getByAlias(alias, entityType.SCHOOL)),
        school = await(models.School.findOne({
            where: {
                id: page.entityId
            },
            attributes: ['id']
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
    } else {
        school.alias = page.alias;
    }
    return school;
});

module.exports = service;
