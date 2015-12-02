var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');  
var colors = require('colors');
var enums = require.main.require('./app/components/enums').all;

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
                type: enums.searchTypes.GIA,
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
                type: enums.searchTypes.EGE,
                values: {
                    $contains: searchParams.ege
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
        type: enums.searchTypes.GIA,
        values: values
    }));
});

