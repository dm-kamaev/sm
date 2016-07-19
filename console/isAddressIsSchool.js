'use strict';

var commander = require('commander');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize = require.main.require('./app/components/db');
var lodash = require('lodash');

class IsAddressIsSchool {

    /**
     * Main method
     * @public
     */
    start() {
        sequelize.options.logging = false;
        var addresses = await(models.Address.findAll({
            include: [{
                model: models.Department,
                as: 'departments'
            }]
        }));
        var updatedAddresses = this.processAddresses_(addresses);
        this.updatedAddresses_(updatedAddresses);
        console.log('Addresses are updated');
    }

    /**
     * @private
     * @param {array<object>} addresses
     */
    updatedAddresses_(addresses) {
        addresses.forEach((address, i) => {
            if (i % 100 == 0) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write('Processing addresses: ' +
                    (i / addresses.length * 100).toFixed(1) + '%');
            }

            await(services.address.update(address.id, {
                isSchool: address.isSchool
            }));
        });

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write('Processing addresses: 100%\n');
    }

    /**
     * @private
     * @param {array<object>} addresses
     * @return {array<object>}
     */
    processAddresses_(addresses) {
        return addresses.map(address => {
            return {
                id: address.id,
                isSchool: this.isSchool_(address.departments)
            };
        });
    }

    /**
     * @private
     * @param {array<object>} departments
     * @return {bool}
     */
    isSchool_(departments) {
        return departments.length ? this.checkDepartments_(departments) : true;
    }

    /**
     * @private
     * @param {array<object>} departments
     * @return {bool}
     */
    checkDepartments_(departments) {
        return lodash.any(departments, department =>
            !lodash.any(department.educationalGrades, (grade) => grade === 0)
        );
    }
}

var start = async(() => {
    var isAddressIsSchool = new IsAddressIsSchool();

    await(isAddressIsSchool.start());
});

// Settings for accessing this script using cli
commander
    .command('isAddressIsSchool')
    .description('Adds isSchool to address table')
    .action(() => start());
exports.Command;
