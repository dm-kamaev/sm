var async = require('asyncawait/async');
var await = require('asyncawait/await');
var xlsx = require('node-xlsx');
var lodash = require('lodash');
var colors = require('colors');
var exclusion = require('./parseConfig').exclusion;
var commander = require('commander');

var modules = require.main.require('./api/modules');
var services =
    require.main.require('./api/modules/school/services');
var models = require.main.require('./app/components/models').all;


var ADDRESS_MSK_INDEX = 0,
    DEPARTMENT_NAME_INDEX = 2,
    ABBRIVIATION_INDEX = 3,
    STAGE_INDEX = 4;


/**
 * main parse method
 */
var departmentParse = async(path => {
    var mskobrData = xlsx.parse(path)[0].data.map(mkobrRowToObject);
    var schools = getSchoolList();

    schools.forEach(function(schoolElem) {
        console.log('PARSE SCHOOL'.magenta, schoolElem.abbreviation);
        var addresses = schoolElem.addresses,
            data = getMskobrData(schoolElem.abbreviation, mskobrData);

        var department = [];
        if (data.length > 0) {
            addresses.forEach(function(addressElem) {
                var addressData =
                        addressesFromDataByAddressBD(addressElem, data);
                addressData.forEach(function(address) {
                    department.push(address);
                });
            });
        }

        var departmentGroupByNameStage = setRelation(department);
        saveData(departmentGroupByNameStage);
    });
});


/**
 * Get department data from file row
 */
var mkobrRowToObject = row => {
    return {
        abbreviation: row[ABBRIVIATION_INDEX],
        address: row[ADDRESS_MSK_INDEX],
        departmentName: convertTitle(row[DEPARTMENT_NAME_INDEX]),
        stage: row[STAGE_INDEX]
    }
};


/**
 * Get schools from BD
 */
var getSchoolList = () => {
    return await(services.schoolServices.get());
};


/**
 * Get data from mskobr file for school
 */
var getMskobrData = (abbreviation, data) => {
    var addressesData = [];
    data.forEach(
        function(elem) {
            if (elem.abbreviation == abbreviation) {
                addressesData.push({
                    abbreviation: abbreviation,
                    address: elem.address,
                    departmentName: elem.departmentName,
                    stage: elem.stage
                });
            }
        }, abbreviation);
    return addressesData;
};


/**
 * Get department data for address
 */
var addressesFromDataByAddressBD = (address, data) => {
    var schoolId = address.school_id
        addressId = address.id,
        addressName = address.name,
        convertedAddress = convertAddress(addressName);

    var addressData = [];

    data.forEach(function(elem) {
        var addressMskobr = elem.address,
            convertedMskobrAddress = convertAddress(addressMskobr);
        if (convertedAddress == convertedMskobrAddress) {
            addressData.push({
                addressId: addressId,
                addressName: address.name,
                departmentName: elem.departmentName,
                stage: elem.stage,
                schoolId: schoolId
            });
        }
    });
    return addressData;
};


/**
 * Group department data by name&stage
 */
var setRelation = department => {
    return lodash.groupBy(department, function(elem) {
        return elem.departmentName + elem.stage;
    });
};


/**
 * Save department data in BD
 */
var saveData = departmentData => {
    for (var department in departmentData) {
        var data = departmentData[department],
            departmentName = data[0].departmentName,
            stage = data[0].stage,
            schoolId = data[0].schoolId;

        var departmentParams = {
                name: departmentName,
                stage: stage
            };

        var departmentAddressId = [];
        data.forEach(function(elem) {
            departmentAddressId.push(elem.addressId);
        });

        var departmentList = await(models.Department.findAll({
                where: departmentParams
            }));

        var isCreated = false;
        if (departmentList.length > 0) {
            departmentList.forEach(function(elem) {
                var addressData = await(
                        services.departmentServices.getAddress(elem));
                var elemSchoolId = addressData.length > 0 ?
                        addressData[0].dataValues.school_id : '';

                if (elemSchoolId === schoolId) {
                    isCreated = true;
                    var hasAddress = false;

                    departmentAddressId.forEach(function(addressId) {
                        if (addressId === addressData[0].dataValues.id) {
                            hasAddress = true;
                        }
                    });
                    if (!hasAddress) {
                        await(services.departmentServices.addAddressId(
                            elem, addressId));
                    }
                }
            });
        }
        if (!isCreated) {
            var departmentInstance = this.saveDepartmentData(deparmentData);

            departmentAddressId.forEach(function(addressId) {
                this.saveDepartmentAddressData({
                    address_id: addressId,
                    department_id: departmentInstance.id
                });
            });
        }

    }
};


/**
 * Save data into department tabel
 */
var saveDepartmentData = params => {
    return await(models.Department.create(params));
};


