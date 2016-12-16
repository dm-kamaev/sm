'use strict';

module.exports = class MissingSearchString extends Error {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.status = 422;
        this.response = [{
            code: 'MissingSearchString',
            message: 'Search string should be specified'
        }];
    }
};
