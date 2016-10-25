'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    url = require('url'),
    translit = require('translitit-cyrillic-russian-to-latin');

const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    entityTypes = require('../enums/entityType');

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
            if (entityType == entityTypes.COURSE) {
                await(service.getUniqueCourseAlias({
                    entityId: entity.id,
                    entityType: entityType,
                    alias: alias,
                    views: 0
                }, entity.brandId));
            } else {
                await(service.createAlias({
                    entityId: entity.id,
                    entityType: entityType,
                    alias: alias,
                    views: 0
                }));
            }
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
 * @param {Object} data
 * @param {number} brandId
 * @return {string}
 */
service.getUniqueCourseAlias = async(function(data, brandId) {
    let brandCourseIds = await(services.course.getByBrandId(brandId))
        .map(course => course.id),
        coursePages = await(services.page.getAliases(
            brandCourseIds,
            entityTypes.COURSE
        )),
        isAliasUniq = false;

    while (!isAliasUniq) {
        let page = coursePages.find(coursePage =>
            coursePage.alias == data.alias);
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
    await(service.generateEntityAlias(school, entityTypes.SCHOOL));
});

/**
 * @param {Object} course
 */
service.generateCourseAlias = async(function(course) {
    await(service.generateEntityAlias(course, entityTypes.COURSE));
});

/**
 * @param {Object} courseBrand
 */
service.generateCourseBrandAlias = async(function(courseBrand) {
    await(service.generateEntityAlias(courseBrand, entityTypes.COURSE_BRAND));
});

/**
 * Generate alias for given course category and write it to db
 * @param {models.CourseCategory} courseCategory
 */
service.generateCourseCategoryAlias = async(function(courseCategory) {
    await(service.generateEntityAlias(
        courseCategory, entityTypes.COURSE_CATEGORY
    ));
});

/**
 * Replace course category alias by deleting old one and creating new one
 * @param {models.CourseCategory} courseCategory
 */
service.replaceCourseCategoryAlias = async(function(courseCategory) {
    await(services.courseCategory.deleteAlias(courseCategory));
    await(service.generateCourseCategoryAlias(courseCategory));
});

/**
 * Replace course alias by deleting old one and creating new one
 * @param {models.Course}
 */
service.replaceCourseAlias = async(function(course) {
    await(services.page.delete(course.id, entityTypes.COURSE));
    await(service.generateCourseAlias(course));
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
            entityType: entityTypes.SCHOOL
        }
    }));
    return schoolPages.map(schoolPage => schoolPage.alias);
});

/**
 * @param {string} alias
 * @param {string} entityType
 * @return {(Object|null)}
 */
service.getEntityByUrl = async(function(alias, entityType) {
    let entityModels = {
        school: models.School,
        course: models.Course
    };
    let page = await(services.page.getByAlias(alias, entityType)),
        entity = await(entityModels[entityType].findOne({
            where: {
                id: page.entityId
            },
            attributes: ['id']
        }));
    if (!entity) {
        let record = await(models.AliasBacklog.findOne({
            where: {
                alias: alias,
                entityType: entityType
            }
        }));
        entity = record ?
            await(entityModels[entityType].findOne(
                {where: {id: record.entityId}}
            )) :
            null;
    } else {
        entity.alias = page.alias;
    }
    return entity;
});

/**
 * @param  {string} uri
 * @param  {string} baseUrl
 * @return {string}
 */
service.addSubdomain = function(uri, baseUrl) {
    let parsedUri = url.parse(uri),
        host = parsedUri.host;
    parsedUri.host = baseUrl.replace('/', '') + '.' + host;

    return url.format(parsedUri);
};

module.exports = service;
