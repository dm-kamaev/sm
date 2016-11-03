'use strict';

module.exports = class ScheduleFormatError extends Error {
    /**
     * @param {string} data
     */
    constructor(data) {
        super();
        this.status = 422;
        this.response = [{
            code: 'ScheduleFormatError',
            message: `${data} is not a valid format`
        }];
    }
};
