'use strict';

// author: dm-kamaev
// service profile admin for school

import {Model as SchoolModel} from '../models/school';
import {SchoolInstance} from '../models/school';
import {
    Model as SpecializedClassTypeModel,
    SpecializedClassTypeInstance
} from '../models/specializedClassType';
import {
    SchoolSpecializedClassInstance,
    SchoolSpecializedClassAttribute
} from '../models/schoolSpecializedClass';

import {service as specializedClassService}
    from '../services/specializedClasses';
import {service as schoolSpecializedClassService}
    from './schoolSpecializedClass';

import {SchoolProfileNameIsShorter} from
    './exceptions/SchoolProfileNameIsShorter';
import {ProfileNotFound} from './exceptions/ProfileNotFound';

type profileData = {
    classNumber: number;
    profileId: number;
};

type getList = {
    specializedClasses: number[][] | Array<undefined>;
    hashClassType: { [key: string]: string }
};

class ProfileAdminService {
    public readonly name: string = 'profileAdminService';

    public async getList(
            schoolId: number): Promise<Array<SchoolSpecializedClassInstance>> {
        const specializeClasses =
            await schoolSpecializedClassService.getBySchoolId(schoolId);
        return specializeClasses;
    }

    public async getById(schoolId: number, profileId: number):
            Promise<SchoolSpecializedClassInstance> {
        const profile: SchoolSpecializedClassInstance =
            await schoolSpecializedClassService.get(profileId);
        if (profile.schoolId !== schoolId) {
            throw new ProfileNotFound(schoolId, profileId);
        } else {
            return profile;
        }
    }

    public getListClasses(): Array<number> {
        return [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
        ];
    }

    public async searchProfiles(
        profileName: string
    ): Promise<SpecializedClassTypeInstance[]> {
        if (profileName.length < 2) {
            throw new SchoolProfileNameIsShorter(profileName);
        }
        profileName = this.capitalize_(profileName);
        return await SpecializedClassTypeModel.findAll({
            attributes: [ 'id', 'name' ],
               where: {
                   name: {
                       $like: '%' + profileName + '%'
                   }
               },
               limit: 10,
        });
    }

    private capitalize_(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export const profileAdminService = new ProfileAdminService();
