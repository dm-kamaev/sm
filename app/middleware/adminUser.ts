import {
    service as adminUserService
} from '../../api/modules/user/services/adminUser';
import {adminUserView} from '../../api/modules/user/views/adminUserView';

const adminConfig = require('../config/admin.json');
const USER_HEADER_NAME: string = adminConfig.headers.user.name;

export const adminUser = async function(request, response, next) {
    const userHeaderValue: string = request.get(USER_HEADER_NAME);
    const userId: number = Number(userHeaderValue);
    if (userId) {
        const user = await adminUserService.getByUserId(userId);
        request.adminUser = user.toJSON();
    }
    next();
};
