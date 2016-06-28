var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;

exports.name = 'univer';

exports.addSchoolResults = async(schoolRes => {
    await(schoolRes.years.forEach(yearRes => {
        yearRes.universities.forEach(univer => {
            writeResult(schoolRes.ourId, univer, yearRes.year);
        });
    }));
});

/**
 * If there is record for this school+univer+year updates it
 * else creates it
 */
var writeResult = async((schoolId, univer, year) => {
    var record = await(models.SchoolUniversity.findOne({
        where: {
            schoolId: schoolId,
            univerId: univer.vkId,
            year: year
        }
    }));
    if (record) {
        await(record.update({
            pplCount: univer.count
        }));
    } else {
        await(models.SchoolUniversity.create({
            schoolId: schoolId,
            univerId: univer.vkId,
            pplCount: univer.count,
            year: year
        }));
    }
});
