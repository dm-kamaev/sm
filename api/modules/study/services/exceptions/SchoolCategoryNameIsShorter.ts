'use strict';

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class SchoolCategoryNameIsShorter extends Exception {
    private name_: string;
    private categoryName_: string;

    constructor(categoryName: string, mustLength?: number) {
        mustLength = mustLength || 2;
        const message: string = `
            The length of category schools to search for
            search should be greater than or equal to "${mustLength}",\n
            but now length is "${categoryName.length}"
        `;
        super(message);
        this.name_ = 'SchoolCategoryNameIsShorter';
        this.categoryName_ = categoryName;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get profileName(): string {
        return this.categoryName_;
    }
}
export {SchoolCategoryNameIsShorter};
