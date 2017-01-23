'use strict';

const async = require('asyncawait/async'),
    await = require('asyncawait/await'),
    commander = require('commander'),
    lodash = require('lodash');

const services = require('../app/components/services').all,
    models = require('../app/components/models').all;

class DepartmentStageToGrades {
    /**
     * @constructor
     */
    constructor() {
        /**
         * @private
         * @type {Object}
         */
        this.stagesToGrades_ = {
            'Дошкольное образование': [0],
            'Начальное образование': [1, 2, 3, 4],
            'Основное и среднее': [5, 6, 7, 8, 9, 10, 11],
            'Основное образование': [5, 6, 7, 8, 9],
            'Среднее образование': [10, 11]
        };
    }

    /**
     * Create archived csv with page data got from schools
     */
    process() {
        var schoolsWithDepartments = await(services.school.listInstances()),
            preparedDepartments = this.findNecessary_(schoolsWithDepartments);

        var departmentsGrades = this.convertStages_(preparedDepartments);

        await(this.updateDb_(departmentsGrades));

        // await(this.deleteUnnecessaryDepartments_());
    }

    /**
     * @private
     * @param {Array<Object>} schoolsWithDepartments
     * @return {Array<Object>}
     */
    findNecessary_(schoolsWithDepartments) {
        return lodash.flattenDeep(schoolsWithDepartments.map(school =>
            this.processAddresses_(school.addresses)
        ));
    }

    /**
     * @private
     * @param {Array<Object>} addresses
     * @return {Array<Object>}
     */
    processAddresses_(addresses) {
        return addresses.map(address =>
            this.getNecessaryDepartments_(address.departments)
        );
    }

    /**
     * @private
     * @param {Object} departments
     * @return {Array<Object>}
     */
    getNecessaryDepartments_(departments) {
        var stageCount = lodash.countBy(departments, 'stage');
        for (var stage in stageCount) {
            if (stageCount[stage] > 1) {
                departments = departments.filter(department => {
                    return (department.stage === stage && department.name) ||
                        department.stage !== stage;
                });
            }
        }
        return departments.map(department => department.dataValues);
    }

    /**
     * @private
     * @param {Array<Object>} departments
     * @return {Array<Object>}
     */
    convertStages_(departments) {
        return departments.map(department => this.convertStage_(department));
    }

    /**
     * @private
     * @param {Array<Object>} departmentsGrades
     */
    updateDb_(departmentsGrades) {
        departmentsGrades.forEach(departmentGrades => {
            await(services.department.update(
                departmentGrades.id, {
                    educationalGrades: departmentGrades.educationalGrades
                }
            ));
        });
    }

    /**
     * @private
     */
    deleteUnnecessaryDepartments_() {
        models.Department.destroy({where: {
            educationalGrades: null
        }});
    }

    /**
     * @private
     * @param {Object} department
     * @return {Object}
     */
    convertStage_(department) {
        var result = Object.assign(department, {
            educationalGrades: this.stageToGrades_(department.stage)
        });

        return result;
    }

    /**
     * @private
     * @param {string} stage
     * @return {Array<number>}
     */
    stageToGrades_(stage) {
        return this.stagesToGrades_[stage];
    }
}

var convert = async(function() {
    var departmentStageToGrades = new DepartmentStageToGrades();

    departmentStageToGrades.process();
});

commander
    .command('createDepartmentGrades')
    .description('Convert department stages to educational grades')
    .action(() => convert());

exports.Command;
