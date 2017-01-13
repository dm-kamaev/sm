'use strict';

module.exports = class DepartmentExist extends Error {
    /**
     * [constructor description]
     * @param  {number} brandId
     * @param  {string} address "улица Новый Арбат, 24"
     */
    constructor(brandId, address) {
        super();
        this.status = 422;
        let message = `Already exist department with brandId: "${brandId}" `;
        message += `by address:"${address}"`;
        this.response = [{
            code: 'DepartmentExist',
            message,
        }];
    }
};
