var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var enums = require('../enums');
exports.name = 'department';

exports.getAll = () => {
    return await(models.Department.findAll());
};


exports.getAllByParams = (params) => {
    return await(models.Department.findAll({where: params}));
};


/**
 * Get address id dy department instance
 */
exports.getAddress = (departmentInstance) => {
    return await(departmentInstance.getAddress());
};


/**
 * Get address array for certain stages
 */
exports.getAdressesHasStage = (addressList) => {
    return addressList
        .filter(address => {
            var res = true;
            if (address.departments.length > 0) {
                res = false;
                address.departments.forEach(department => {
                    if (department.stage !== enums.departmentStage.PRESCHOOL) {
                        res = true;
                    }
                });
            }
            return res;
        });
};


/**
 * Add address id dy department instance
 */
exports.addAddress = (departmentInstance, addressId) => {
    return await(departmentInstance.addAddress({address_id: addressId}));
};


/**
 * Add list of address id dy department instancefrom
 */
exports.addAddressList = (departmentId, addressIdList) => {
    addressIdList.forEach(function(addressId) {
        var params = {
                address_id: addressId,
                department_id: departmentId
            };
        await(models.Department_address.create(params));
    });
};


/**
 * Add new department
 */
exports.addDepartment = (params) => {
    return await(models.Department.create(params));
};
