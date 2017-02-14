const lodash = require('lodash');

import {DepartmentAdmin} from '../interfaces/DepartmentAdmin';

type DepartmentAdminView = {
    id?: number,
    name?: string,
    educationalGrades?: Array<number>,
    addressName?: string,
    updatedAt?: Date
};

class DepartmentView {
    /**
     * @param {array<object>} departments - department instances
     * @return {array<object>}
     */
    public list(departments) {
        return departments
            .map(department => {
                return {
                    name: department.name,
                    stage: department.educationalGrades
                };
            });
    }

    /**
     * @param  {Array<Department>} departments
     * @return {Array<Number>}
     */
    public generalGrades(departments) {
        return lodash
            .chain(departments.map(department =>
                department.educationalGrades
            ))
            .flatten()
            .uniq()
            .sortBy()
            .value();
    }

    /**
     * View of departments for the b-data-block_addresses block
     * @param {array<object>} departments - department instances
     * @return {array<object>}
     */
    public departmentClasses(departments) {
        const grades = this.generalGrades(departments);
        return this.classes(grades);
    }

    /**
     * @param {array<object>} educationalGrades
     * @return {array<object>}
     */
    public classes(educationalGrades) {
        let stage;
        const elementary = educationalGrades.some(
                grade => grade >= 1 && grade <= 4
            ),
            middle = educationalGrades.some(grade => grade >= 5 && grade <= 9),
            high = educationalGrades.some(grade => grade >= 10 && grade <= 11);

        if (elementary && middle && high) {
            stage = '1 — 11 классы';
        } else if (elementary && middle) {
            stage = 'Начальные и средние классы';
        } else if (middle && high) {
            stage = 'Средние и старшие классы';
        } else if (elementary && high) {
            stage = 'Начальные и старшие классы';
        } else if (elementary) {
            stage = 'Начальные классы';
        } else if (middle) {
            stage = 'Средние классы';
        } else if (high) {
            stage = 'Старшие классы';
        } else {
            stage = 'Другие адреса';
        }
        return stage;
    }

    public adminRender(department: DepartmentAdmin): DepartmentAdminView {
        return {
            id: department.id,
            name: department.name,
            educationalGrades: department.educationalGrades,
            addressName: department.addressName,
            updatedAt: department.updatedAt
        };
    }

    public adminRenderList(
        departments: Array<DepartmentAdmin>
    ): Array<DepartmentAdminView> {
        return departments.map(this.adminRender);
    }
}

export const departmentView = new DepartmentView();
