var async = require('asyncawait/async');
var await = require('asyncawait/await');
var lodash = require('lodash');

var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
var subjectView = require('../../study/views/subjectView');
var searchView = require('../views/searchView');

var searchTypeEnum = require('../enums/searchType');
var schoolTypeEnum = require('../enums/schoolType');

exports.name = 'search';

exports.getSchoolRecords = async (function(id) {
    return await (models.SearchData.findAll({
        where: {
            schoolId: id
        }
    }));
});


/**
 * Separate search string and remove symbols
 * @param {string} string
 * @return {array<string>}
 */
var getSearchSubstrings = function(string) {
    return string.toLowerCase()
        .trim()
        .replace(/[^\wа-яА-ЯёЁ\-\s]/g,'') //remove everything except letters, numbers and spaces
        .trim()
        .split(' ');
};


/**
 * @public
 * @param {string} searchString
 * @return {object}
 */
exports.suggestSearch = async(function(searchString) {
    var promises = [
        services.school.searchByText(searchString),
        findAnyInModel(models.Area, searchString),
        findAnyInModel(models.Metro, searchString)
    ];
    var results = await(promises);
    return {
        schools: results[0],
        areas: results[1],
        metros: results[2]
    };
});

/**
 * Generate sql config object for search in schools
 * @param {number} opt_offset
 * @return {Object}
 */
exports.generateSqlConfig = function(opt_offset) {
    var useOffset = (opt_offset !== null && opt_offset !== undefined);
    console.log(opt_offset);
    var sqlConfig = {
        select: [
            'school.id',
            'school.name',
            'school.full_name AS "fullName"',
            'school.rank_dogm AS "rankDogm"',
            'school.description',
            'school.url',
            'school.score',
            'school.total_score AS "totalScore"',
            'school.score_count AS "scoreCount"',
            'school.count_results AS "countResults"',
            'address.id AS "addressId"',
            'metro.id AS "metroId"',
            'metro.name AS "metroName"',
            'area.id AS "areaId"',
            'area.name AS "areaName"',
            'address.coords AS "addressCoords"',
            'address.name AS "addressName"',
            'department.stage AS "departmentStage"'
        ],
        from: {
            select: [
                'school.id',
                'school.name',
                'school.full_name',
                'school.rank_dogm',
                'school.description',
                'school.url',
                'school.score',
                'school.total_score',
                'school.score_count',
                'count(*) OVER() AS count_results'
            ],
            from: ['school'],
            where: [],
            as: 'school',
            join: [],
            group: ['school.id'],
            order: [
                'school.total_score DESC',
                'school.score DESC NULLS LAST',
                'school.id ASC'
            ],
            having: [],
            limit: useOffset ? 10 : "ALL",
            offset: useOffset ? opt_offset * 10 : 0
        },
        where: [
            'address.is_school = true'
        ],
        join: [
            {
                type: 'LEFT OUTER',
                values: [
                    'address on address.school_id = school.id',
                    'address_metro on address_metro.address_id = address.id',
                    'metro on metro.id = address_metro.metro_id',
                    'area on address.area_id = area.id',
                    'department on department.address_id = address.id'
                ]
            }
        ],
        group: [
        ],
        order: [
            'school.total_score DESC',
            'school.score DESC NULLS LAST',
            'school.id ASC',
            'address_metro.distance ASC'
        ],
        having: []
    };

    return sqlConfig;
};

/**
 * @param {object} model
 * @param {string} searchString
 * @return {promise<array<object>> || array<>}
 */
