'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    lodash = require('lodash');

const models = require('../../../../app/components/models').all,
    services = require('../../../../app/components/services').all,
    SchoolSearchQuery = require('../lib/SchoolSearch'),
    subjectView = require('../../study/views/subjectView'),
    searchView = require('../views/searchView');

const entityType = require('../../entity/enums/entityType'),
    schoolSearchType = require('../enums/searchType'),
    mapPositionType = require('../enums/mapPositionType');

let service = {
    name: 'schoolSearch'
};

/**
 * Get all search data for school with given id and type (if provided)
 * @param {number} id
 * @param {string=} opt_type
 * @return {Array<models.SchoolSearchData>}
 */
service.getSchoolRecords = async(function(id, opt_type) {
    var conditions = {};

    if (opt_type) {
        conditions = {
            $and: {
                schoolId: id,
                type: opt_type
            }
        };
    } else {
        conditions = {
            schoolId: id
        };
    }
    return await(models.SchoolSearchData.findAll({
        where: conditions
    }));
});

/**
 * @public
 * @param {string} searchString
 * @return {{
 *     schools: Array<models.School>,
 *     areas: Array<models.Area>,
 *     metros: Array<models.Metro>,
 *     districts: Array<models.District>
 * }}
 */
service.suggestSearch = async(function(searchString) {
    var resultIds = await(services.textSearchData.entitiesSearch(searchString, [
        entityType.SCHOOL,
        entityType.METRO,
        entityType.AREA,
        entityType.DISTRICT
    ]));

    return await({
        schools: services.school.getByIds(
            resultIds[entityType.SCHOOL] || []
        ),
        areas: services.area.getByIds(resultIds[entityType.AREA] || []),
        metros: services.metro.getByIds(resultIds[entityType.METRO] || []),
        districts: services.district.getByIds(
            resultIds[entityType.DISTRICT] || []
        )
    });
});

service.getSearchSql = function(searchParams, opt_limit) {
    return new SchoolSearchQuery()
        .setLimit(opt_limit)
        .setOffset(searchParams.page * opt_limit || 0)
        .setSortType(searchParams.sortType)
        .setSearchString(searchParams.name)
        .setClasses(searchParams.classes)
        .setSchoolType(searchParams.schoolType)
        .setStudyResult(searchParams.gia, 'gia')
        .setStudyResult(searchParams.ege, 'ege')
        .setStudyResult(searchParams.olimp, 'olymp')
        .setSpecializedClassType(searchParams.specializedClassType)
        .setActivitySphere(searchParams.activitySphere)
        .setArea(searchParams.areaId)
        .setMetro(searchParams.metroId)
        .setDistrict(searchParams.districtId)
        .getQuery();
};

/**
 * Get all school type filters
 * @return {Array<models.SchoolTypeFilter>}
 */
service.getTypeFilters = async(function() {
    return await(models.SchoolTypeFilter.findAll());
});


/**
 * Return school type filter, found by given value
 * @param {string} typeFilterValue
 * @return {Promise<models.schoolTypeFilter>}
 */
service.getTypeFilterByValue = function(typeFilterValue) {
    return models.SchoolTypeFilter.findOne({
        where: {
            values: {
                $contains: [typeFilterValue]
            }
        }
    });
};


/**
 * Get center coordinates for map depending of given search params
 * @param {Object} params
 * @param {number} params.metroId
 * @param {number} params.areaId
 * @param {string} params.name
 * @return {Object.<{
 *     center: Array.<number>,
 *     type: string
 * }>}
 */
service.getMapPositionParams = function(params) {
    var result = {};
    if (params.metroId) {
        result = {
            center: services.metro.getCoords(params.metroId),
            type: mapPositionType.METRO
        };
    } else if (params.areaId) {
        /** Centering on area id **/
        result = {
            type: mapPositionType.AREA
        };
    } else if (params.districtId) {
        result = {
            center: services.district.getCenterCoords(params.districtId),
            type: mapPositionType.DISTRICT
        };
    } else if (params.name === '' && !isFiltersSelected(params)) {
        result = {
            center: services.city.getCenterCoords(),
            type: mapPositionType.CITY_CENTER
        };
    }
    return result;
};

/**
 * Check whether one of filters selected
 * @param {Object} params
 * @param {?Array.<number>} params.classes
 * @param {?Array.<number>} params.schoolType
 * @param {?Array.<number>} params.ege
 * @param {?Array.<number>} params.gia
 * @param {?Array.<number>} params.olimp
 * @return {boolean}
 */
var isFiltersSelected = function(params) {
    var filterTypes = schoolSearchType.toCamelCaseArray(),
        isSelected = lodash.some(filterTypes, filterType => {
            return params[filterType].length;
        });
    return isSelected || params.classes.length;
};

/**
 * Used to add data in SearchData table
 * @param {number} school_id
 * @param {Array<number>} values Subjects IDs
 * @param {enums.searchTypes} searchType
 */
service.addSearchData = async(function(schoolId, values, searchType) {
    await(models.SchoolSearchData.create({
        schoolId: schoolId,
        type: searchType,
        values: values
    }));
});


/**
 * @param {number} school_id
 * @param {number} value school_type_filter id
 */
service.setSchoolType = async(function(schoolId, value) {
    await(models.SchoolSearchData.destroy({
        where: {
            schoolId: schoolId,
            type: schoolSearchType.fields.SCHOOL_TYPE
        }
    }));
    var values = [];
    values.push(value);
    await(models.SchoolSearchData.create({
        schoolId: schoolId,
        type: schoolSearchType.fields.SCHOOL_TYPE,
        values: values
    }));
});


/**
 * Get one data
 * @param {number} searhDataId
 * @return {Object} instance of SearhData model
 */
service.getById = async(function(searhDataId) {
    return await(models.Department.findOne({
        where: {id: searhDataId}
    }));
});


/**
 * Delete searshData
 * @param {number} searhDataId
 */
service.deleteSearchData = async(function(searhDataId) {
    var instance = await(service.getById(searhDataId));
    instance.destroy();
});

module.exports = service;
