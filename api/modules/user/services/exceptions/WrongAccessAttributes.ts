import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class WrongAccessAttributes extends Exception {
    private name_: string;
    private entityId_: number;
    private entityType_: string;

    constructor(entityId: number, entityType: string) {
        super(`Entity with ${entityType} = ${entityId} is not exists`);

        this.name_ = 'WrongAccessAttributesException';

        this.entityId_ = entityId;

        this.entityType_ = entityType;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }
}

export default WrongAccessAttributes;
