var async = require('asyncawait/async');
var await = require('asyncawait/await');
var xlsx = require('node-xlsx');
var colors = require('colors');
var commander = require('commander');
var models = require.main.require('./app/components/models').all;


var ADDRESS_MSK_INDEX = 0,
    ADDRESS_CONVERTED = 1,
    DEPARTMENT_NAME_INDEX = 2,
    ABBREVIATION_INDEX = 3,
    COMPARE_INDEX = 5,
    STAGE_INDEX = 4;


/**
 * @param {string} adrDB
 * @param {string} adrExcel
 * @param {string} adrExcelConverted
 * @return {bool}
 */
var compareAddresses = function(adrDB, adrExcel, adrExcelConverted) {
    if (adrDB == adrExcel) {
        return true;
    }
    if (convertAddress(adrDB) == adrExcelConverted) {
        return true;
    }
    return false;
};


/**
 * @param {object} address - adress instance
 * @param {array<object>} records - all the excel records
 */
var processAdress = async(function(address, records) {
    var matches = records.filter(
        record =>
            compareAddresses(
                address.name,
                record.address,
                record.convertedAddress
            )
    );
    if (!matches.length) {
        console.log(colors.red(address.name));
    } else {
        await(updateDB(address, matches));
    }
});

/**
 * @param {object} address - adress instance
 * @param {array<object>} matches - excel matches
 */
var updateDB = async(function(address, matches) {
    await(models.Department.destroy({
        where: {
            addressId: address.id
        }
    }));
    await(matches.forEach(match => {
        models.Department.create({
            name: match.departmentName,
            stage: match.stage,
            addressId: address.id
        });
    }));
});


/**
 * main parse method
 */
var departmentParse = async(function(path) {
    var mskobrData = xlsx.parse(path)[0].data
        .map(mkobrRowToObject)
        .map(record => {
            record.address = record.address.replace(';', '');
            return record;
        });
    var addresses = await(models.Address.findAll());
    await(addresses.forEach(
        address => processAdress(address, mskobrData)
    ));
});


/**
 * Get department data from file row
 * @param {Array} row
 * @return {Object}
 */
var mkobrRowToObject = row => {
    return {
        abbreviation: row[ABBREVIATION_INDEX],
        address: row[ADDRESS_MSK_INDEX],
        convertedAddress: row[ADDRESS_CONVERTED],
        departmentName: convertTitle(row[DEPARTMENT_NAME_INDEX]),
        stage: row[STAGE_INDEX],
        compare: row[COMPARE_INDEX]
    };
};


/**
 * Address converter
 * @param {string} address
 * @return {string}
 */
var convertAddress = function(address) {
    if (address !== undefined) {
        /* eslint-disable no-useless-escape */
        var updateAddress = address.toUpperCase()
            .replace(/Ё/ig, 'Е')
            .replace(/[0-9]{6}|[0-9]{5}/ig, ' ')
            .replace(/ГОРОД|Г\.| Г |^Г /ig, ' ')
            .replace(/РОССИЯ/ig, ' ')
            .replace(/МОСКВА/ig, ' ')
            .replace(/НАБЕРЕЖНАЯ,*| НАБ\.| НАБ(?=[0-9]|,| )|^НАБ\.* /ig, ' ')
            .replace(new RegExp('БУЛЬВАР,*| БУЛЬВ\.| БУЛЬВ(?=[0-9]|,| )| Б-Р(' +
                '?=[0-9]|,| )|^БУЛЬВ\.*|^Б-Р ', 'ig'), ' ')
            .replace(/ШОССЕ,*|Ш\.| Ш(?=[0-9]|,| )|^Ш\.* /ig, ' ')
            .replace(/ПЕРЕУЛОК,*| ПЕР\.| ПЕР(?=[0-9]|,| )|^ПЕР\.* /ig, ' ')
            .replace(/-АЯ|-Я|-ОЙ|-Й|-ТИ|-*ЛЕТИЯ |-*ЛЕТ /ig, ' ')
            .replace(/УЛИЦА,*|УЛ\.| УЛ(?=[0-9]|,| )|^УЛ\.* /ig, ' ')
            .replace(/ПРОЕЗД,*| ПР-Д(?=[0-9]|,| )|^ПР-Д /ig, ' ')
            .replace(
                new RegExp(
                    'ПР*ОСПЕКТ,*| ПРОСП\.| ПРОСП(?=[0-9]|,| )|^ПРОСП\.* | ПР' +
                        '-Т(?=[0-9]|,| )|^ПР-Т| ПР\.| ПР(?=[0-9]|,| )|^ПР\.* ',
                    'ig'
                    ),
                ' '
            )
            .replace(/ ДОМ(?=[0-9]|,| )|Д\.| Д(?=[0-9]| )/ig, ' ')
            .replace(/ ВЛАДЕНИЕ,*/ig, ' ')
            .replace(/ ДОМОВЛАДЕНИЕ,*/ig, ' ')
            .replace(
                new RegExp(' КОРПУС|КОРП\.| КОРП(?=[0-9]| )|КОР\.| КОР(?=[0' +
                    '-9]| )|К\.| К |К(?=[0-9])', 'ig'),
                '-'
            )
            .replace(/ СТРОЕНИЕ|СТР\.| СТР(?=[0-9]| )|С\.|С(?=[0-9])/ig, '-')
            .replace(/;*/ig, '')
            .replace(/\.*/ig, '')
            .replace(/,*/ig, '')
            .replace(/ */ig, '')
            .replace(/\(№[0-9]{4}-[0-9]\)/ig, '')
            .replace(/\+7\([0-9]{3}\)[0-9]{7}/ig, '');
        /* eslint-enable no-useless-escape */
        return updateAddress;
    }
};


/**
 * Stage title converter
 * @param {string} title
 * @return {string}
 */
function convertTitle(title) {
    var updateTitle;
    if (title !== undefined && title !== '') {
        updateTitle = title.replace(/^ +/ig, '');

        updateTitle = updateTitle.toLowerCase();

        updateTitle = updateTitle.replace(
            /^шо /ig, 'ШО ');
        updateTitle = updateTitle.replace(
            / шо /ig, ' ШО ');
        updateTitle = updateTitle.replace(
            /^до /ig, 'ДО ');
        updateTitle = updateTitle.replace(
            / до /ig, ' ДО ');
        updateTitle = updateTitle.replace(
            /^сп /ig, 'СП ');
        updateTitle = updateTitle.replace(
            / сп /ig, ' СП ');
        updateTitle = updateTitle.replace(
            /^гбоу /ig, 'ГБОУ ');
        updateTitle = updateTitle.replace(
            / гбоу /ig, ' ГБОУ ');
        updateTitle = updateTitle.replace(
            /^сош /ig, 'СОШ ');
        updateTitle = updateTitle.replace(
            / сош /ig, ' СОШ ');
        updateTitle = updateTitle.replace(
            /^скош /ig, 'СКОШ ');
        updateTitle = updateTitle.replace(
            / скош /ig, ' СКОШ ');
        updateTitle = updateTitle.replace(
            /";/ig, '"');

        updateTitle = updateTitle[0].toUpperCase() + updateTitle.slice(1);
    }
    return updateTitle;
}

/**
 * Settings for accessing this script using cli
 */
commander
    .command('department <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => departmentParse(file));

exports.Command;
