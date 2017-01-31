'use strict';

module.exports = class SchoolDepatmentNotFound extends Error {
    /**
     * [constructor description]
     * @param  {Number} schoolId
     * @param  {Number} departmentId
     */
    constructor(schoolId, departmentId) {
        super();
        this.status = 404;
        let message = `Can't find school's (schoolId: "${schoolId}") `;
        message += `department with departmentId: "${departmentId}"`;
        this.response = [{
            code: 'SchoolDepatmentNotFound',
            message
        }];
    }
};
