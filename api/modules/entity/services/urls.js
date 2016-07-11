'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var translit = require('translitit-cyrillic-russian-to-latin');

var logger =
    require('../../../../app/components/logger/logger').getLogger('app');

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
        .replace(/ /g, '-')
        .replace(/\./g, '-')
        .replace(/(№|«|»|%|(|))/g, '');
    var latin = translit(string)
        .replace(/(--)/g, '-');
    return encodeURIComponent(latin);
};

/**
 * @param {object} school - school instance
 */
service.generateSchoolAlias = async(function(school) {
    if (!school.name) {
        console.log(
            'WARN:'.yellow +
            ' can\'t create url to school with id', school.id
        );
    } else {
        var alias = service.stringToURL(school.name),
            schoolPage =
                await(services.page.getOne(school.id, entityType.SCHOOL));
        if (alias != schoolPage.alias) {
            try {
                await(schoolPage.update(
                    {alias: alias}
                ));
            } catch (error) {
                /* if url in use then generate different url*/
                logger.error(error);
                alias = alias + '_';
                await(schoolPage.update(
                    {alias: alias}
                ));
            } finally {
                await(models.AliasBacklog.create({
                    entityId: school.id,
                    entityType: entityType.SCHOOL,
                    alias: alias
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
    await(schools.forEach(school => this.generateSchoolAlias(school)));
});

/**
 * get all urls from database
 * @return {Array}
 */
service.getAllSchoolUrls = async(function() {
    var schoolPages = await(models.Page.findAll({
        attributes: ['alias'],
        where: {
            entityType: entityType.SCHOOL
        }
    }));
    return schoolPages.map(schoolPage => schoolPage.alias);
});

/**
 * @param {string} alias
 * @return {?models.School} school
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
        var record = await(models.AliasBacklog.findOne({
            where: {
                alias: alias,
                entityType: entityType.SCHOOL
            }
        }));
        school = record ?
            await(models.School.findOne({where: {id: record.entityId}})) :
            null;
    } else {
        school.alias = page.alias;
    }
    return school;
});

module.exports = service;
