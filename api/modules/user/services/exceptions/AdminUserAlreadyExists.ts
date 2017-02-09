import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class AdminUserAlreadyExists extends Exception {
    private name_: string;
    private adminUserId_: number;

    constructor(adminUserId: number) {
        super(`Admin user with user id = ${adminUserId} already exists`);

        this.name_ = 'AdminUserAlreadyExistsException';

        this.adminUserId_ = adminUserId;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get adminUserId(): number {
        return this.adminUserId_;
    }
}

export default AdminUserAlreadyExists;