var findAnyInModel = function(model, searchString) {
    var stringArr = getSearchSubstrings(searchString);
    if (!stringArr || stringArr=='')
        return [];

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
 * @return {object}
 */
var iLikeSimilarLetter = function(searchSubstring) {
    var result;

    if (searchSubstring.search(/е/) > -1) {
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
 */
var replaceAt = function(string, position, char) {
    return string.substr(0, position) + char + string.substr(position + 1);
};

/**
 * @param {array<number>}
 * @return {string}
 */
var intArrayToSql = function(arr) {
    return 'ARRAY [' + arr.map(number => '\'' + number + '\'') + ']::INTEGER[]';
};

/**
 * @params {string} field
 * @params {string} string
 * @params {string} [type = 'and']
 * @return {string}
 */
var generateSqlFilter = function(field, string, type) {
    type = type || 'AND';
    var subStrings = getSearchSubstrings(string);
    return subStrings
        .map(substring => field + ' ILIKE \'%' +substring + '%\'')
        .join(' ' + type + ' ');
};

/**
 * @param {object} sqlOptions Existing search config to update
 * @param {object} searchParams
 * @param {?string} searchParams.name - search string
 * @param {?Array<number>} searchParams.classes
 * @param {?number} searchParams.schoolType
 * @param {?Array<number>} searchParams.gia Subjects with high hia results
 * @param {?Array<number>} searchParams.ege
 * @param {?Array<number>} searchParams.olimp
 * TODO: develop criterias
 */
exports.updateSqlOptions = function(sqlOptions, searchParams) {
    var searchDataCount = 0;
    var isGeoDataJoined = false;
    var searchDataWhere = {
        type: 'OR',
        values: []
    };
    if (!Array.isArray(sqlOptions.from)) {
        this.updateSqlOptions(sqlOptions.from, searchParams);

        if (searchParams.sortType) {
            sqlOptions.order.unshift(
                generateOrder(searchParams.sortType)
            );
        }
    }
    else {
        if (searchParams.name) {
            sqlOptions.where.push({
                type: 'OR',
                values: [
                    generateSqlFilter('school.name', searchParams.name, 'AND'),
                    generateSqlFilter('school.full_name', searchParams.name, 'AND'),
                    generateSqlFilter('metro.name', searchParams.name, 'AND'),
                    generateSqlFilter('area.name', searchParams.name, 'AND')
                ]
            });
            isGeoDataJoined = true;
        }

        if (searchParams.classes.length) {
            var classArr = intArrayToSql(searchParams.classes);
            sqlOptions.where.push('school.education_interval @> ' + classArr);
        }

         if (searchParams.sortType) {
            sqlOptions.order.unshift(
                generateOrder(searchParams.sortType)
            );
        }

        if (searchParams.schoolType.length) {
            searchDataCount++;
            searchDataWhere.values.push({
                type: 'AND',
                values: [
                    'search_data.type = \'' + searchTypeEnum.fields.SCHOOL_TYPE + '\'',
                    'search_data.values && ' + intArrayToSql(searchParams.schoolType)
                ]
            });
        }

        if (searchParams.gia.length) {
            searchDataCount++;
            searchDataWhere.values.push({
                type: 'AND',
                values: [
                    'search_data.type = \'' + searchTypeEnum.fields.GIA + '\'',
                    'search_data.values @> ' + intArrayToSql(searchParams.gia)
                ]
            });
        }

        if (searchParams.ege.length) {
            searchDataCount++;
            searchDataWhere.values.push({
                type: 'AND',
                values: [
                    'search_data.type = \'' + searchTypeEnum.fields.EGE + '\'',
                    'search_data.values @> ' + intArrayToSql(searchParams.ege)
                ]
            });
        }

        if (searchParams.olimp.length) {
            searchDataCount++;
            searchDataWhere.values.push({
                type: 'AND',
                values: [
                    'search_data.type = \'' + searchTypeEnum.fields.OLIMPIAD+ '\'',
                    'search_data.values @> ' + intArrayToSql(searchParams.olimp)
                ]
            });
        }

        if (searchParams.areaId) {
            isGeoDataJoined = true;
            sqlOptions.where.push('area.id = ' + searchParams.areaId);
        }

        if (searchParams.metroId) {
            isGeoDataJoined = true;
            sqlOptions.where.push('metro.id = ' + searchParams.metroId);
        }

        if (searchDataCount) {
            //search_data must be first in the from clause
            sqlOptions.from.unshift('search_data');
            sqlOptions.where.push(searchDataWhere);
            sqlOptions.where.push('school.id = search_data.school_id');
            sqlOptions.having.push(['COUNT(DISTINCT search_data.id) ', ' = ', searchDataCount]);
        }
        if (isGeoDataJoined) {
             sqlOptions.join.push({
                 type: 'LEFT OUTER',
                 values: [
                     'address on address.school_id = school.id',
                     'area on area.id = address.area_id',
                     'address_metro on address_metro.address_id = address.id',
                     'metro on metro.id = address_metro.metro_id'
                 ]
             });
        }
    }
};

/**
 * @param {number} sortType
 * @return {array<string>}
 */
var generateOrder = function(sortType) {
    var result = 'school.score[' + sortType + '] DESC NULLS LAST';
    return result;
};

/**
 * @param {array} where
 * @param {string} [opt_type = AND]
 * @return {string}
 */
var generateWhereSql = function(where, opt_type) {
    var type = opt_type || 'AND';
    return where.map(record => {
        if (typeof record == 'string') {
            return record;
        } else if (typeof record == 'object') {
            return '(' + generateWhereSql(record.values, record.type) + ')';
        } else {
            throw new Error('Unexpected type on WHERE parsing');
        }

    }).join(' ' + type + ' ');
};

var generateJoin = function(join) {
    return join.values
        .map(value => ' ' + join.type + ' JOIN ' + value)
        .join('');
};

/**
 * @params {object} sqlOptions
 * @params {bool} opt_notUseDelimiter - if true not add ';' symbol
 * at the end of sqlstring, for inner from query
 * @return {string}
 */
exports.generateSearchSql = function(options, opt_notUseDelimiter) {
    var selectStr = 'SELECT ' + options.select.join(', ');
    var fromStr = ' FROM ';

    if(!Array.isArray(options.from)) {
         fromStr += '(' + this.generateSearchSql(options.from, true)
                + ') AS "' + options.from.as + '"';
        innerFrom = true;
    } else {
        fromStr +=  options.from.join(', ');
    }

    var whereStr = '';
    if (options.where.length)
        whereStr = ' WHERE ' + generateWhereSql(options.where);
    var groupStr = '';
    if (options.group.length)
        groupStr = ' GROUP BY ' + options.group.join(', ');
    var orderStr = '';
    if (options.order.length)
        orderStr = ' ORDER BY ' + options.order.join(', ');
    var havingStr = '';
    if (options.having.length)
        havingStr = ' HAVING ' + options.having
            .map(rec => rec[0] + rec[1] + rec[2])
            .join(' AND ');
    var joinStr = '';
    if (options.join.length)
        joinStr = options.join
            .map(onejoin => generateJoin(onejoin))
            .join(', ');
    var limitStr = '';
    if (options.limit)
        limitStr = ' LIMIT ' + options.limit;
    var offsetStr = '';
    if (options.offset)
        offsetStr = ' OFFSET ' + options.offset;

    var result = selectStr + fromStr + joinStr + whereStr + groupStr + havingStr + orderStr + limitStr + offsetStr;
    if (!opt_notUseDelimiter) {
        result += ';';
    }
    return result;
};

/**
 * @params {string} string
 * @return {object}
 */
exports.generateFilter = function(string) {
    var subStrings = getSearchSubstrings(string);
    return {
        $and: subStrings.filter(substr => {
            if (substr)
                return substr;
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
 * @return {Array.<Object>}
 */
exports.getTypeFilters = async(function() {
    return await(models.SchoolTypeFilter.findAll());
});

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
 */
exports.initSearchParams = async(function(params) {

    /** Transform aliases in filters into ids **/
    var filterTypes = searchTypeEnum.toCamelCaseArray();
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
        if (type == searchTypeEnum.camelCaseFields.SCHOOL_TYPE) {
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
 * @return {Array.<number>|string}
 */
exports.getMapCenterCoords = function(params) {
    var result;
    if (params.metroId) {
        result = services.metro.getCoords(params.metroId);
    } else if (params.areaId) {
        /** Centering on area id **/
    } else if(params.name === '' && !isFiltersSelected(params)) {
        result = 'default';
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
    var filterTypes = searchTypeEnum.toCamelCaseArray(),
        isSelected = lodash.some(filterTypes, (filterType) => {
            return params[filterType].length;
        });
    return isSelected || params.classes.length;
};

/**
 * @param {int} school_id
 * @param {array<int>} values Subjects IDs
 * @param {enums.searchTypes} searchType
 * Used to add data in SearchData table
 *
 */
exports.addSearchData = async(function(schoolId, values, searchType) {
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchType,
        values: values
    }));
});


/**
 * @param {int} school_id
 * @param {int} value school_type_filter id
 */
exports.setSchoolType = async(function(schoolId, value) {
    await(models.SearchData.destroy({
        where: {
            schoolId: schoolId,
            type: searchTypeEnum.fields.SCHOOL_TYPE
        }
    }));
    var values = [];
    values.push(value);
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypeEnum.fields.SCHOOL_TYPE,
        values: values
    }));
});


/**
 * Get one data
 * @param {number} searh_data_id
 * @return {Object} instance of SearhData model
 */
exports.getById = async(function(searh_data_id) {
    return await(models.Department.findOne({
        where: {id: searh_data_id}
    }));
});


/**
 * Delete searshData
 * @param {int} searh_data_id
 */
exports.deleteSearchData = async(function(searh_data_id) {
    var instance = await(exports.getById(searh_data_id));
    instance.destroy();
});
