'use strict';

const await = require('asyncawait/await');

const lodash = require('lodash');

const squel = require('squel');

const converter = require('../../core/converter');

const BaseSchool = require('../../core/tables/BaseSchool');

var models = require('../../../../../app/components/models').all;

var services = require('../../../../../app/components/services').all;

var SCHOOL_COLUMNS = [ 
    'full_name',
    'name',
    'links',
    'specialized_classes',
    'description',
    'features',
    'extended_day_cost',
    'dress_code',
    'school_type',
    'boarding',
    'phones',
];

var ADDRESS_COLUMNS = [
    'area',
    'address',
    'department',
    'district',
    'educational_grades',
];

class School extends BaseSchool {
    update() {
        this.concatColumnsData()
        this.loadSchool();
        if (this.hasModel()) {
            //this.updateSchool();
            this.updateAddresses();
        }
    }

    loadSchool() {
        var schoolName = '';
        if (this.columns['old_name']) {
            schoolName = this.columns['old_name'];
        } else {
            schoolName = this.columns['name'];
        }
        var school = await(models.School.findOne({
            where: {
                name: schoolName,
            },
            include: {
                model: models.Address,
                as: 'addresses',
                include: [{
                    model: models.Department,
                    as: 'departments',
                }],
                include: [{
                    model: models.Area,
                    as: 'area',
                }],
            }
        }));
        this.model = school;
    }

    concatColumnsData() {
        var columnsNames = Object
            .keys(this.columns)
            .filter(name => name);
        columnsNames.forEach(columnName => {
            var data = [];
            this.columns[columnName].forEach(item => {
                data.push(item.data);
            });
            this.columns[columnName] = data[0];
        });
    }

    hasModel() {
        return (this.model && true);
    }

    updateSchool() {
        var queryParams = {};
        SCHOOL_COLUMNS.forEach(
            column => {
                var parsedData = this.columns[column];
                if (parsedData) {
                    queryParams[column] = parsedData;
                }
            }
        );
        await(this.model.update(queryParams));
    }

    updateAddresses() {
        var schoolId = this.model.id;
        console.log(schoolId);
        var addresses = this.collectAddresses();
        var addressesReferences = lodash.groupBy(addresses, 'address');
        addresses = addresses.map(item => item.address);
        console.log(addressesReferences);
        addresses.forEach(address => {
            var findedAddress =
                this.findAddressByName(address);
            console.log(findedAddress === null);
            if (findedAddress) {
                
            } else {
                this.createAddress(schoolId, address);
            };
        });
    }

    findAddressByName(name) {
        var modelAddresses = this.model.addresses
            .map(address => address.name);
        var finded = null;
        var index = modelAddresses.indexOf(name);
        if (index !== -1) {
            finded = this.model.addresses[index];
        }
        return finded;
    }

    createAddress(schoolId, address) {
        var createdAddress = await(services.address.addAddress(
            schoolId, {
                name: address
            }
        ));
        return createdAddress;
    }

    collectAddresses() {
        var addresses = [];
        var source = this.columns.address;
        if (source) {
            addresses = source.map((_, index) => {
                return this.getAddress(index);
            });
        }
        return addresses;
    }

    getAddress(index) {
        var result = {};
        var address = this.columns.address[index];
        address = address.split('-')
            .map(adr => adr.trim())
            .filter(adr => adr);
        if (address.length === 1) {
            result.address = address[0];
            result.department = '';
        }
        if (address.length === 2) {
            result.address = address[1];
            result.department = address[0];
        }
        if (this.columns.area) {
            result.area = this.columns.area[index];
        }
        if (this.columns.district) {
            result.district = this.columns.district[index];
        }
        if (this.columns.educational_grades) {
            result.educational_grades = 
                this.columns.educational_grades[index];
        }
        return result;
    }

    addAddressOnly(params) {
        var data = {
            name: params.addressName,
        };
        var address = await(
            services.address.addAddress(
                params.schoolId,
                data
            )
        );
        return address;
    }

    addAddressWithDepartment(params) {
        //console.log(params);
    }
};

module.exports = School;
