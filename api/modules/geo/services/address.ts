const async = require('asyncawait/async');
const await = require('asyncawait/await');
const sequelizeInclude = require('../../../components/sequelizeInclude');
const models = require('../../../../app/components/models').all;
const services = require('../../../../app/components/services').all;
const logger = require('../../../../app/components/logger/logger')
    .getLogger('app');

const entityTypes = require('../../entity/enums/entityType');

import {geoTools} from '../../../../console/modules/geoTools/geoTools';
import {AddressInstance} from '../types/address';
import {Model as AddressModel} from '../models/address';

import {AddressIsNotUnique} from './exceptions/AddressIsNotUnique';
import {AddressDepartmentExist} from './exceptions/AddressDepartmentExist';

const SEARCH_RADIUS = 3; // killometrs, search radius for metro


class AddressService {
    public readonly name: string = 'address';

    /**
     * Added new address
     * @param {number} entityId
     * @param {string} entityType
     * @param {{
     *     name: string,
     *     coords?: array
     * }} data
     * @return {Address}
     */
    public async addAddress(
        entityId: number,
        entityType: string,
        data,
        departmentId?: number
    ) {
        const newAddress: string = data.name;
        const addressBD = await services.address.getAddress({
            name: data.name,
            entityType: entityType
        });
        let address;
        if (addressBD) {
            const isEqualId: boolean = entityId === addressBD.entityId;
            // and but not current department
            const isExistDepartment: boolean =
                entityType === entityTypes.SCHOOL ?
                    await this.isExistDepartmentForAddress_(
                        entityId,
                        entityType,
                        newAddress,
                        departmentId
                    ) :
                    false;
            if (isEqualId && isExistDepartment) {
                throw new AddressDepartmentExist(
                    addressBD.entityId,
                    addressBD.entityType,
                    newAddress
                );
            } else if (!isEqualId) {
                throw new AddressIsNotUnique(addressBD.name);
            }
            address = addressBD;
        } else {
            data.entityId = entityId;
            data.entityType = entityType;
            if (!data.coords) {
                const coords: Array<Number> = await services.yapi.getCoords(
                    'Москва, ' + data.name,
                    true
                );
                data.coords = coords;
            }

            if (!data.areaId) {
                const areas = await services.area.create({
                    name: await geoTools.getArea(data.coords)
                        // area name from coords
                });
                data.areaId = areas[0].id;
            }

            if (entityType === entityTypes.SCHOOL) { // school address coords
                data.coords.reverse();               // stored in reversed order
            }                                        // but idk why

            address = await models.Address.create(data);

            const metros = await geoTools.getMetros(data.coords, SEARCH_RADIUS);

            await this.setMetro(address, metros);
            await this.setDistance(address);
        }
        return address;
    }


    /**
     * Update address data
     * @param {number} addressId
     * @param {{
     *     name?: string,
     *     coords?: array,
     *     isSchool?: bool
     * }} data
     */
    public async update(addressId, data) {
        const address = await services.address.getAddress({id: addressId});
        return await address.update(data);
    }

    /**
     * Get all data from table
     * @return {Object} instances of Address model
     */
    public async getAll() {
        return await models.Address.findAll();
    }

    /**
     * Get all data by data
     * @param {number} addressId
     * @return {Object} instances of Address model
     */
    public async getById(addressId: number): Promise<AddressInstance> {
        return AddressModel.findOne({
            where: {
                id: addressId
            }
        });
    }

    public async getAddress(params) {
        const includeParams = {
            departments: true
        };
        return await models.Address.findOne({
            where: params,
            include: sequelizeInclude(includeParams)
        });
    }

    public async getAllWithMetro() {
        return await models.Address.findAll({
            include: [{
                model: models.Metro,
                // through: 'address_metro',
                as: 'metro'
            }]
        });
    }

    /**
     * Get address departments
     * @param  {Object} address instance
     * @return {Array} department instances array
     */
    public async getDepartments(address) {
        return await address.getDepartments();
    }

    /**
     * Returns metro from array<address>/address
     * @param {array<object>|object} address
     * @return {array<string>}
     */
    public getMetro(address) {
        if (Array.isArray(address)) {
            const metro = {};
            address.forEach(adr => {
                adr.metroStations.forEach(m => {
                    metro[m.id] = m.name.replace('метро ', '');
                });
            });
            return Object.keys(metro)
                .map(id => {
                    return metro[id];
                });
        } else {
            return address.metroStations.map(metro => {
                return metro.name.replace('метро ', '');
            });
        }
    }

    public async setMetro(address, metroArr) {
        metroArr.forEach(async metro => {
            const ourMetro = await models.Metro.findOne({
                where: {
                    name: metro.name
                }
            });

            if (ourMetro) {
                await address.addMetroStation(ourMetro);
            } else {
                await address.createMetroStation({
                    name: metro.name,
                    coords: metro.coords
                });
            }
        });
    }

