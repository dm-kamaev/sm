const lodash = require('lodash');

var departmentView = {};

/**
 * @param {array<object>} departments - department instances
 * @return {array<object>}
 */
departmentView.list = function(departments) {
    return departments
        .map(department => {
            return {
                name: department.name,
                stage: department.educationalGrades
            };
        });
};

/**
 * @param  {Array<Department>} departments
 * @return {Array<Number>}
 */
departmentView.generalGrades = function(departments) {
    return lodash
        .chain(departments.map(department =>
            department.educationalGrades
        ))
        .flatten()
        .uniq()
        .sortBy()
        .value();
};

/**
 * View of departments for the b-data-block_addresses block
 * @param {array<object>} departments - department instances
 * @return {array<object>}
 */
departmentView.departmentClasses = function(departments) {
    const grades = this.generalGrades(departments);
    return this.classes(grades);
};

/**
 * @param {array<object>} educationalGrades
 * @return {array<object>}
 */
departmentView.classes = function(educationalGrades) {
    var stage,
        elementary = educationalGrades.some(grade => grade >= 1 && grade <= 4),
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
};

module.exports = departmentView;
