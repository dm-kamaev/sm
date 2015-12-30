var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var searchTypes = require.main.require('./api/modules/school/enums/searchType');
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
            type: searchTypes.SCHOOL_TYPE
        }
    }));
    var values = [];
    values.push(value);
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypes.SCHOOL_TYPE,
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
