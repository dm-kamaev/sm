'use strict';

module.exports = class AddressNotFound {
    /**
     * @constructor
     * @param {string} errorMessage
     */
    constructor(errorMessage) {
        this.status = 422;
        this.response = [{
            code: 'AddressNotFound',
            message: errorMessage
        }];
    }
};
