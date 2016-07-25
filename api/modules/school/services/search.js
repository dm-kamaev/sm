var async = require('asyncawait/async');
var await = require('asyncawait/await');
var lodash = require('lodash');

var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
var subjectView = require('../../study/views/subjectView');
var searchView = require('../views/searchView');
var SchoolSearch = require('../lib/search.js');

var schoolSearchType = require('../enums/searchType');

const mapPositionType = require('../enums/mapPositionType');

exports.name = 'search';


/**
 * Get all search data for school with given id and type (if provided)
 * @param {number} id
 * @param {string=} opt_type
 * @return {Array<models.SchoolSearchData>}
 */
exports.getSchoolRecords = async(function(id, opt_type) {
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
 * Separate search string and remove symbols
 * @param {string} string
 * @return {Array<string>}
 */
var getSearchSubstrings = function(string) {
    return string.toLowerCase()
        .trim()
        .replace(/[^\wа-яА-ЯёЁ\-\s]/g, '') // remove everything except
        .trim()                            // letters, numbers and spaces
        .split(' ');
};


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
exports.suggestSearch = async(function(searchString) {
    var promises = {
        schools: services.school.searchByText(searchString),
        areas: findAnyInModel(models.Area, searchString),
        metros: findAnyInModel(models.Metro, searchString),
        districts: findAnyInModel(models.District, searchString)
    };
    var results = await(promises);
    return {
        schools: results.schools,
        areas: results.areas,
        metros: results.metros,
        districts: results.districts
    };
});

exports.getSearchSql = function(searchParams, limit) {
    return new SchoolSearch()
        .setLimit(limit)
        .setOffset(searchParams.page * limit || 0)
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
 * @param {Object} model
 * @param {string} searchString
 * @return {Promise<Array<Object>>|Array}
 */
var findAnyInModel = function(model, searchString) {
    var stringArr = getSearchSubstrings(searchString);
    if (!stringArr || stringArr == '') {
        return [];
    }

    var params = {
        where: {
            name: {
                $or: stringArr.map(str => iLikeSimilarLetter(str))
                        .reduce(function(prev, curr) {
                            return prev.concat(curr);
                        }, [])
            }
        }
    };
    return model.findAll(params);
};

/**
 * @param {string} searchSubstring
 * @return {Object}
 */
var iLikeSimilarLetter = function(searchSubstring) {
    var result;

    if (searchSubstring.indexOf('е') > -1) {
        var similarCharPosition = searchSubstring.lastIndexOf('е'),
            similarString =
                replaceAt(searchSubstring, similarCharPosition, 'ё');

        result = [
            { $ilike: '%' + searchSubstring + '%' },
            { $ilike: '%' + similarString + '%' }
        ];
    } else {
        result = { $ilike: '%' + searchSubstring + '%' };
    }
    return result;
};

/**
 * @param {string} string
 * @param {number} position - position, what will be replaced
 * @param {string} char - new char at position
 * @return {string}
 */
var replaceAt = function(string, position, char) {
    return string.substr(0, position) + char + string.substr(position + 1);
};

/**
 * @param {string} string
 * @return {Object}
 */
exports.generateFilter = function(string) {
    var subStrings = getSearchSubstrings(string);
    return {
        $and: subStrings.filter(substr => {
            if (substr) {
                return substr;
            }
        })
        .map(substr => {
            return {
                $iLike: '%' + substr + '%'
            };
        })
    };
};


/**
 * Get all school type filters
 * @return {Array<models.SchoolTypeFilter>}
 */
exports.getTypeFilters = async(function() {
    return await(models.SchoolTypeFilter.findAll());
});


/**
 * Return school type filter, found by given value
 * @param {string} typeFilterValue
 * @return {Promise<models.schoolTypeFilter>}
 */
exports.getTypeFilterByValue = function(typeFilterValue) {
    return models.SchoolTypeFilter.findOne({
        where: {
            values: {
                $contains: [typeFilterValue]
            }
        }
    });
};

/**
 * Get array with ids of school types by array with their aliases
 * @param {Array.<string>} aliases
 * @return {Array.<number>}
 */
exports.getSchoolTypesByAliases = function(aliases) {
    var searchParams = {
        where: {
            alias: {
                $in: aliases
            }
        },
        attributes: ['id']
    };

    return await(models.SchoolTypeFilter.findAll(searchParams));
};

/**
 * Initialize search params
 * @param {Object} params
 * @param {?string} params.name
 * @param {?Array.<number>} params.classes
 * @param {?Array.<string>} params.schoolType
 * @param {?Array.<string>} params.ege
 * @param {?Array.<string>} params.gia
 * @param {?Array.<string>} params.olimp
 * @param {?number} params.metroId
 * @param {?number} params.areaId
 * @param {?number} params.sortType
 * @param {?number} params.page
 *
 * @return {{
 *     name: string,
 *     schoolType: Array<number>,
 *     classes: Array<number>,
 *     gia: Array<number>,
 *     ege: Array<number>,
 *     olimp: Array<number>,
 *     metroId: ?number,
 *     areaId: ?number,
 *     districtId: ?number,
 *     sortType: ?number,
 *     page: number
 * }}
 */
exports.initSearchParams = async(function(params) {
    /** Transform aliases in filters into ids **/
    var filterTypes = schoolSearchType.toCamelCaseArray();
    var ids = filterTypes.map(filterType => {
        var filter = params[filterType];
        return await(services.search.getFilterIds(filter, filterType));
    });
    var filters = lodash.zipObject(filterTypes, ids);

    return searchView.params(params, filters);
});

/**
 * Get id of each parameter in filter by their alias
 * @param {?Array.<string>} searchParams
 * @return {Array.<number>}
 */
exports.getFilterIds = async(function(filter, type) {
    var ids = [];
    if (filter) {
        if (type == schoolSearchType.camelCaseFields.SCHOOL_TYPE) {
            var types = await(services.search.getSchoolTypesByAliases(filter));
            ids = searchView.schoolTypeFilterIds(types);
        } else {
            var subjects = await(services.subject.getByAliases(filter));
            ids = subjectView.subjectIds(subjects);
        }
    }

    return ids;
});

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
exports.getMapPositionParams = function(params) {
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
exports.addSearchData = async(function(schoolId, values, searchType) {
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
exports.setSchoolType = async(function(schoolId, value) {
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
exports.getById = async(function(searhDataId) {
    return await(models.Department.findOne({
        where: {id: searhDataId}
    }));
});


/**
 * Delete searshData
 * @param {number} searhDataId
 */
exports.deleteSearchData = async(function(searhDataId) {
    var instance = await(exports.getById(searhDataId));
    instance.destroy();
});
