/**
 * @fileOverview Service for make CRUD operations on model
 */
import {Service} from '../../common/services/Service';

import {UserNotLoggedInException} from './exceptions/UserNotLoggedIn';

class UserService extends Service {
    public getUserFromRequest(request: any): any {
        const user = request.user;
        if (!user) {
            throw new UserNotLoggedInException();
        }

        return user;
    }

    protected handleError(error) {
        throw error;
    }
}

export const userService = new UserService();
