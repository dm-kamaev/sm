var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');  
var colors = require('colors');
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
 */
var getSearchSubstrings = function (string) {
    return string.toLowerCase()
        .trim()
        .replace(/[^\wа-яА-Я\s]/g,'') //remove everything except letters, numbers and spaces
        .replace(/школа/,'')
        .trim()
        .split(' ');
};



var generateFilter = function(string){
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
 * @public
 */
exports.advancedSearch = async ((searchString) => {
    searchString = searchString.toLowerCase();
    var filter = generateFilter(searchString);

    var yandexRequest = services.yapi.request(searchString);

    var schoolRequest = models.School.findAll({
        where: {
            $or: [{
                name: filter,
                fullName: filter  
            }]
        }
    });

    var addressRequest = models.Address.findAll({
        where: {
            name: filter
        }
    });

    var metroRequest = models.Metro.findAll({
        where: {
            name: filter 
        }
    });
    
    var results = await (yandexRequest,
                        schoolRequest,
                        addressRequest,
                        metroRequest);

    return {
        geo: results[0],
        schools: results[1],
        address: results[2],
        metro: results[3]
    };
});

/**
 * @param {int} school_id
 * @param {array<int>} values Subjects IDs
 */
exports.addGia = async(function(schoolId, values) {
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypes.GIA,
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
            type: searchTypes.SCHOOL_TYPE,
        }
    })) 
    var values = [];
    values.push(value);
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypes.SCHOOL_TYPE,
        values: values
    }));
});

/**
 * @param {int} school_id
 * @param {array<int>} values Subjects IDs
 */
exports.addOlimp = async(function(schoolId, values) {
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypes.OLIMPIAD,
        values: values
    }));
});
