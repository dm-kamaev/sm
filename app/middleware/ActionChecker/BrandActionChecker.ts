/**
 * @fileOverview Middleware, that checks is user can make actions at
 * course brand-related entities
 */
import {
    ActionChecker, createMiddlewareFunction
} from './ActionChecker';

import {AccessAttributes} from '../../../api/modules/user/models/adminUser';

class BrandActionChecker extends ActionChecker {
    protected getRestrictedAttributeId(request: any): number|any {
        return request.body.brandId;
    }

    protected isPossibleAction(
        accessAttributes: AccessAttributes, restrictedId?: number
    ): boolean {
        return accessAttributes.isSuperUser ||
            accessAttributes.brandId === restrictedId;
    }
}

export {BrandActionChecker};

const middleware = createMiddlewareFunction(BrandActionChecker);
export {middleware};
