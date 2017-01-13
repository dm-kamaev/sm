'use strict';

import {
    ServiceException,
    ControllerError
} from '../../../../components/interface';

const Error: ControllerError = require('nodules/controller/ControllerError');

class SchoolNotExistType extends Error {
    public code: String;
    public status: Number;
    public message: String;
    private exception_: ServiceException;

    constructor(exception: ServiceException) {
        super(exception);

        this.code = 'SchoolNotExistType';
        this.status = 404;
        // let message: string = `Not exist school type "${schoolType}".\n`;
        // message += ` Valid type: ${schoolTypes.toArray().join(', ')}`;
        this.message = exception+'';
    }

    get exception() {
        return this.exception_;
    }
}

export default SchoolNotExistType;

/*import { ServiceException } from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class SchoolNotExistType extends Exception {
    private name_: string;
    private schoolType_: string;

    constructor(schoolType: string) {
        let message: string = `Not exist school type "${schoolType}".\n `;
        message += `Valid type: ${schoolTypes.toArray().join(', ')}`;
        super(message);

        this.name_ = 'SchoolNotExistTypeError';

        this.schoolType_ = schoolType;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get schoolType(): string {
        return this.schoolType_;
    }
}

export default SchoolNotExistType;*/




// export default class SchoolNotExistTypeError extends Error {
//     public status: number;
//     public response: { code:string, message: string }[];
//     constructor(schoolType: string) {
//         super();
//         this.status = 404;
//         let message: string = `Not exist school type "${schoolType}".\n`;
//         message += ` Valid type: ${schoolTypes.toArray().join(', ')}`;
//         this.response = [{
//             code: 'SchoolNotExistType',
//             message
//         }];
//     }
// };
