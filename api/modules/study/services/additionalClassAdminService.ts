'use strict';

// author: dm-kamaev
// service additional class admin for school

// TODO : call service, but not model
import {
    Model as AdditionalEducationSphereModel,
    AdditionalEducationSphereInstance
} from '../../school/models/additionalEducationSphere';

import {
    Model as AdditionalEducationModel,
    AdditionalEducationInstance
} from '../../school/models/additionalEducation';

import {SchoolCategoryNameIsShorter} from
    './exceptions/SchoolCategoryNameIsShorter';

import {
    AdditionalClass,
    AdditionalClassEdit,
} from '../intefaces/AdditionalClass';


class AdditionalClassAdminService {
    public readonly name: string = 'additionalClassAdminService';

    public async getList(schoolId: number): Promise<AdditionalClass[]> {
        let spheres: AdditionalEducationSphereInstance[],
            additionalEducations: AdditionalEducationInstance[];
        additionalEducations = await AdditionalEducationModel.findAll({
            attributes: [
                'id', 'name', 'sphereId',
            ],
            where: {
                schoolId,
            }
        });

        const sphereIds: Array<number> =
            additionalEducations.map((education): number => education.sphereId);
        spheres = await AdditionalEducationSphereModel.findAll({
            attributes: [ 'id', 'name' ],
            where: {
                id: {
                   $in: sphereIds
                }
            }
        });
        return this.buildAdditionalClasses_(additionalEducations, spheres);
    }


    public async getById(
        schoolId: number,
        additionalClassId: number
    ): Promise<AdditionalClass | {}> {
        const list: AdditionalClass[] = await this.getList(schoolId);
        let res: AdditionalClass | boolean;
        res = list.find((additionalClass: AdditionalClass): boolean =>
            additionalClass.id === additionalClassId
        );
        return res || {};
    }


    public async create(
        schoolId: number,
        additionClass: {
          categoryId: number,
          name: string
        }
    ): Promise<AdditionalClassEdit> {
        let education: AdditionalEducationInstance;
        education = await AdditionalEducationModel.create({
            schoolId,
            name: additionClass.name,
            sphereId: additionClass.categoryId,
        });
        return {
            id: education.id,
            name: education.name,
            schoolId: education.schoolId,
            categoryId: education.sphereId,
        };
    }


    public async update(
        schoolId: number,
        additionalClassId: number,
        additionalClass: {
          categoryId: number,
          name: string,
        }
    ): Promise<any> {
        let res: AdditionalClassEdit | null = null;
        let education: [number, AdditionalEducationInstance[]];

        education = await AdditionalEducationModel.update({
            name: additionalClass.name,
            sphereId: additionalClass.categoryId,
        }, {
            where: {
                id: additionalClassId
            },
            returning: true
        });

        if (education && education[0]) {
            const edu: AdditionalEducationInstance = education[1][0];
            res = {
                id: edu.id,
                name: edu.name,
                schoolId: edu['school_id'],
                categoryId: edu['sphere_id'],
            };
        }
        return res;
    }


    public async delete(
        schoolId: number,
        additionalClassId: number
    ): Promise<number> {
        return await AdditionalEducationModel.destroy({
            where: {
                id: additionalClassId,
                schoolId,
            }
        });
    }


    public async searchCategory(
        categoryName: string
    ): Promise<any> {
        if (categoryName.length < 2) {
            throw new SchoolCategoryNameIsShorter(categoryName);
        }
        categoryName = this.capitalize_(categoryName);
        return await AdditionalEducationSphereModel.findAll({
            attributes: [ 'id', 'name' ],
               where: {
                   name: {
                       $like: '%' + categoryName + '%'
                   }
               },
               limit: 10,
        });
    }

    private buildAdditionalClasses_(
        additionalEducations: AdditionalEducationInstance[],
        spheres: AdditionalEducationSphereInstance[]
    ): AdditionalClass[] {
        const hashSphereName: { [key: string]: string } = {};
        spheres.forEach(sphere =>
            hashSphereName[sphere.id] = sphere.name
        );

        const build = function(
            education: AdditionalEducationInstance
        ): AdditionalClass {
            return {
                id: education.id,
                categoryId: education.sphereId,
                categoryName: hashSphereName[education.sphereId] || '',
                name: education.name,
            };
        };
        return additionalEducations.map(build);
    }


    private capitalize_(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

};
export const additionalClassAdminService = new AdditionalClassAdminService();
