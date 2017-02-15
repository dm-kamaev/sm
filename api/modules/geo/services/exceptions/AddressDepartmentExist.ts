'use strict';

import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class AddressDepartmentExist extends Exception {
    private name_: string;
    private entityId_: string | number;
    private entityType_: string;

    constructor(
      entityId: string | number,
      entityType: string,
      address: string
    ) {
        const message: string = `
          Address "${address}"
          is already binded to "${entityType}"
          with entityId: "${entityId}"
        `;
        super(message);
        this.name_ = 'AddressDepartmentExist';
        this.entityId_ = entityId;
        this.entityType_ = entityType;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get entityId(): string | number {
        return this.entityId_;
    }

    get entityType(): string {
        return this.entityType_;
    }

}

export {AddressDepartmentExist};
