'use strict';

// author: dm-kamaev
// view additional class admin for school

import {AdditionalEducationSphereInstance}
    from '../../school/models/additionalEducationSphere';

import {AdditionalEducationInstance}
    from '../../school/models/additionalEducation';

type additionalClass = {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
};

type additionalClassEdit = {
    id: number;
    schoolId: number;
    name: string;
    categoryId: number;
};


class View {

    public listAdditionalClasses(
        additionalEducations: AdditionalEducationInstance[],
        spheres: AdditionalEducationSphereInstance[]
    ): additionalClass[] {
        const hashSphereName: { [key: string]: string } =
            this.getHashSpehereName_(spheres);

        return additionalEducations.map(education => {
            const categoryName: string =
                hashSphereName[education.sphereId] || '';
            return this.oneClass_(education, categoryName);
        });
    }

    public oneAdditionalClass(
        additionalEducation: AdditionalEducationInstance | boolean,
        spheres: AdditionalEducationSphereInstance[]
    ): additionalClass | {} {
        if (!additionalEducation) {
            return {};
        }
        const education = additionalEducation as AdditionalEducationInstance;
        const hashSphereName: { [key: string]: string } =
            this.getHashSpehereName_(spheres);

        const sphereId = education.sphereId;
        const categoryName: string =
            hashSphereName[sphereId] || '';
        return this.oneClass_(education, categoryName);
    }

    public createAdditionalClass(
        additionalClass: AdditionalEducationInstance | null
    ): additionalClassEdit | {} {
        if (!additionalClass) {
            return {};
        }
        return {
            id: additionalClass.id,
            name: additionalClass.name,
            schoolId: additionalClass.schoolId,
            categoryId: additionalClass.sphereId,
        };
    }

    public updateAdditionalClass(
        additionalClass: AdditionalEducationInstance | null
    ): additionalClassEdit | {} {
        if (!additionalClass) {
            return {};
        }
        const education = additionalClass as AdditionalEducationInstance;
        return {
            id: education.id,
            name: education.name,
            schoolId: education['school_id'],
            categoryId: education['sphere_id'],
        };
    }

    private oneClass_(
        education: AdditionalEducationInstance,
        categoryName: string,
    ): additionalClass {
        return {
            id: education.id,
            categoryId: education.sphereId,
            categoryName,
            name: education.name,
        };
    }

    private getHashSpehereName_(
        spheres: AdditionalEducationSphereInstance[]
    ): { [key: string]: string } {
        const hashSphereName: { [key: string]: string } = {};
        spheres.forEach(sphere =>
            hashSphereName[sphere.id] = sphere.name
        );
        return hashSphereName;
    }
};
export const view = new View();
