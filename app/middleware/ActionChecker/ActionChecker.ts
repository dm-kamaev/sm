/**
 * @fileOverview This abstract middleware class that check can user make actions
 */
import adminUserService from '../../../api/modules/user/services/adminUser';
import {AccessAttributes} from '../../../api/modules/user/models/adminUser';

const adminConfig = require('../../config/admin.json');
const userHeaderName = adminConfig.headers.user.name;

abstract class ActionChecker {
    async check(request: any, response: any, next: any) {
        let userId = this.getUserId(request),
            accessAttributes = await this.getUserAccessAttributes(userId),
            restrictedId = this.getRestrictedAttributeId(request);

        if(this.isPossibleAction(accessAttributes, restrictedId)) {
            next();
        } else {
            response.status(403).end();
        }
    }

    protected getUserId(request: any): number {
        return request.get(userHeaderName);
    }

    protected async getUserAccessAttributes(
        userId: number
    ): Promise<AccessAttributes> {
        let user = await adminUserService.getByUserId(userId);

        return user.accessAttributes;
    }

    protected abstract getRestrictedAttributeId(request: any): number | null;

    protected abstract isPossibleAction(
        accessAttributes: AccessAttributes, restrictedId?: number
    ): boolean
}

export {ActionChecker};

let createMiddlewareFunction =
    function<T extends ActionChecker>(
        ActionChecker: {new(): ActionChecker}
    ) {
        let actionCheckerInstance = new ActionChecker();

        return (request, response, next) => {
            actionCheckerInstance.check(request, response, next);
        };
};
export {createMiddlewareFunction};
