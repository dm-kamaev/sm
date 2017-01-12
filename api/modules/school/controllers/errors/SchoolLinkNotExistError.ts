'use strict';

export default class SchoolLinkNotExistError extends Error {
    public status: number;
    public response: { code:string, message: string }[];
    constructor() {
        super();
        this.status = 422;
        let message: string = `Not exist school link with id="0".\n`;
        message += ` Link id there should be more 0`;
        this.response = [{
            code: 'SchoolLinkNotExistError',
            message
        }];
    }
};
