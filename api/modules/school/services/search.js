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

    if (searchParams.name) {
        sqlOptions.where.push({
            type: 'or',
            values: [
                generateSqlFilter('school.name', searchParams.name, 'AND'),
                generateSqlFilter('school.full_name', searchParams.name, 'AND'),
                generateSqlFilter('school.abbreviation', searchParams.name, 'AND'),
            ]
        });
    }

    if (searchParams.classes && searchParams.classes.length) {
        var classArr = intArrayToSql(searchParams.classes);
        sqlOptions.where.push('school.education_interval @> ' + classArr);
    }

    if (searchParams.schoolType) {
        searchDataCount++;
        sqlOptions.where.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.SCHOOL_TYPE + '\'',
                'search_data.values && ' + intArrayToSql(searchParams.schoolType)
            ]
        });
    }

    if (searchParams.gia) {
        searchDataCount++;
        sqlOptions.where.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.GIA + '\'',
                'search_data.values @> ' + intArrayToSql(searchParams.gia)
            ]
        });
    }

    if (searchParams.ege) {
        searchDataCount++;
        sqlOptions.where.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.EGE + '\'',
                'search_data.values @> ' + intArrayToSql(searchParams.ege)
            ]
        });
    }

    if (searchParams.olimp) {
        searchDataCount++;
        sqlOptions.where.push({
            type: 'AND',
            values: [
                'search_data.type = \'' + searchTypeEnum.OLIMPIAD+ '\'',
                'search_data.values @> ' + intArrayToSql(searchParams.olimp)
            ]
        });
    }

    if (searchDataCount) {
        sqlOptions.from.push('search_data');
        sqlOptions.where.push('school.id = search_data.school_id');
        sqlOptions.having.push(['COUNT(\'\') ', ' = ', searchDataCount]);
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

/**
 * @params {object} sqlOptions
 * @return {string}
 */
exports.generateSearchSql = function(options) {
    var selectStr = 'SELECT ' + options.select.join(', ');
    var fromStr = ' FROM ' + options.from.join(', ');
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
    return selectStr + fromStr + whereStr + groupStr + havingStr + orderStr + ';';
};

/**
 * @params {string} string
 * @return {object}
 */
exports.generateFilter = function(string) {
    var subStrings = getSearchSubstrings(string);
    return {
        $and: subStrings.map(substr => {
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
            type: searchTypeEnum.SCHOOL_TYPE
        }
    }));
    var values = [];
    values.push(value);
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypeEnum.SCHOOL_TYPE,
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
