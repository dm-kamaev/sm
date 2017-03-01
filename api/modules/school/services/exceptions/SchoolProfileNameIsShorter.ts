'use strict';

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class SchoolProfileNameIsShorter extends Exception {
    private name_: string;
    private profileName_: string;

    constructor(profileName: string, mustLength?: number) {
        mustLength = mustLength || 2;
        const message: string = `
            The length of profile schools to search for
            search should be greater than or equal to "${mustLength}",\n
            but now length is "${profileName.length}"
        `;
        super(message);
        this.name_ = 'SchoolProfileNameIsShorter';
        this.profileName_ = profileName;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get profileName(): string {
        return this.profileName_;
    }
}
export {SchoolProfileNameIsShorter};