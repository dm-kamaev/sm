var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');  

exports.name = 'search';

exports.getSchoolRecords = async (function(id) {
    return await (models.Search.findAll({
        where: {
            schoolId: id
        }
    }));
});


exports.addGia = async(function(schoolId, values) {
    await (models.Search.create({
        schoolId: schoolId,
        type: 'gia',
        values: values
    }))
})

