'use strict';

// author: dm-kamaev
// service additional class admin for school

import {AdditionalEducationSphereInstance}
    from '../../school/models/additionalEducationSphere';

import {AdditionalEducationInstance}
    from '../../school/models/additionalEducation';

import {service as AdditionalEducationService}
    from '../../school/services/additionalEducation';

import {SchoolCategoryNameIsShorter} from
    './exceptions/SchoolCategoryNameIsShorter';

type classesAndSpheres = {
    additionalEducations: AdditionalEducationInstance[],
    spheres: AdditionalEducationSphereInstance[]
};

type classAndSpheres = {
    additionalEducation: AdditionalEducationInstance | boolean,
    spheres: AdditionalEducationSphereInstance[]
};

class AdditionalClassAdminService {
    public readonly name: string = 'additionalClassAdminService';

    public async getList(schoolId: number): Promise<classesAndSpheres> {
        let spheres: AdditionalEducationSphereInstance[],
            additionalEducations: AdditionalEducationInstance[];
        additionalEducations = await AdditionalEducationService.getAllByData({
            attributes: [
                'id', 'name', 'sphereId',
            ],
            where: {
                schoolId,
            }
        });

        const sphereIds: Array<number> =
            additionalEducations.map((education): number => education.sphereId);
        spheres = await AdditionalEducationService.getAllSpehereByData({
            attributes: [ 'id', 'name' ],
            where: {
                id: {
                   $in: sphereIds
                }
            }
        });
        return {additionalEducations, spheres};
    }


    public async getById(
        schoolId: number,
        additionalClassId: number
    ): Promise<classAndSpheres> {
        const classesAndSpheres: classesAndSpheres
            = await this.getList(schoolId);
        const list: AdditionalEducationInstance[]
            = classesAndSpheres.additionalEducations;
        let res: AdditionalEducationInstance;
        const searchClass = function(
            additionalClass: AdditionalEducationInstance
        ): boolean {
            const res = additionalClass.id &&
                additionalClass.id === additionalClassId;
            return res;
        };
        res = list.find(searchClass);
        return {
            additionalEducation: res,
            spheres: classesAndSpheres.spheres
        };
    }


    public async create(
        schoolId: number,
        additionClass: {
          categoryId: number,
          name: string
        }
    ): Promise<AdditionalEducationInstance> {
        return await AdditionalEducationService.create({
            schoolId,
            name: additionClass.name,
            sphereId: additionClass.categoryId,
        });
    }


    public async update(
        schoolId: number,
        additionalClassId: number,
        additionalClass: {
          categoryId: number,
          name: string,
        }
    ): Promise<AdditionalEducationInstance | null> {
        let res: AdditionalEducationInstance | null = null;
        let education: [number, AdditionalEducationInstance[]];

        education = await AdditionalEducationService.updateByData({
            name: additionalClass.name,
            sphereId: additionalClass.categoryId,
        }, {
            where: {
                id: additionalClassId
            },
            returning: true
        });

        if (education && education[0]) {
            res = education[1][0];
        }
        return res;
    }


    public async delete(
        schoolId: number,
        additionalClassId: number
    ): Promise<number> {
        return await AdditionalEducationService.deleteByData({
            where: {
                id: additionalClassId,
                schoolId,
            }
        });
    }


    public async searchCategory(
        categoryName: string
    ): Promise<AdditionalEducationInstance[]> {
        if (categoryName.length < 2) {
            throw new SchoolCategoryNameIsShorter(categoryName);
        }
        categoryName = this.capitalize_(categoryName);
        return await AdditionalEducationService.getAllByData({
            attributes: [ 'id', 'name' ],
               where: {
                   name: {
                       $like: '%' + categoryName + '%'
                   }
               },
               limit: 10,
        });
    }

    private capitalize_(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

};
export const additionalClassAdminService = new AdditionalClassAdminService();
