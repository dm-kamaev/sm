'use strict';

const schoolTypes = require('../../enums/schoolType.js');
import {ServiceException} from '../../../../components/interface';

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

export {SchoolNotExistType};
