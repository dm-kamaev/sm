/**
 * @fileOverview Exception, which occurs
 */
import {ServiceException} from '../../../../../api/components/interface';

const Exception: ServiceException =
    require('nodules/controller/ServiceException');

class UserNotLoggedInException extends Exception {
    public readonly name: string;

    constructor() {
        super(`User not logged in`);

        this.name = 'UserNotLoggedInException';
    }
}

export {UserNotLoggedInException};
