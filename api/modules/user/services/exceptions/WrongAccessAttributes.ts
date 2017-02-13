import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class WrongAccessAttributes extends Exception {
    private name_: string;
    private entityName_: string;

    constructor(entityName: string) {
        super(`Entity with name = ${entityName} is not found`);

        this.name_ = 'WrongAccessAttributesException';

        this.entityName_ = entityName;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }
}

export {WrongAccessAttributes};
