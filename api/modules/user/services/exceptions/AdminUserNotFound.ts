import {ServiceException} from '../../../../components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class AdminUserNotFound extends Exception {
    private name_: string;
    private adminUserId_: number;

    constructor(adminUserId: number) {
        super(`Admin user with id = ${adminUserId} not found`);

        this.name_ = 'AdminUserNotFoundException';

        this.adminUserId_ = adminUserId;
    }

    get name(): string {
        return this.name_;
    }

    set name(name: string) {
        this.name_ = name;
    }

    get adminUserId(): Number {
        return this.adminUserId_;
    }
}

export default AdminUserNotFound;
