var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require('../../../../app/components/models').all;
var services = require('../../../../app/components/services').all;
exports.name = 'department';


/**
 * Add new department
 * @param {number} schoolId
 * @param {number} addressId
 * @param {{
 *     educationalGrades: string,
 *     name: string
 * }} data
 * @return {Object} instance of Department model
 */
exports.addDepartment = function(schoolId, addressId, data) {
    var addresses = await(services.school.getAddresses(schoolId));
    var address = addresses.find(address => {
        var result = false;
        if (address.id === addressId) {
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
 * @param {number} departmentId
 * @param {{
 *     educationalGrades?: string,
 *     name?: string
 * }} data
 * @return {Object} instance of Department model
 */
exports.update = async(function(departmentId, data) {
    var instance = exports.getById(departmentId);
    return await(instance.update(data));
});


/**
 * Delete department data
 * @param {number} departmentId
 */
exports.delete = async(function(departmentId) {
    var instance = await(exports.getById(departmentId));
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
 *     educationalGrades: ?string,
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
 *     educationalGrades: ?string,
 *     name: ?string
 * }} data
 * @return {Object} instance of Department model
 */
exports.getOneByData = function(data) {
    return await(models.Department.findOne({where: data}));
};


/**
 * Get one data from table by data
 * @param {number} departmentId
 * @return {Object} instance of Department model
 */
exports.getById = function(departmentId) {
    return await(models.Department.findOne({
        where: {id: departmentId}
    }));
};


/**
 * Get address id dy department instance
 * @param {number} departmentId
 * @return {Object} instances of Address model
 */
exports.getAddresses = function(departmentId) {
    var instance = exports.getOneBydata({id: departmentId});
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
                    if (department.educationalGrades &&
                        department.educationalGrades.some(grade => grade > 0)) {
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
            addressId: addressId,
            departmentId: departmentId
        };
        await(models.Department_address.create(params));
    });
};
