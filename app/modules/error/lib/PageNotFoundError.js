'use strict';

class PageNotFoundError extends Error {
    /**
     * Page not found error
     * @constructor
     * @param {string} entityType
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
