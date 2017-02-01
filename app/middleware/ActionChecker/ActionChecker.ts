/**
 * @fileOverview This abstract middleware class that check can user make actions
 */
import adminUserService from '../../../api/modules/user/services/adminUser';
import {AccessAttributes} from '../../../api/modules/user/models/adminUser';

const adminConfig = require('../../config/admin.json');
const USER_HEADER_NAME: string = adminConfig.headers.user.name;

abstract class ActionChecker {
    public async check(request: any, response: any, next: any) {
        const accessAttributes = request.adminUser.accessAttributes,
            restrictedId = this.getRestrictedAttributeId(request);
        if (this.isPossibleAction(accessAttributes, restrictedId)) {
            next();
        } else {
            response.status(403).end();
        }
    }

    protected abstract getRestrictedAttributeId(request: any): number | null;

    protected abstract isPossibleAction(accessAttributes: AccessAttributes,
        restrictedId?: number): boolean
}

const createMiddlewareFunction = function<T extends ActionChecker>(
    ActionChecker: {new(): ActionChecker}
) {
    const actionCheckerInstance = new ActionChecker();

    return (request, response, next) => {
        actionCheckerInstance.check(request, response, next);
    };
};

export {
    createMiddlewareFunction,
    ActionChecker
};
