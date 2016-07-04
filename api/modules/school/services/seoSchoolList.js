'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    lodash = require('lodash');

const models = require('../../../../app/components/models').all;

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
 * @return {Promise<models.SeoSchoolList>}
 */
service.getAll = function() {
    return models.SeoSchoolList.findAll();
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
    var conditions = {};

    if (type.geoType) {
        conditions = {
            where: {
                listType: type.listType,
                geoType: type.geoType
            }
        };
    } else {
        conditions = {
            where: {
                listType: type.listType
            }
        };
    }

    await(models.SeoSchoolList.update(data, conditions));
});

/**
 * Return search parameters for given listType and geoType
 * @param {{
 *     listType: string,
 *     geoType: (string|undefined)
 * }} pageParams
 * @return {models.SeoSchoolList}
 */
service.getByRequestParams = async(function(requestParams) {
    var conditions = {};

    if (requestParams.geoType) {
        conditions = {
            where: {
                listType: requestParams.listType,
                geoType: requestParams.geoType
            }
        };
    } else {
        conditions = {
            where: {
                listType: requestParams.listType
            }
        };
    }

    return await(models.SeoSchoolList.findOne(conditions));
});

module.exports = service;
