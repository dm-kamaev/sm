const async = require('asyncawait/async');
const await = require('asyncawait/await');
const xlsx = require('node-xlsx');
const commander = require('commander');
const models = require.main.require('./app/components/models').all;

const ID_INDEX = 0,
    NAME_INDEX = 1,
    FULL_NAME_INDEX = 2;

/**
 * main parse method
 */
var start = async(function(path) {
    var data = xlsx.parse(path)[0].data
        .map(rowToObject);
    await(data.forEach(record => {
        models.School.update(
            record, 
            {where: {id: record.id}}
        );
    }));
});


/**
 * Get department data from file row
 */
var rowToObject = row => {
    return {
        id: row[ID_INDEX],
        name: row[NAME_INDEX],
        fullName: row[FULL_NAME_INDEX]
    };
};



/**
 * Settings for accessing this script using cli
 */
commander
    .command('updateSchoolNames <path>')
    .description('Update names from editor-names.xlsx')
    .action(file => start(file));

exports.Command;
