/**
 * @fileOverview Middleware, that checks is user can make actions at
 * school-related entities
 */
import {
    ActionChecker, createMiddlewareFunction
} from './ActionChecker';

import {AccessAttributes} from '../../../api/modules/user/models/adminUser';

class SchoolActionChecker extends ActionChecker {
    protected getRestrictedAttributeId(request: any): number|any {
        return request.params.schoolId;
    }

    protected isPossibleAction(
        accessAttributes: AccessAttributes, restrictedId?: number
    ): boolean {
        console.log(accessAttributes, restrictedId);
        return accessAttributes.isSuperUser ||
            accessAttributes.schoolId === restrictedId;
    }
}

export default SchoolActionChecker;

const middleware = createMiddlewareFunction(SchoolActionChecker);
export {middleware};
