var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var enums = require('../enums');
exports.name = 'department';


/**
 * Add new department
 * @param {number} address_id
 * @param {{
 *     stage!: string,
 *     name!: string
 * }} data
 * @return {Object} instance of Department model
 */
exports.addDepartment = function(address_id, data) {
    var address = await(services.address.getAddress({id: address_id}));
    return await(models.Department.create(data)
        .then(instance => {
                address.addDepartment(instance);
                return instance;
            }));
};


/**
 * Update department data
 * @param {number} department_id
 * @param {{
 *     stage?: string,
 *     name?: string
 * }} data
 * @return {Object} instance of Department model
 */
exports.update = async(function(department_id, data) {
    var instance = exports.getOneBydata({id: department_id});
    return await(instance.update(data));
});


/**
 * Get all data from table
 * @return {Object} instances of Department model
 */
exports.getAll = function() {
    return await(models.Department.findAll());
};


/**
 * Get all data from table by data
 * @param {{
 *     id?: nimber,
 *     stage?: string,
 *     name?: string
 * }} data
 * @return {Object} instances of Department model
 */
exports.getAllBydata = function(data) {
    return await(models.Department.findAll({where: data}));
};


/**
 * Get one data from table by data
 * @param {{
 *     id?: nimber,
 *     stage?: string,
 *     name?: string
 * }} data
 * @return {Object} instance of Department model
 */
exports.getOneBydata = function(data) {
    return await(models.Department.findOne({where: data}));
};


/**
 * Get address id dy department instance
 * @param {number} department_id
 * @return {Object} instances of Address model
 */
exports.getAddresses = function(department_id) {
    var instance = exports.getOneBydata({id: department_id});
    return await(instance.getAddress());
};


/**
 * Get address array for needed stages
 * @param {Array} addressList Array of addresses instance
 * @return {Array} Array of filter addresses instance
 */
exports.addressesFilter = function(addressList) {
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
exports.addAddress = function(departmentInstance, addressId) {
    return await(departmentInstance.addAddress({address_id: addressId}));
};


/**
 * Add list of address id dy department instancefrom
 */
// TODO delete this methods (used in ?)
exports.addAddressList = function(departmentId, addressIdList) {
    addressIdList.forEach(function(addressId) {
        var params = {
                address_id: addressId,
                department_id: departmentId
            };
        await(models.Department_address.create(params));
    });
};
