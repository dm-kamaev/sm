var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
var departmentStage = require('../enums/departmentStage');
exports.name = 'department';


/**
 * Add new department
 * @param {number} school_id
 * @param {number} address_id
 * @param {{
 *     stage: string,
 *     name: string,
 *     availability: [Array]
 * }} data
 * @return {Object} instance of Department model
 */
exports.addDepartment = function(school_id, address_id, data) {
    var addresses = await(services.school.getAddresses(school_id));
    var address = addresses.find(address => {
        var result = false;
        if (address.id === address_id) {
            result = true;
        }
        return result;
    });

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
 *     name?: string,
 *     availability: [Array]
 * }} data
 * @return {Object} instance of Department model
 */
exports.update = async(function(department_id, data) {
    var instance = exports.getById(department_id);
    return await(instance.update(data));
});


/**
 * Delete department data
 * @param {number} department_id
 */
exports.delete = async(function(department_id) {
    var instance = await(exports.getById(department_id));
    instance.destroy();
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
 *     id: ?number,
 *     stage: ?string,
 *     name: ?string
 * }} data
 * @return {Object} instances of Department model
 */
exports.getAllByData = function(data) {
    return await(models.Department.findAll({where: data}));
};


/**
 * Get one data from table by data
 * @param {{
 *     stage: ?string,
 *     name: ?string
 * }} data
 * @return {Object} instance of Department model
 */
exports.getOneByData = function(data) {
    return await(models.Department.findOne({where: data}));
};


/**
 * Get one data from table by data
 * @param {number} department_id
 * @return {Object} instance of Department model
 */
exports.getById = function(department_id) {
    return await(models.Department.findOne({
        where: {id: department_id}
    }));
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
                    if (department.stage ===
                            departmentStage.fields.ELEMENTARY ||
                        department.stage ===
                            departmentStage.fields.MIDDLE ||
                        department.stage ===
                            departmentStage.fields.HIGH ||
                        department.stage ===
                            departmentStage.fields.MIDDLE_HIDE) {
                        res = true;
                    }
                });
            } else {
                addressesWithoutStage.push(address);
            }
            return res;
        });

    var addresses;
    if (addressesWithNeededStages.length > 0) {
        addresses = addressesWithNeededStages;
    } else {
        addresses = addressesWithoutStage;
    }

    return addresses;
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
