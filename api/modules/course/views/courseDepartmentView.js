'use strict';

let view = {};

/**
 * @param  {Object[]} departments
 * @param  {Number} brandId
 * @return {Object[]} [ { id, name, brandId, adress, phone, updatedAt }, ]
 */
view.renderList = function(departments, brandId) {
    return departments.map(department => this.render(department, brandId));
};


/**
 * [render description]
 * @param  {Object} department
 * @param  {Number} brandId
 * @return {Object} { id, name, brandId, adress, phone, updatedAt }
 */
view.render = function(department, brandId) {
    return {
        id: department.id,
        name: department.name,
        brandId: brandId,
        address: department.address.name,
        phone: department.phone,
        updatedAt: department['updated_at']
    };
};

module.exports = view;
