var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var enums = require('../enums');
exports.name = 'department';


/**
 * Add new department
 * @param {Object} address instance
 * @param {Object} params
 */
exports.addDepartment = (address, params) => {
    // TODO checked relate with address
    return await(models.Department.create(params));
    //     .then(instance => {
    //             return address.addDepartment(instance);
    //         }));
};

exports.addAddress = async((school, params) => {

});


exports.getAll = () => {
    return await(models.Department.findAll());
};


exports.getAllByParams = (params) => {
    return await(models.Department.findAll({where: params}));
};


/**
 * Get address id dy department instance
 */
exports.getAddresses = (departmentInstance) => {
    return await(departmentInstance.getAddress());
};


/**
 * Get address array for needed stages
 */
exports.addressesFilter = (addressList) => {
    var addressesWithoutStage = [];
    var addressesWithNeededStages = addressList
        .filter(address => {
            var res = false;
            if (address.departments.length > 0) {
                address.departments.forEach(department => {
                    if (department.stage !==
                        enums.departmentStage.PRESCHOOL &&
                        department.stage !==
                        enums.departmentStage.SUPPLEMENTARY &&
                        department.stage !==
                        enums.departmentStage.HIGHER_EDUCATION) {
                        res = true;
                    }
                });
            }
            else {
                addressesWithoutStage.push(address);
            }
            return res;
        });

    var addresses;
    if (addressesWithNeededStages.length > 0) {
        addresses = addressesWithNeededStages;
    }
    else {
        addresses = addressesWithoutStage;
    }
    return addresses;
};


/**
 * Add address id dy department instance
 * Used in parse/department.js
 */
// TODO delete this methods (used in console/../department.js)
exports.addAddress = (departmentInstance, addressId) => {
    return await(departmentInstance.addAddress({address_id: addressId}));
};


/**
 * Add list of address id dy department instancefrom
 */
// TODO delete this methods (used in ?)
exports.addAddressList = (departmentId, addressIdList) => {
    addressIdList.forEach(function(addressId) {
        var params = {
                address_id: addressId,
                department_id: departmentId
            };
        await(models.Department_address.create(params));
    });
};
