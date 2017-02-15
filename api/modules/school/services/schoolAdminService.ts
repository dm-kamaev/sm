'use strict';

// author: dm-kamaev
// service admin for school

const sequelize = require('../../../../app/components/db.js');
const models = require('../../../../app/components/models').all;
const CsvConverter =
    require('../../../../console/modules/modelArchiver/CsvConverter');
const schoolType = require('../enums/schoolType.js');

import {Model as SchoolModel} from '../models/school';
import {SchoolInstance} from '../models/school';
import {Model as AddressModel} from '../../geo/models/address';
import {AddressInstance} from '../../geo/models/address';

import {SchoolNotExistType} from './exceptions/SchoolNotExistType';

import {
    SchoolDataForCreate,
    SchoolDataForUpdate,
    SchoolDataForView,
    SchoolAddresses
} from '../interfaces/SchoolAdmin';


class SchoolAdminService {
    public readonly name: string = 'schoolAdminService';

    public async create(
        schoolData: SchoolDataForCreate
    ): Promise<SchoolInstance> {
        CsvConverter.cureQuotes(schoolData);

        const type: string = schoolData.schoolType;
        if (!schoolType.getPropByValue(type)) {
            throw new SchoolNotExistType(type);
        }

        return await models.School.create({
            name: schoolData.name,
            abbreviation: schoolData.abbreviation,
            fullName: schoolData.fullName,
            schoolType: schoolData.schoolType,
            director: schoolData.director,
            phones: schoolData.phones,
            govermentKey: schoolData.govermentKey,
            rankDogm: schoolData.rankDogm,
            description: schoolData.description,
            features: schoolData.features,
            dressCode: schoolData.dressCode,
            extendedDayCost: schoolData.extendedDayCost,
            links: schoolData.links,
        });
    }

    public async update(
        schoolId: number,
        schoolData: SchoolDataForUpdate
    ): Promise<SchoolInstance> {
        CsvConverter.cureQuotes(schoolData);

        const type: string = schoolData.schoolType || '';
        if (type && !schoolType.getPropByValue(type)) {
            throw new SchoolNotExistType(type);
        }

        const res = await models.School.update(schoolData, {
            where: {
                id: schoolId
            },
            returning: true
        });
        return (res) ? res[1][0] : null;
    }


    public async remove(schoolId: number): Promise<SchoolInstance> {
        const res: any = await models.School.destroy({
            where: {
                id: schoolId
            },
            returning: true
        });

        let howRemove: { where: { entityId: number, entityType: string }};
        howRemove = {
            where: {
                entityId: schoolId,
                entityType: 'school'
            },
        };

        await models.Page.destroy(howRemove);
        // remove school from search
        await models.TextSearchData.destroy(howRemove);
        await models.AliasBacklog.destroy(howRemove);

        return res;
    }


    public async getAllSchool(): Promise<SchoolDataForView[]> {
        const schools: any = await models.School.findAll({
            attributes: [
                'id', 'name', 'schoolType', 'rankDogm', 'updated_at'
            ],
            include: {
                attributes: ['id'],
                model: models.CommentGroup,
                as: 'commentGroup',
                include: {
                    model: models.Comment,
                    as: 'comments',
                }
            }
        });

        return this.getSchoolInfo(schools);
    }

    public async getById(id: number): Promise<SchoolInstance> {
        return SchoolModel.findOne({
            where: {
                id
            }
        });
    }


    public getSchoolTypes(): Array<String> {
        return schoolType.toArray();
    }


    private async getSchoolInfo(schools): Promise<SchoolDataForView[]> {
        const schoolIds: number[] = schools.map(school => school.id);
        const addresses: any = await models.Address.findAll({
            attributes: ['entityId', 'area_id'],
            where: {
                entityId: {
                    $in: schoolIds
                },
                entityType: 'school'
            },
            include: {
                attributes: ['name', 'districtId'],
                model: models.Area,
                as: 'area',
                include: {
                    attributes: ['name'],
                    model: models.District,
                    as: 'district',
                }
            }
        });
        const hashSchoolAddress: SchoolAddresses =
            this.buildHashAddress(addresses);

        const res = schools.map(school => {
            const schoolId: number = school.id;
            let numberComments: number = 0;
            if (school.commentGroup && school.commentGroup.comments) {
                numberComments = school.commentGroup.comments.length;
            }
            let rankDogm: number = 0;
            if (school.rankDogm) {
                rankDogm = Number((school.rankDogm).toFixed(1));
            }
            let areaName: string = '';
            let districtName: string = '';
            let schoolAddress: { areaName: string, districtName: string };
            schoolAddress = hashSchoolAddress[schoolId];
            if (schoolAddress) {
                areaName = schoolAddress.areaName;
                districtName = schoolAddress.districtName;
            }
            return {
                id: schoolId,
                name: school.name,
                schoolType: school.schoolType,
                numberComments,
                rankDogm,
                areaName,
                districtName,
                updatedAt: school.updated_at,
            };
        });
        return res;
    }

    private buildHashAddress(addresses): SchoolAddresses {
        const hashSchoolAddress: SchoolAddresses = {};
        addresses.forEach(address => {
            const area = address.area, district = area.district;
            let areaName: string = '';
            let districtName: string = '';
            if (area && area.district) {
                areaName = area.name;
                districtName = area.district.name;
            }
            hashSchoolAddress[address.entityId] = {
                areaName,
                districtName
            };
        });
        return hashSchoolAddress;
    }
};

export const service = new SchoolAdminService();
