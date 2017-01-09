/**
 * @fileoverview Service for operations with adminUser model
 */
const AdminUserModel = require('../models/adminUser'),
    schoolService = require('../../school/services/school'),
    courseBrandService = require('../../course/services/courseBrand');

import {ActiveRecord} from '../../../components/interface';

import AdminUserNotFound from './exceptions/AdminUserNotFound';
import AdminUserAlreadyExists from './exceptions/AdminUserAlreadyExists';
import WrongAccessAttributes from './exceptions/WrongAccessAttributes';

type AccessAttributes = {
    schoolId: number,
    brandId: number,
    isSuperUser: boolean
};

type AdminUserData = {
    userId: number,
    accessAttributes: AccessAttributes
};

class Service {
    private name_: string;

    constructor() {
        this.name_ = 'adminUser';
    }

    public get name(): string {
        return this.name_;
    }

    public async getAll(): Promise<Array<ActiveRecord>> {
        return await AdminUserModel.findAll();
    }

    public async create(data: AdminUserData): Promise<ActiveRecord> {
        let user = await this.getByUserId_(data.userId);

        if (user) {
            throw new AdminUserAlreadyExists(data.userId);
        }

        await this.checkAccessAttributes_(data.accessAttributes);

        let adminUserData = this.normalizeAccessAttributes_(data);
        return await AdminUserModel.create(adminUserData);
    }

    public async getByUserId(userId: number): Promise<ActiveRecord> {
        let result = await this.getByUserId_(userId);

        if (!result) {
            throw new AdminUserNotFound(userId);
        }

        return result;
    }

    public async update(
        userId: number, data: AdminUserData
    ): Promise<ActiveRecord> {
        let adminUser = await this.getByUserId(userId),
            adminUserData = this.normalizeAccessAttributes_(data);

        await this.checkAccessAttributes_(data.accessAttributes);

        adminUser.update({
            accessAttributes: adminUserData.accessAttributes
        });

        return adminUser;
    }

    public async deleteUser(userId: number) {
        let user = await this.getByUserId(userId);

        await user.destroy();
    }

    /**
     * Silently get admin user from database
     */
    private async getByUserId_(userId: number): Promise<ActiveRecord> {
        return AdminUserModel.findOne({
            where: {
                userId: userId
            }
        });
    }

    /**
     * Check if entity with given attribute id exists in db
     */
    private async checkAccessAttributes_(attributes: AccessAttributes) {
        let schoolId = attributes.schoolId,
            brandId = attributes.brandId;

        const SCHOOL_ID_ENTITY_TYPE = 'schoolId',
            BRAND_ID_ENTITY_TYPE = 'brandId';

        let school = {};
        if (schoolId) {
            school = await schoolService.viewOne(schoolId);

            if (!school) {
                throw new WrongAccessAttributes(
                    schoolId, SCHOOL_ID_ENTITY_TYPE
                );
            }
        }

        let brand = {};
        if (brandId) {
            brand = await courseBrandService.getById(brandId);

            if (!brand) {
                throw new WrongAccessAttributes(
                    schoolId, SCHOOL_ID_ENTITY_TYPE
                );
            }
        }
    }

    /**
     * Normalize access attributes by delete isSuperUser field is necessary
     */
    private normalizeAccessAttributes_(
        data: AdminUserData
    ): AdminUserData {
        let result = Object.assign({}, data),
            isSuperUser = data.accessAttributes.isSuperUser;

        data.accessAttributes.isSuperUser = isSuperUser ? true : undefined;

        return data;
    }
}

export default new Service();
