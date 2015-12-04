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
 * @public
 */
exports.searchSchool = async (params => {
    var searchDataCount = 0;
    var searchParams = params.searchParams,
        includeParams = {
           searchData: {
               where: {
                   $or: []
               }
           }   
        },
    whereParams = {};
    if (searchParams.name) {
        whereParams.$or = [
        {
            name: {$like: '%' + searchParams.name + '%'} 
        }, {
            fullName:{$like: '%' + searchParams.name + '%'} 
        }
        ];
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
