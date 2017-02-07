'use strict';

const lodashMap = require('lodash/map');

const ID = 'id';

let view = {};

/**
 * @param  {Array<CourseOption>} courseOptions
 * @return {Array<Object>}
 */
view.renderList = function(courseOptions) {
    return courseOptions.map(this.render);
};

/**
 * @param  {CourseOption} courseOption
 * @return {Object}
 */
view.render = function(courseOption) {
    let result = courseOption.toJSON();
    result.departments = lodashMap(courseOption.departments, ID);

    return result;
};

module.exports = view;
