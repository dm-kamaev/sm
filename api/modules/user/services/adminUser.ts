/**
 * @fileOverview Service for operations with adminUser model
 */
const schoolService = require('../../school/services/school'),
    courseBrandService = require('../../course/services/courseBrand');

import AdminUserModel from '../models/adminUser';
import {
    AccessAttributes, AdminUserInstance
} from '../models/adminUser';

import {
    ApiAccessAttributes,
    ApiAdminUser,
    AccessAttributesInstances,
    AccessAttributesInstancesArrays
} from '../lib/type';

import AdminUserNotFound from './exceptions/AdminUserNotFound';
import AdminUserAlreadyExists from './exceptions/AdminUserAlreadyExists';
import WrongAccessAttributes from './exceptions/WrongAccessAttributes';

import * as lodash from 'lodash';

class Service {
    private name_: string;

    constructor() {
        this.name_ = 'adminUser';
    }

    public get name(): string {
        return this.name_;
    }

    /**
     * Get all users
     */
    public async getAll(): Promise<Array<AdminUserInstance>> {
        return await AdminUserModel.findAll();
    }

    /**
     * Create user
     */
    public async create(data: ApiAdminUser): Promise<AdminUserInstance> {
        let user = await this.getByUserId_(data.userId);

        if (user) {
            throw new AdminUserAlreadyExists(data.userId);
        }

        let adminUserAccessAttributes = await this.normalizeAccessAttributes_(
            data.accessAttributes
        );
        return await AdminUserModel.create({
            userId: data.userId,
            accessAttributes: adminUserAccessAttributes
        });
    }

    /**
     * Get user by id
     */
    public async getByUserId(userId: number): Promise<AdminUserInstance> {
        let result = await this.getByUserId_(userId);

        if (!result) {
            throw new AdminUserNotFound(userId);
        }

        return result;
    }

    /**
     * Update user
     */
    public async update(
        userId: number, data: ApiAdminUser
    ): Promise<AdminUserInstance> {
        let adminUser = await this.getByUserId(userId),
            adminUserAccessAttributes = await this.normalizeAccessAttributes_(
                data.accessAttributes
            );

        await adminUser.update({
            accessAttributes: adminUserAccessAttributes
        });

        return adminUser;
    }

    /**
     * Delete user
     */
    public async deleteUser(userId: number) {
        let user = await this.getByUserId(userId);

        await user.destroy();
    }

    /**
     * Silently get admin user from database
     */
    private async getByUserId_(userId: number): Promise<AdminUserInstance> {
        return AdminUserModel.findOne({
            where: {
                userId: userId
            }
        });
    }

    public async getInstancesByAttributes(
        data: AdminUserInstance
    ): Promise<AccessAttributesInstances>
    public async getInstancesByAttributes(
        data: Array<AdminUserInstance>
    ): Promise<AccessAttributesInstancesArrays>
    public async getInstancesByAttributes(data: any): Promise<any> {
        let result;

        if (Array.isArray(data)) {
            result = this.getInstancesByUsersAttributes_(data);
        } else {
            result = this.getInstancesByUserAttributes_(data);
        }

        return await result;
    }

    /**
     * Normalize access attributes by delete isSuperUser field is necessary
     */
    private async normalizeAccessAttributes_(
        data: ApiAccessAttributes
    ): Promise<AccessAttributes> {
        return {
            schoolId: await this.getSchoolId_(data.schoolName),
            brandId: await this.getBrandId_(data.brandName),
            isSuperUser: data.isSuperUser || undefined
        };
    }

    private async getInstancesByUserAttributes_(
        user: AdminUserInstance
    ): Promise<AccessAttributesInstances> {
        let schoolId = user.accessAttributes.schoolId,
            brandId = user.accessAttributes.brandId,
            school,
            brand;

        if (schoolId) {
            school = await schoolService.viewOne(schoolId);
        }

        if (brandId) {
            brand = await courseBrandService.getById(brandId);
        }

        return {
            school: school,
            brand: brand
        };
    }

    private async getInstancesByUsersAttributes_(
        users: Array<AdminUserInstance>
    ): Promise<AccessAttributesInstancesArrays> {
        let schoolsIds = [],
            brandsIds = [];

        users.forEach(user => {
            schoolsIds.push(user.accessAttributes.schoolId);
            brandsIds.push(user.accessAttributes.brandId);
        });

        let uniqueSchoolsIds = lodash.uniq(schoolsIds),
            uniqueBrandIds = lodash.uniq(brandsIds);

        return {
            schools: await schoolService.getByIds(uniqueSchoolsIds),
            brands: await courseBrandService.getByIds(uniqueBrandIds)
        }
    }

    private async getSchoolId_(schoolName: string): Promise<number> {
        let schools,
            result;
        if (schoolName) {
            schools = await schoolService.getByAttributes({
                name: schoolName
            });

            if (schools.length !== 1) {
                throw new WrongAccessAttributes(schoolName);
            }

            result = schools[0].id;
        }

        return result;
    }

    private async getBrandId_(brandName: string): Promise<number> {
        let brands,
            result;
        if (brandName) {
            brands = await courseBrandService.getByAttributes({
                name: brandName
            });

            if (brands.length !== 1) {
                throw new WrongAccessAttributes(brandName);
            }

            result = brands[0].id;
        }

        return result;
    }
}

export default new Service();
