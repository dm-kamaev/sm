const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;
const services = require('../../../../app/components/services').all;

const entityType = require('../../entity/enums/entityType');

import addressService from './address';
import {
    DepartmentInstance,
    DepartmentAttribute
} from '../models/department';
import DepartmentModel from '../models/department';
import {AddressInstance} from '../models/address';
import {DepartmentAdmin} from '../interfaces/DepartmentAdmin';

import DepartmentNotFound from './exceptions/DepartmentNotFound';
import AddressDoesNotExist from './exceptions/AddressDoesNotExist';

class DepartmentService {
    readonly name: string = 'department';

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
    public async addDepartment(
        schoolId: number,
        address: number | string,
        data: DepartmentAttribute
    ): Promise<DepartmentInstance> {
        await services.school.checkExist(schoolId);
        let departmentAddress;
        if (typeof address === 'number') {
            let addresses = await services.school.getAddresses(schoolId);
            departmentAddress = addresses.find(address =>
                address.id == address
            );
        } else {
            let addressData = {
                name: address
            };
            try {
                departmentAddress = await addressService.addAddress(
                    schoolId,
                    entityType.SCHOOL, {
                        name: address
                    }
                );
            } catch (error) {
                throw new AddressDoesNotExist(address);
            }
        }

        return DepartmentModel
            .create(data)
            .then(async instance => {
                await departmentAddress.addDepartment(instance);
                return instance;
            });
    }

    /**
     * Update department data
     * @param {number} departmentId
     * @param {{
     *     educationalGrades?: string,
     *     name?: string
     * }} data
     * @return {Object} instance of Department model
     */
    public async update(departmentId, data) {
        var instance = await this.getById(departmentId);
        return await instance.update(data);
    }

    /**
     * Delete department data
     * @param {number} departmentId
     */
    public async delete(departmentId) {
        var instance = await this.getById(departmentId);
        instance.destroy();
    }

    /**
     * Get all data from table
     * @return {Object} instances of Department model
     */
    public async getAll() {
        return await models.Department.findAll();
    }

    /**
     * Get all data from table by data
     * @param {{
     *     id: ?number,
     *     educationalGrades: ?string,
     *     name: ?string
     * }} data
     * @return {Object} instances of Department model
     */
    public async getAllByData(data) {
        return await models.Department.findAll({where: data});
    }

    /**
     * Get one data from table by data
     * @param {{
     *     educationalGrades: ?string,
     *     name: ?string
     * }} data
     * @return {Object} instance of Department model
     */
    public async getOneByData(data) {
        return await models.Department.findOne({where: data});
    }

    public async getById(departmentId: number): Promise<DepartmentAdmin> {
        let department: DepartmentAdmin = await DepartmentModel.findOne({
            where: {
                id: departmentId
            }
        });

        if (!department) {
            throw new DepartmentNotFound(departmentId);
        }

        let address = await addressService.getById(department.addressId);

        department.addressName = address.name;

        return department;
    }

    /**
     * Get address id dy department instance
     * @param {number} departmentId
     * @return {Object} instances of Address model
     */
    public async getAddresses(departmentId) {
        var instance = exports.getOneBydata({id: departmentId});
        return await instance.getAddress();
    }

    /**
     * Get address array for needed stages
     * @param {Array} addressList Array of addresses instance
     * @return {Array} Array of filter addresses instance
     */
    public addressesFilter(addressList) {
        var addressesWithoutStage = [];
        var addressesWithNeededStages = addressList
            .filter(address => {
                var res = false;
                if (address.departments.length > 0) {
                    address.departments.forEach(department => {
                        if (department.educationalGrades &&
                            department.educationalGrades.some(grade => grade > 0)
                        ) {
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
    }

    public async getBySchoolId(
        schoolId: number
    ): Promise<Array<DepartmentAdmin>> {
        await services.school.checkExist(schoolId);

        let schoolAddreses = await addressService.getAllByEntity(
            schoolId,
            entityType.SCHOOL
        );

        let departments = await DepartmentModel.findAll({
            where: {
                addressId: {
                    $in: schoolAddreses.map(address => address.id)
                }
            },
            raw: true
        });

        return departments.map((department: DepartmentAdmin) => {
            department.addressName = schoolAddreses
                .find(address => address.id === department.addressId)
                .name;
            return department;
        });
    }
}

export default new DepartmentService();
