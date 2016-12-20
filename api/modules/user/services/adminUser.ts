const models = require('../../../../app/components/models').all,
    schoolService = require('../../school/services/school');

interface AccessAttributes {
    schoolId: number,
    barndId: number
}

interface AdminUserData {
    userId: number,
    accessAttributes: AccessAttributes
};

class Service {
    static name = 'adminUser';

    static async getAll() {
        return await models.AdminUser.getAll();
    }


    static async create(data: AdminUserData) {
        let user = Service.getByUserId(data.userId);

        return await models.AdminUser.create(data);
    }

    static async getByUserId(userId: number) {
        return await models.AdminUser.getOne({
            where: {
                userId: userId
            },
            raw: true
        });
    }

    static async update(data: AdminUserData) {
        return await models.AdminUser.update({
            accessAttributes: data.accessAttributes
        }, {
            where: {
                userId: data.userId
            },
            raw: true
        });
    }

    static async deleteUser(userId: number) {
        let user = await Service.getByUserId(userId);

        await user.destroy();
    }
}


export default Service;
