'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;

const seoListType = require('../enums/seoListType');

var service = {
    name: 'seoSchoolList'
};


/**
 * Creates new seo school list
 * @param {{
 *     description: (?string|undefined),
 *     seoText: (?Array<string>|undefined),
 *     searchParameters: Array<Array<string>>,
 *     listType: string,
 *     geoType: string
 * }} data
 * @return {Promise<models.SeoSchoolList>}
 */
service.create = async(function(data) {
    return models.SeoSchoolList.create(data);
});


/**
 * Return all instances of SeoSchoolList
 * @param {Array<string>=} opt_attributes
 * @return {Promise<models.SeoSchoolList>}
 */
service.getAll = function(opt_attributes) {
    return models.SeoSchoolList.findAll({
        attributes: opt_attributes
    });
};


/**
 * Updates school list with given type
 * @param {{
 *     listType: string,
 *     geoType: ?string,
 * }} type
 * @param {{
 *     description: (?string|undefined),
 *     seoText: (?Array<string>|undefined),
 *     searchParameters: Array<Array<string>>,
 *     listType: string,
 *     geoType: string
 * }} data
 */
service.updateByType = async(function(type, data) {
    await(models.SeoSchoolList.update(
        data,
        {
            where: {
                listType: type.listType,
                geoType: type.geoType || null
            }
        }
    ));
});


/**
 * Return search parameters for given listType and geoType
 * @param {{
 *     listType: string,
 *     geoType: (string|undefined)
 * }} requestParams
 * @return {models.SeoSchoolList}
 */
service.getByType = async(function(requestParams) {
    return await(models.SeoSchoolList.findOne({
        where: {
            listType: requestParams.listType,
            geoType: requestParams.geoType || null
        },
        raw: true
    }));
});


/**
 * Return search parameters for given listTypes and geoTypes
 * @return {Array<models.SeoSchoolList>}
 */
service.getByTypes = async(function() {
    return await(models.SeoSchoolList.findAll({
        attributes: ['title', 'listType', 'geoType'],
        where: {
            listType: [
                seoListType.LYCEUM,
                seoListType.GYMNASIUM,
                seoListType.CADET_SCHOOL
            ],
            geoType: null
        },
        raw: true
    }));
});


/**
 * Return parameters for given listType
 * @param {string} listType
 * @return {Array<models.SeoSchoolList>}
 */
service.getByListType = async(function(listType) {
    return await(models.SeoSchoolList.findAll({
        attributes: ['title', 'listType', 'geoType'],
        where: {
            listType: listType
        },
        raw: true
    }));
});

/**
 * Get all seodata for search page by request params
 * @param {{
 *     listType: string,
 *     geoType: string
 * }} params
 * @return {{
 *     listParams: models.SeoSchoolList,
 *     linksParams: Array<models.SeoSchoolList>
 * }}
 */
service.getDataByRequest = async(function(params) {
    return await({
        listParams: service.getByType(params),
        linksParams: service.getByListType(params.listType)
    });
});

module.exports = service;
