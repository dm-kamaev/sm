const async = require('asyncawait/async');
const await = require('asyncawait/await');

const models = require('../../../../app/components/models').all;
const services = require('../../../../app/components/services').all;
const sequelize = require('../../../../app/components/db.js');
const Exception = require('nodules/controller/ServiceException');

const entityType = require('../../entity/enums/entityType');

import {service as addressService} from './address';

import {
    Model as DepartmentModel
} from '../models/department';
import {DepartmentAttribute, DepartmentInstance} from '../types/department';

import {Model as AddressModel} from '../models/address';

import {DepartmentAdmin} from '../types/department';

import {DepartmentNotFound} from './exceptions/DepartmentNotFound';
import {AddressDoesNotExist} from './exceptions/AddressDoesNotExist';

class DepartmentService {
    public readonly name: string = 'department';

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
            const addresses = await services.school.getAddresses(schoolId);
            departmentAddress = addresses.find(address =>
                address.id === address
            );
        } else {
            try {
                departmentAddress = await addressService.addAddress(
                    schoolId,
                    entityType.SCHOOL, {
                        name: address.trim()
                    }
                );
            } catch (error) {
                if (error instanceof Exception) {
                    throw error;
                } else {
                    throw new AddressDoesNotExist(address);
                }
            }
        }

        return DepartmentModel
            .create(data)
            .then(async instance => {
                await departmentAddress.addDepartment(instance);
                addressService.updateIsSchool(departmentAddress.id);
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
    public async update(
        departmentId: number,
        data: DepartmentAttribute,
        addressData?: {
            schoolId: number,
            address: string
        }
    ): Promise<DepartmentAdmin> {
        const department = await this.getById(departmentId);
        const addressId: number = Number(department.addressId);
        if (addressData.address) {
            try {
                const address = await addressService.addAddress(
                    addressData.schoolId,
                    entityType.SCHOOL, {
                        name: addressData.address
                    },
                    departmentId
                );
                data.addressId = address.id;
            } catch (error) {
                if (error.name === 'AddressDepartmentExist') {
                    throw error;
                } else {
                    throw new AddressDoesNotExist(addressData.address);
                }
            }
        }
        const updatedDepartment = await department.update(data);
        addressService.updateIsSchool(data.addressId);
        await this.removeAddressWithOutDepartment_(addressId);
        return updatedDepartment;
    }

    /**
     * Delete department data
     * @param {number} departmentId
     */
    public async delete(departmentId) {
        const instance = await this.getById(departmentId);
        instance.destroy();
        addressService.updateIsSchool(instance.addressId);
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

    public async getById(departmentId: number): Promise<DepartmentAdmin> {
        const department: DepartmentAdmin = await DepartmentModel.findOne({
            where: {
                id: departmentId
            }
        });

        if (!department) {
            throw new DepartmentNotFound(departmentId);
        }

        const address = await addressService.getById(department.addressId);

        department.addressName = address.name;

        return department;
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
        return models.Department.findOne({where: data});
    }

    /**
     * Get address id dy department instance
     * @param {number} departmentId
     * @return {Object} instances of Address model
     */
    public async getAddresses(departmentId) {
        const instance = await this.getOneByData({id: departmentId});
        return instance.getAddress();
    }

    /**
     * Get address array for needed stages
     * @param {Array} addressList Array of addresses instance
     * @return {Array} Array of filter addresses instance
     */
    public addressesFilter(addressList) {
        const addressesWithoutStage = [];
        const addressesWithNeededStages = addressList
            .filter(address => {
                let res = false;
                if (address.departments.length > 0) {
                    address.departments.forEach(department => {
                        if (department.educationalGrades &&
                            department.educationalGrades.some(
                                grade => grade > 0)
                        ) {
                            res = true;
                        }
                    });
                } else {
                    addressesWithoutStage.push(address);
                }
                return res;
            });

        let addresses;
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

        const schoolAddreses = await addressService.getAllByEntity(
            schoolId,
            entityType.SCHOOL
        );

        const departments = await DepartmentModel.findAll({
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


    // remove school's address without department
    private async removeAddressWithOutDepartment_(addressId: number) {
        let countDepartments: number;
        countDepartments = await this.countDepartmentsWithAddress_({
            addressId
        });
        if (!countDepartments) {
            await AddressModel.destroy({
                where: {
                    id: addressId,
                }
            });
        }
    }


    // count departments with select address
    private async countDepartmentsWithAddress_(
        data: any
    ): Promise<number> {
        const res: any = await DepartmentModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('address_id')), 'count']
            ],
            where: data
        });
        return Number(res[0].dataValues.count);
    }
}

export const service = new DepartmentService();
