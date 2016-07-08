'use strict';

class SchoolNotFoundError extends Error {
    /**
     * School not found error
     * @constructor
     */
    constructor() {
        super('School not found');

        this.code = 404;
    }
}
exports.SchoolNotFoundError = SchoolNotFoundError;

class PageNotFoundError extends Error {
    /**
     * Page not found error
     * @constructor
     */
    constructor() {
        super('Page not found');

        this.code = 404;
    }
}
exports.PageNotFoundError = PageNotFoundError;

