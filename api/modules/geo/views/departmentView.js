const departmentStage = require.main.require('./api/modules/geo/enums/departmentStage.js');

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
        deps = departments.map(dep => {return dep.stage;}),
        elementary = deps.indexOf(departmentStage.ELEMENTARY),
        middle_hide = deps.indexOf(departmentStage.MIDDLE_HIDE);
    if (elementary != -1 && middle_hide != -1) {
        stage = '1 — 11 классы';
    } else if (elementary != -1) {
        stage = 'Начальные классы';
    } else {
        stage = 'Старшие и средние классы';
    }
    return stage;
}
module.exports = departmentView;
