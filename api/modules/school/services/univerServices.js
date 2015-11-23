var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

exports.addSchoolResults = async((schoolRes) => {
	await( 
		schoolRes.years.forEach(yearRes => {
			yearRes.universities.forEach((univer) => {
				writeResult(schoolRes.ourId, univer, yearRes.year);
			}); 
		})
	);
}); 


/**
 * If there is record for this school+univer+year updates it
 * else creates it
 */
var writeResult = async((schoolId, univer, year) => {
	var record = await (models.SchoolUniversity.findOne({
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
	}
	else {
		var univerMiodel = await(getUniver(univer));	
		await(models.SchoolUniversity.create({
			schoolId: schoolId,
			univerId: univer.vkId,
			pplCount: univer.count,
			year: year
		}));
	}
});

var getUniver = async ((univ) => {
	var uni = await(models.University.findOrCreate({
		where: {
			id: univ.vkId
		},
		defaults: {
			name: univ.name
		}
	})); 
	return uni;	
});


