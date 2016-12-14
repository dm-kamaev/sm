'use strict';

module.exports = class CategoryNotFound extends Error {
    /**
     * @constructor
     * @param {string|number} id
     */
    constructor(id) {
        super();
        this.status = 422;
        this.response = [{
            code: 'CategoryNotFound',
            message: `Category with id ${id} not found`
        }];
    }
};
