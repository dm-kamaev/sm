'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const lodash = require('lodash');

const squel = require('squel');

const converter = require('../../core/converter');

const BaseSchool = require('../../core/tables/BaseSchool');

var models = require('../../../../../app/components/models').all;

var db = require('../../../../../app/components/db');

var services = require('../../../../../app/components/services').all;

var SCHOOL_COLUMNS = [ 
    'fullName',
    'name',
    'links',
    'specializedClasses',
    'description',
    'features',
    'extendedDayCost',
    'dressCode',
    'schoolType',
    'boarding',
    'phones',
    'director',
];

var ADDRESS_COLUMNS = [
    'area',
    'address',
    'department',
    'district',
    'educationalGrades',
];

class School extends BaseSchool {
    update() {
        this.concatColumnsData();
        this.loadSchool();
        if (this.hasModel()) {
            this.updateSchool();
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
                }, {
                    model: models.Area,
                    as: 'area',
                    include: {
                        model: models.District,
                        as: 'district',
                    }
                }],
            }
        }));
        if(!school) {
            throw new Error(schoolName);
        }
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
        this.model = await(this.model.update(queryParams));
    }

    updateAddresses() {
        var schoolId = this.model.id;
        var addresses = this.collectAddresses();
        var addressesReferences = lodash.groupBy(addresses, 'address');
        addresses = addresses.map(item => item.address);
        addresses.forEach(address => {
            var departments = addressesReferences[address];
            this.updateAddress({
                schoolId: schoolId,
                address: address,
                departments: departments
            });
        });
    }
    
    updateAddress(params) {
        var addressInstance =
            this.findAddressByName(params.address);
        if (!addressInstance) {
            addressInstance =
                await(this.createAddress(params.schoolId, params))
        }
        addressInstance = this.clearAddressDepartments(
            addressInstance,
            params.departments
        );
        if (params.departments && params.departments.length) {
            params.departments.forEach(departmentData => {
                this.updateDepartment(
                    addressInstance,
                    departmentData
                );
            });
        }
    }
    
    clearAddressDepartments(address, departments) {
        var namelessDepsCount = 0;
        address.departments = address.departments || [];
        address.departments = address.departments
            .map(modelDepartment => {
                var department = null;
                var isDepartmentNameless =
                    modelDepartment.name === '';
                if (isDepartmentNameless) {
                    namelessDepsCount += 1;
                }
                var mustDepartmetBeRemoved =
                    isDepartmentNameless && namelessDepsCount > 1;
                if (mustDepartmetBeRemoved) {
                    await(address.removeDepartment(modelDepartment));
                }
                return department;
            }).filter(model => model);
        return address;
    }
    
    updateDepartment(addressInstance, departmentData) {
        var area = addressInstance.area;
        var district = area.district;
        var departmentInstance = this.findAddressDepartment(
            addressInstance,
            departmentData.department
        );
        var data = {
            educational_grades: departmentData.educational_grades,
        };
        if (!departmentInstance) {
            data.name  = departmentData.department;
            departmentInstance = await(
                services.department.addDepartment(
                    addressInstance.schoolId,
                    addressInstance.id,
                    data
                )
            );
        } else {
            departmentInstance =
                await(departmentInstance.update(data));
        }
        return departmentInstance;
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
    
    findAddressDepartment(address, departmentName) {
        var finded = lodash.find(address.dataValues.departments, {
            name: departmentName
        });
        return finded;
    }

    createAddress(schoolId, params) {
        var createdAddress = await(services.address.addAddress(
            schoolId, {
                name: params.address,
            }
        ));
        var departmentData = params.departments[0];
        var area = await(services.area.getByName(departmentData.area));
        var district = await(services.district.getByName(
            departmentData.district
        ));
        area.distsrict = district;
        createdAddress.area = area;
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
        address = address.split(' - ')
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
            result.educationalGrades = 
                this.columns.educationalGrades[index];
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
};

module.exports = School;
