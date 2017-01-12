'use strict';

const schoolTypes = require('../../enums/schoolType.js');

export default class SchoolNotExistTypeError extends Error {
    public status: number;
    public response: { code:string, message: string }[];
    constructor(schoolType: string) {
        super();
        this.status = 404;
        let message: string = `Not exist school type "${schoolType}".\n`;
        message += ` Valid type: ${schoolTypes.toArray().join(', ')}`;
        this.response = [{
            code: 'SchoolNotExistType',
            message
        }];
    }
};
