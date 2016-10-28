'use strict';

class PageNotFoundError extends Error {
    /**
     * Page not found error
     * @constructor
     */
    constructor(entityType) {
        super('Page not found');

        /**
         * Error code
         * @type {number}
         * @public
         */
        this.code = 404;
    }
};

module.exports = PageNotFoundError;
