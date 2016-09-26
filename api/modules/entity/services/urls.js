'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    translit = require('translitit-cyrillic-russian-to-latin');

const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityType = require('../enums/entityType');

const service = {
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
    let latin = translit(string)
        .replace(/(--)/g, '-');
    return encodeURIComponent(latin);
};

/**
 * @param {Object} entity - entity instance
 * @param {string} entityType
 */
service.generateEntityAlias = async(function(entity, entityType) {
    if (!entity.name) {
        console.log(
            'WARN:'.yellow +
            ' can\'t create url to entity with id', entity.id
        );
    } else {
        let alias = service.stringToURL(entity.name),
            entityPage =
                await(services.page.getOne(entity.id, entityType));

        if (entityPage && alias != entityPage.alias) {
            try {
                await(entityPage.update(
                    {alias: alias}
                ));
            } catch (error) {
                /* if url in use then generate different url*/
                logger.error(error);
                alias = alias + '_';
                await(entityPage.update(
                    {alias: alias}
                ));
            } finally {
                await(models.AliasBacklog.create({
                    entityId: entity.id,
                    entityType: entityType,
                    alias: alias
                }));
            }
        } else if (!entityPage) {
            await(service.createAlias({
                entityId: entity.id,
                entityType: entityType,
                alias: alias,
                views: 0
            }));
        }
    }
});

/**
 * @param {Object} data
 */
service.createAlias = async(function(data) {
    let isAliasUniq = false;

    while (!isAliasUniq) {
        let page = await(services.page.getByAlias(data.alias, data.entityType));
        if (page) {
            data.alias += '_';
        } else {
            isAliasUniq = true;
        }
    }

    await(services.page.create(data));
});

/**
 * @param {Object} school
 */
service.generateSchoolAlias = async(function(school) {
    await(service.generateEntityAlias(school, entityType.SCHOOL));
});

/**
 * @param {Object} course
 */
service.generateCourseAlias = async(function(course) {
    await(service.generateEntityAlias(course, entityType.COURSE));
});


/**
 * Used once to generate urls by school id
 */
service.createIdUrls = async(function() {
    let schools = await(models.School.findAll());
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
    let schools = await(models.School.findAll());
    await(schools.forEach(school => this.generateSchoolAlias(school)));
});

/**
 * get all urls from database
 * @return {Array}
 */
service.getAllSchoolUrls = async(function() {
    let schoolPages = await(models.Page.findAll({
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
    let page = await(services.page.getByAlias(alias, entityType.SCHOOL)),
        school = await(models.School.findOne({
            where: {
                id: page.entityId
            },
            attributes: ['id']
        }));
    if (!school) {
        let record = await(models.AliasBacklog.findOne({
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
