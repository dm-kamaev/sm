'use strict';

import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class InvalidEmail extends Exception {
    private name_: string;

    constructor() {
        const message: string = `Email is invalid.`;

        super(message);

        this.name_ = 'InvalidEmailException';
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }
}

export {InvalidEmail};
