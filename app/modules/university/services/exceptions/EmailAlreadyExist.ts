'use strict';

import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class EmailAlreadyExist extends Exception {
    private name_: string;

    constructor(email: string) {
        const message: string = `Email "${email}" already exist.`;

        super(message);

        this.name_ = 'EmailAlreadyExistException';
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }
}

export {EmailAlreadyExist};
