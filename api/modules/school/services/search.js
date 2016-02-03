var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var searchTypeEnum = require('../enums/searchType');
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
        .replace(/[^\wа-яА-Я\s]/g,'') //remove everything except letters, numbers and spaces
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
        findAnyInModel(models.Metro, searchString),
    ];
    var results = await(promises);
    return {
        schools: results[0],
        areas: results[1],
        metros: results[2]
    };
});

/**
 * @param {object} model
 * @param {string} searchString
 * @return {promise<array<object>> || array<>}
 */
var findAnyInModel = function(model, searchString) {
    var stringArr = getSearchSubstrings(searchString);
    if (!stringArr)
        return [];
    
    var params = {
        where: {
            name: {
                $or: stringArr.map(str => {
                    return {$iLike: '%' + str + '%'};
                })
            }
        }
    };
    return model.findAll(params);
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

    if (searchParams.name) {
        sqlOptions.where.push({
            type: 'OR',
            values: [
                generateSqlFilter('school.name', searchParams.name, 'AND'),
                generateSqlFilter('school.full_name', searchParams.name, 'AND'),
                generateSqlFilter('metro.name', searchParams.name, 'AND'),
                generateSqlFilter('area.name', searchParams.name, 'AND'),
            ]
        });
        isGeoDataJoined = true;
    }

    if (searchParams.classes && searchParams.classes.length) {
        var classArr = intArrayToSql(searchParams.classes);
        sqlOptions.where.push('school.education_interval @> ' + classArr);
    }

    if (searchParams.schoolType) {
        searchDataCount++;
        searchDataWhere.values.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.fields.SCHOOL_TYPE + '\'',
                'search_data.values && ' + intArrayToSql(searchParams.schoolType)
            ]
        });
    }

    if (searchParams.gia) {
        searchDataCount++;
        searchDataWhere.values.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.fields.GIA + '\'',
                'search_data.values @> ' + intArrayToSql(searchParams.gia)
            ]
        });
    }

    if (searchParams.ege) {
        searchDataCount++;
        searchDataWhere.values.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.fields.EGE + '\'',
                'search_data.values @> ' + intArrayToSql(searchParams.ege)
            ]
        });
    }

    if (searchParams.olimp) {
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

    if(typeof options.from[0] == 'object') {
         fromStr += '(' + this.generateSearchSql(options.from[0], true)
                + ') AS "' + options.from[0].as + '"';
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



exports.getTypeFilters = async(function() {
    return await(models.SchoolTypeFilter.findAll());
});


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