/**
 * Save data into department_address tabel
 */
var saveDepartmentAddressData = params => {
    return await(models.Department_address.create(params));
};


/**
 * Compare department existence
 */
var hasDepartmentExistence = (params, schoolId) => {
    var isExistence = false;

    var departmentsList = await(models.Department.findAll({where: params}));
    if (departmentsList.length > 0) {
        departmentsList.forEach(function(departmentData) {
            var departmentId = departmentData.dataValues.id;

            var addressId =
                    await(models.Department_address.findOne({
                        where: {department_id: departmentId}
                    })).dataValues.address_id;

            var schoolIdByAddress = await(models.Address.findOne({
                        where: {id: addressId}
                    })).dataValues.school_id;

            if (schoolIdByAddress == schoolId) {
                isExistence = true;
            }
        });
    }
    return isExistence;
};


/**
 * Address converter
 */
var convertAddress =  address => {
    if (address !== undefined) {
        var updateAddress = address.toUpperCase();

        updateAddress = updateAddress.replace(
            /Ё/ig, 'Е');
        updateAddress = updateAddress.replace(
            /[0-9]{6}|[0-9]{5}/ig, ' ');
        updateAddress = updateAddress.replace(
            /ГОРОД|Г\.| Г |^Г /ig, ' ');
        updateAddress = updateAddress.replace(
            /РОССИЯ/ig, ' ');
        updateAddress = updateAddress.replace(
            /МОСКВА/ig, ' ');
        updateAddress = updateAddress.replace(
            /НАБЕРЕЖНАЯ,*| НАБ\.| НАБ(?=[0-9]|,| )|^НАБ\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /БУЛЬВАР,*| БУЛЬВ\.| БУЛЬВ(?=[0-9]|,| )| Б-Р(?=[0-9]|,| )|^БУЛЬВ\.*|^Б-Р /ig, ' ');
        updateAddress = updateAddress.replace(
            /ШОССЕ,*|Ш\.| Ш(?=[0-9]|,| )|^Ш\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /ПЕРЕУЛОК,*| ПЕР\.| ПЕР(?=[0-9]|,| )|^ПЕР\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /-АЯ|-Я|-ОЙ|-Й|-ТИ|-*ЛЕТИЯ |-*ЛЕТ /ig, ' ');
        updateAddress = updateAddress.replace(
            /УЛИЦА,*|УЛ\.| УЛ(?=[0-9]|,| )|^УЛ\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            /ПРОЕЗД,*| ПР-Д(?=[0-9]|,| )|^ПР-Д /ig, ' ');
        updateAddress = updateAddress.replace(
            /ПР*ОСПЕКТ,*| ПРОСП\.| ПРОСП(?=[0-9]|,| )|^ПРОСП\.* | ПР-Т(?=[0-9]|,| )|^ПР-Т| ПР\.| ПР(?=[0-9]|,| )|^ПР\.* /ig, ' ');
        updateAddress = updateAddress.replace(
            / ДОМ(?=[0-9]|,| )|Д\.| Д(?=[0-9]| )/ig, ' ');
        updateAddress = updateAddress.replace(
            / ВЛАДЕНИЕ,*/ig, ' ');
        updateAddress = updateAddress.replace(
            / ДОМОВЛАДЕНИЕ,*/ig, ' ');
        updateAddress = updateAddress.replace(
            / КОРПУС|КОРП\.| КОРП(?=[0-9]| )|КОР\.| КОР(?=[0-9]| )|К\.| К |К(?=[0-9])/ig, '-');
        updateAddress = updateAddress.replace(
            / СТРОЕНИЕ|СТР\.| СТР(?=[0-9]| )|С\.|С(?=[0-9])/ig, '-');
        updateAddress = updateAddress.replace(
            /;*/ig, '');
        updateAddress = updateAddress.replace(
            /\.*/ig, '');
        updateAddress = updateAddress.replace(
            /,*/ig, '');
        updateAddress = updateAddress.replace(
            / */ig, '');
        updateAddress = updateAddress.replace(
            /\(№[0-9]{4}-[0-9]\)/ig, '');
        updateAddress = updateAddress.replace(
            /\+7\([0-9]{3}\)[0-9]{7}/ig, '');


        return updateAddress;
    }
}


/**
 * Stage title converter
 */
function convertTitle(title) {
    if (title !== undefined && title !== '') {
        var updateTitle = title.replace(/^ +/ig, '');

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

        updateTitle = updateTitle[0].toUpperCase() + updateTitle.slice(1);
    }
    return updateTitle;
}


/**
 * Settings for accessing this script using cli
 */
commander
    .command('department-parse <path>')
    .description('Parses an .xlsx file from a given path')
    .action(file => departmentParse(file));

exports.Command;
