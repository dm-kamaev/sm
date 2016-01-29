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

module.exports = departmentView;
