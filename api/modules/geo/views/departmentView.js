const departmentStage = require('../enums/departmentStage.js');

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
                stage: department.stage
            };
        });
};

/**
 * View of departments for the b-data-block_addresses block
 * @param {array<object>} departments - department instances
 * @return {array<object>}
 */
departmentView.classes = function(departments) {
    var stage,
        deps = departments.map(dep => { return dep.stage; }),
        elementary = deps.indexOf(departmentStage.ELEMENTARY),
        middle_hide = deps.indexOf(departmentStage.MIDDLE_HIDE),
        middle = deps.indexOf(departmentStage.MIDDLE),
        high = deps.indexOf(departmentStage.HIGH);

    if (elementary != -1 && middle_hide != -1) {
        stage = '1 — 11 классы';
    } else if (elementary != -1 && middle != -1) {
        stage = 'Начальные и средние классы';
    } else if (elementary != -1 && high != -1) {
        stage = 'Начальные и старшие классы';
    } else if (elementary != -1) {
        stage = 'Начальные классы';
    } else if (middle_hide != -1) {
        stage = 'Средние и старшие классы';
    } else if (middle != -1) {
        stage = 'Средние классы';
    } else if (high != -1) {
        stage = 'Старшие классы';
    } else {
        stage = 'Другие адреса';
    }
    return stage;
};
module.exports = departmentView;
