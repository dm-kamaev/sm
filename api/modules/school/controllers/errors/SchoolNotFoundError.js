'use strict';

module.exports = class SchoolNotFoundError extends Error {
    /**
     * @param {int} id
     */
    constructor(id) {
        super();
        this.status = 404;
        this.response = [{
            code: 'SchoolNotFoundError',
            message: `Can't find school with ${id}`
        }];
    }
};
