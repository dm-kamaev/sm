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
    }
};


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
 * @public
 */
exports.searchSchool = async (params => {
    var searchDataCount = 0,
        searchParams = params.searchParams,
        includeParams = {
           searchData: {
               where: {
                   $or: []
               }
           }   
        },
        whereParams = {};

    if (searchParams.name) {
        var nameFilter = generateFilter(searchParams.name);
        whereParams.$or = [
        {
            name: nameFilter,
            fullName: nameFilter
        }];
    }
    if (searchParams.classes && searchParams.classes.length) {
        whereParams.educationInterval = {
            $contains: searchParams.classes
        };
    }

    if (searchParams.schoolType && searchParams.schoolType.length) {
        whereParams.schoolType = {
            $or:[]
        };
        searchParams.schoolType.forEach((item) => {
            whereParams.schoolType.$or.push(item);
        });
    }

    if (searchParams.gia) {
        searchDataCount++;
        includeParams.searchData.where.$or.push({
            $and: {
                type: searchTypes.GIA,
                values: {
                    $contains: searchParams.gia
                }
            }
        });
    }

    if (searchParams.ege) {
        searchDataCount++;
        includeParams.searchData.where.$or.push({
            $and: {
                type: searchTypes.EGE,
                values: {
                    $contains: searchParams.ege
                }
            }
        });
    }

    if (searchParams.olimp) {
        searchDataCount++;
        includeParams.searchData.where.$or.push({
            $and: {
                type: searchTypes.OLIMP,
                values: {
                    $contains: searchParams.olimp
                }
            }
        });
    }


    var params = {
        where: whereParams,
        include:  sequelizeInclude(includeParams, true)
    };
    if (searchDataCount){
        params.group = '"School"."id"';
        params.having = ['COUNT(?) = ?', '', searchDataCount];
    }

    var results = await (models.School.findAll(params));
    results = results.map(item => {
        return {
            id: item.id,
            name: item.name,
            description: '',
            score: [1, 2, 3, 4],
            totalScore: 2.5
        };
    });
    console.log('Found: ', colors.green(results.length));
    return JSON.stringify(results);
});

exports.addGia = async(function(schoolId, values) {
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypes.GIA,
        values: values
    }));
});

exports.addOlimp = async(function(schoolId, values) {
    await (models.SearchData.create({
        schoolId: schoolId,
        type: searchTypes.OLIMPIAD,
        values: values
    }));
});
