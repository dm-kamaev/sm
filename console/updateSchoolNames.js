const async = require('asyncawait/async');
const await = require('asyncawait/await');
const xlsx = require('node-xlsx');
const commander = require('commander');
const models = require.main.require('./app/components/models').all;


const ID_INDEX = 0,
    NAME_INDEX = 1,
    FULL_NAME_INDEX = 2,
    GOVERMENT_KEY = 3;


/**
 * Update schools from given path
 * @param {string} path
 */
var start = async(function(path) {
    var data = parseXlsx(path);
    updateSchools(data);
});


/**
 * Parse data from xlsx
 * @param {string} path
 * @return {[Object]}
 */
var parseXlsx = function (path) {
    var parsed = xlsx.parse(path),
        rows = parsed[0].data;

    return rows
        .slice(1)
        .map(rowToObject);
};


/**
 * Update schools from data
 * @param {[Object]} data
 */
var updateSchools = function(data) {
    await(data.map(updateSchool));
};


/**
 * Get department data from file row
 */
var rowToObject = row => {
    return {
        id: row[ID_INDEX],
        name: row[NAME_INDEX],
        fullName: row[FULL_NAME_INDEX],
        govermentKey: row[GOVERMENT_KEY]
    };
};


/**
 * Update school values
 * @param {Object} values
 * @return {Promise}
 */
var updateSchool = function(values) {
    return models.School.update(values, {
        where: {
            govermentKey: values.govermentKey
        }
    });
};


/**
 * Settings for accessing this script using cli
 */
commander
    .command('updateSchoolNames <path>')
    .description('Update names from editor-names.xlsx')
    .action(file => start(file));

exports.Command;
