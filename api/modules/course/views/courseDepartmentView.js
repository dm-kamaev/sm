'use strict';

let view = {};

/**
 * @param  {Array<CourseDepartment>} departments
 * @return {Array<Object>}
 */
view.renderList = function(departments) {
    return departments.map(this.render);
};

/**
 * @param  {CourseDepartment} department
 * @return {Object}
 */
view.render = function(department) {
    return {
        id: department.id,
        name: department.name,
        address: department.address.name,
        phone: department.phone,
        updatedAt: department['updated_at']
    };
};

module.exports = view;
