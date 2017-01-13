/**
 * @fileOverview View for admin user
 */
import {ApiAdminUser} from '../lib/type';
import {AdminUserAttribute} from '../models/adminUser';
import {SchoolAttribute} from '../../school/models/school';
import {CourseBrandAttribute} from '../../course/models/courseBrand';

type RenderData = {
    adminUser: AdminUserAttribute,
    brand: CourseBrandAttribute,
    school: SchoolAttribute
};

type RenderListData = {
    adminUsers: Array<AdminUserAttribute>,
    brands: Array<CourseBrandAttribute>,
    schools: Array<SchoolAttribute>
};

class AdminUserView {
    constructor() {

    }

    render(data: RenderData): ApiAdminUser {
        let school = data.school,
            brand = data.brand;
        return {
            userId: data.adminUser.userId,
            accessAttributes: {
                schoolName: school ? school.name : undefined,
                brandName: brand ? brand.name : undefined,
                isSuperUser: data.adminUser.accessAttributes.isSuperUser
            }
        };
    }

    renderList(data: RenderListData): Array<ApiAdminUser> {
        let brands = data.brands,
            schools = data.schools;

        return data.adminUsers.map((adminUser) => {
            let accessAttributes = adminUser.accessAttributes,
                brand = brands.find(
                    brandItem => brandItem.id === accessAttributes.brandId
                ),
                school = schools.find(
                    schoolItem => schoolItem.id === accessAttributes.schoolId
                );

            return this.render({adminUser, school, brand});
        });
    }
}

export default new AdminUserView();
