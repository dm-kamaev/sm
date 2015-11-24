var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;

exports.getAll = async(() => {
    return await(models.Department.findAll());
});


/**
 * Get address id dy department instance
 */
exports.getAddress = (departmentInstance) => {
    try {
        return await(departmentInstance.getAddress());
    }
    catch(e) {
        return e;
    }
};


/**
 * Get address id dy department instance
 */
exports.addAddressId = (departmentInstance, addressId) => {
    try {
        return await(departmentInstance.addAddress({address_id: addressId}));
    }
    catch(e) {
        return e;
    }
};