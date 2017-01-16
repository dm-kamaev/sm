'use strict';

// author: dm-kamaev
// service admin for school

const sequelize = require('../../../../app/components/db.js');
const models = require('../../../../app/components/models').all;
const CsvConverter =
    require('../../../../console/modules/modelArchiver/CsvConverter');
const schoolType = require('../enums/schoolType.js');
import SchoolNotExistType from './exceptions/SchoolNotExistType';

let service: any = {
    name: 'schoolAdminService'
};

type someSchoolData = {
    name: string,
    abbreviation: string,
    fullName: string,
    schoolType: string,
    director: string,
    phones: string[],
    govermentKey: number,
    totalScore: number,
    features: string[],
    dressCode: boolean,
    extendedDayCost: string,
    links: string[][],
};

service.create = async function(
    schoolData: someSchoolData): Promise <any> | null {
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
        features: schoolData.features,
        dressCode: schoolData.dressCode,
        extendedDayCost: schoolData.extendedDayCost,
        links: schoolData.links,
    });
};


service.update = async function(
    schoolId: number, schoolData: any): Promise <any> | null {
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


service.remove = async function(schoolId: number): Promise <any> {
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
};


type someSchoolInfo = {
    id: number,
    name: string,
    type: string,
    numberComments: number,
    totalScore: number,
    areaName: string,
    districtName: string,
    updatedAt: string,
};
service.getAllSchool = async function(): Promise <someSchoolInfo[]> {
    let res: any = await models.School.findAll({
        attributes: [
            'id', 'name', 'schoolType', 'totalScore', 'updated_at'
        ],
        include: [{
            attributes: ['id'],
            model: models.CommentGroup,
            as: 'commentGroup',
            include: {
                model: models.Comment,
                as: 'comments',
            }
        },{
            attributes: ['area_id'],
            model: models.Address,
            as: 'addresses',
            where: {
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
        }]
    });

    let schools: someSchoolInfo[] = [];

    schools = res.map(function (school: any): someSchoolInfo {
        let area = school.addresses[0].area || {},
            district = area.district || {};
        let areaName: string = area.name,
            districtName: string = district.name;
        let numberComments: number = 0;

        if (school.commentGroup && school.commentGroup.comments) {
            numberComments = school.commentGroup.comments.length;
        }
        return {
            id: school.id,
            name: school.name,
            type: school.schoolType,
            numberComments,
            totalScore: Number((school.totalScore).toFixed(1)),
            areaName,
            districtName,
            updatedAt: school.updated_at,
        };
    });

    return schools;
};

export default service;