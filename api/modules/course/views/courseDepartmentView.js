'use strict';

let view = {};

/**
 * @param  {Array<CourseDepartment>} departments
 * @return {Array<Object>}
 */
view.renderList = function(departments, brandId) {
    return departments.map(department => {
      department.brandId = brandId;
      return this.render(department);
    });
};

/**
 * @param  {CourseDepartment} department
 * @return {Object}
 */
view.render = function(department) {
    return {
        id: department.id,
        name: department.name,
        brandId: department.brandId,
        address: department.address.name,
        phone: department.phone,
        updatedAt: department['updated_at']
    };
};

module.exports = view;