    /**
     * Associates existing are and and address
     * @param {String} area
     * @param {String} address
     */
    public async setArea(area, address) {
        const areaInstance = await models.Area.findOne({
            where: {
                name: area
            }
        });
        const addressInstance = await models.Address.findAll({
            where: {
                name: address
            }
        });

        addressInstance.forEach(item => {
            item.setArea(areaInstance);
        });
    }

    /**
     * @param {number} entityId
     * @param {string} entityType
     * @param {{
     *     isSchool: boolean,
     *     order: boolean - order by distance
     * }} params
     */
    public async getWithDepartmentsWithMetro(
        entityId,
        entityType,
        params
    ) {
        const addressParams = {
            include: [{
                model: models.Department,
                as: 'departments'
            }, {
                model: models.AddressMetro,
                as: 'addressMetroes',
                include: [{
                    model: models.Metro,
                    as: 'metro'
                }]
            }],
            where: {
                entityId: entityId,
                entityType: entityType,
                isSchool: undefined
            },
            order: undefined
        };

        if (params.isSchool) {
            addressParams.where.isSchool = params.isSchool;
        }

        if (params.order) {
            addressParams.order = [[
                {
                    model: models.AddressMetro,
                    as: 'addressMetroes'
                },
                'distance',
                'ASC'
            ]];
        }
        const addresses = await models.Address.findAll(addressParams);
        // filter address without department
        return addresses.filter(address =>
            Boolean(address.departments.length)
        );
    }

    /**
     * @return {Array<Object>}
     */
    public async getAllWithSearchData() {
        return models.Address.findAll({
            attributes: ['id', 'entityId', 'entityType', 'areaId'],
            include: [{
                model: models.AddressSearchData,
                as: 'searchData',
                attributes: ['id', 'type', 'entityId', 'entityType']
            }, {
                model: models.Department,
                as: 'departments',
                attributes: ['educationalGrades']
            }, {
                model: models.AddressMetro,
                as: 'addressMetroes',
                attributes: ['distance', 'metroId']
            }, {
                model: models.Area,
                as: 'area',
                attributes: ['id'],
                include: [{
                    model: models.District,
                    as: 'district',
                    attributes: ['id']
                }]
            }, {
                model: models.CourseDepartment,
                as: 'courseDepartments'
            }],
            order: [[
                {
                    model: models.AddressMetro,
                    as: 'addressMetroes'
                },
                'distance',
                'ASC'
            ]]
        });
    }

    /**
     * setDistance
     * @param  {Object} address
     * {
     *   id: 4631,
     *   name: 'улица Новый Арбат, 24',
     *   entityId: null,
     *   entityType: null,
     *   coords: [ 37.587614, 55.753083 ],
     *   areaId: 84,
     *   updated_at: Wed Dec 07 2016 11:09:03 GMT+0300 (MSK),
     *   created_at: Wed Dec 07 2016 11:09:03 GMT+0300 (MSK),
     *   isSchool: null
     * }
     * @return {Object[]}  [ { id, address_id, metro_id, } ]
     */
    public async setDistance(address) {
        const addressMetros = await models.AddressMetro.findAll({
            where: {
                addressId: address.id,
            }
        });

        return addressMetros.map(async addressMetro => {
            const metroCoords = await services.metro.getCoords(
                addressMetro.metroId
            );
            let distance = geoTools.distanceKm({
                latitude: address.coords[1],
                longitude: address.coords[0],
            }, {
                latitude: metroCoords[0],
                longitude: metroCoords[1],
            });
            // metres
            distance = (distance.toFixed(3) * 1000).toFixed(0);
            return await addressMetro.update({distance});
        });
    }

    public async getAllByEntity(
        entityId: number, entityType: string
    ): Promise<Array<AddressInstance>> {
        return AddressModel.findAll({
            where: {
                entityId: entityId,
                entityType: entityType
            }
        });
    }

    public async updateIsSchool(addressId: number): Promise<void> {
        const address = await AddressModel.findOne({
            where: {id: addressId}
        });
        const addressDepartments = await address.getDepartments();

        const overallEducationalGrades: Array<number> =
            addressDepartments.reduce(
                (previous, current) => previous.concat(
                    current.educationalGrades
                ),
                []
            );

        address.update({
            isSchool: addressDepartments.length ?
                overallEducationalGrades.some(grade => grade !== 0) :
                true
        });
    }


    private async isExistDepartmentForAddress_(
        entityId: number,
        entityType: string,
        newAddress: string,
        departmentId: number,
    ): Promise<boolean> {
        let result: boolean = false;
        const addressForDepartments: AddressInstance[] =
            await AddressModel.findAll({
                attributes: ['id', 'name'],
                where: {
                    entityId,
                    entityType,
                }
            });

        const address: AddressInstance | boolean =
            addressForDepartments.find(address => address.name === newAddress);

        // check is current department or not
        if (address) {
            const department = await models.Department.findOne({
                    where: {
                        addressId: address.id
                    }
                });
            result = !(department.id === departmentId);
        } else {
            result = Boolean(address);
        }
        return result;
    }


}

export const service = new AddressService();
