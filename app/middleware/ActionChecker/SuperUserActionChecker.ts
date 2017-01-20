/**
 * @fileOverview Middleware, that checks is user can make actions only possible
 * for super users
 */
import {
    ActionChecker, createMiddlewareFunction
} from './ActionChecker';

import {AccessAttributes} from '../../../api/modules/user/models/adminUser';

class SuperUserActionChecker extends ActionChecker {
    protected getRestrictedAttributeId(request: any): number|any {
        return null;
    }

    protected isPossibleAction(
        accessAttributes: AccessAttributes, restrictedId?: number
    ): boolean {
        return accessAttributes.isSuperUser || false;
    }
}
export default SuperUserActionChecker;

let middleware = createMiddlewareFunction(SuperUserActionChecker);
export {middleware};
