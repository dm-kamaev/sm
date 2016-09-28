'use strict';

module.exports = new class {
    /**
     * @param {string} key
     * @param {string} message
     */
    throwValidation(key, message) {
        let errorBody = [{
            code: 'ValidationError',
            message: {}
        }];
        errorBody[0].message[key] = [message];
        throw new Error(JSON.stringify(errorBody));
    }
};
