'use strict';

// author: dm-kamaev
// service admin for school

const sequelize = require('../../../../app/components/db.js');
const models = require('../../../../app/components/models').all;
const CsvConverter =
    require('../../../../console/modules/modelArchiver/CsvConverter');
const schoolType = require('../enums/schoolType.js');

import SchoolModel from '../models/school';
import {SchoolInstance} from '../models/school';
import AddressModel from '../../geo/models/address';
import {AddressInstance} from '../../geo/models/address';

import SchoolNotExistType from './exceptions/SchoolNotExistType';

import {
    SomeSchoolData,
    SomeOptionalSchoolData,
    SomeSchoolInfo
} from '../interfaces/SchoolAdmin';


class SchoolAdminService {
    readonly name: string = 'schoolAdminService';

    public async create(
        schoolData: SomeSchoolData
    ): Promise<SchoolInstance> {
        CsvConverter.cureQuotes(schoolData);

        let type: string = schoolData.schoolType;
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
            totalScore: schoolData.totalScore,
            description: schoolData.description,
            features: schoolData.features,
            dressCode: schoolData.dressCode,
            extendedDayCost: schoolData.extendedDayCost,
            links: schoolData.links,
        });
    }

    public async update(
        schoolId: number,
        schoolData: SomeOptionalSchoolData
    ): Promise<SchoolInstance> {
        CsvConverter.cureQuotes(schoolData);

        let type: string = schoolData.schoolType || '';
        if (type && !schoolType.getPropByValue(type)) {
            throw new SchoolNotExistType(type);
        }

        let res = await models.School.update(schoolData, {
            where: {
                id: schoolId
            },
            returning: true
        });
        return (res) ? res[1][0] : null;
    };


    public async remove(schoolId: number): Promise<SchoolInstance> {
        var res: any = await models.School.destroy({
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


    public async getAllSchool(): Promise<any> {
        let schools: any = await models.School.findAll({
            attributes: [
                'id', 'name', 'schoolType', 'totalScore', 'updated_at'
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

        let schoolsInfo = schools.map(this.getSchoolInfo);
        return Promise.all<SomeSchoolInfo[]>(schoolsInfo);
    };


    private async getSchoolInfo (
        school: any
    ): Promise<SomeSchoolInfo> {
        let numberComments: number = 0;
        if (school.commentGroup && school.commentGroup.comments) {
            numberComments = school.commentGroup.comments.length;
        }

        let address: AddressInstance = await AddressModel.findOne({
            attributes: ['area_id'],
            where: {
                entityId: school.id,
                entityType: 'school'
            },
        });
        let areaName: string = '',
            districtName: string = '';
        if (address) {
            let area: any = await models.Area.findOne({
                attributes: ['name', 'districtId'],
                where: {
                    id: address['area_id']
                },
                include: {
                    attributes: ['name'],
                    model: models.District,
                    as: 'district',
                }
            });
            if (area && area.district) {
                areaName = area.name;
                districtName = area.district.name;
            }
        }
        return {
            id: school.id,
            name: school.name,
            schoolType: school.schoolType,
            numberComments,
            totalScore: Number((school.totalScore).toFixed(1)),
            areaName,
            districtName,
            updatedAt: school.updated_at,
        };
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
};
export default new SchoolAdminService();
