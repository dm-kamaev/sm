import * as lodash from 'lodash';
import {
    Model as ProfileModel,
    ProfileAttribute,
    ProfileInstance
} from '../models/Profile';

import {ProfileNotFound} from './exceptions/ProfileNotFound';

class ProfileService {
    public async getAll(): Promise<Array<ProfileInstance>> {
        return ProfileModel.findAll();
    }

    public async get(id: number): Promise<ProfileInstance> {
        const profile: ProfileInstance = await ProfileModel.findOne({
            where: {
                id: id
            }
        });
        if (!profile) {
            throw new ProfileNotFound(id);
        }
        return profile;
    }


    public async getAllByData(params): Promise<ProfileInstance[]> {
        return await ProfileModel.findAll(params);
    }

    public async create(data: ProfileAttribute): Promise<ProfileInstance> {
        return ProfileModel.create(data);
    }

    public async update(id: number, data: ProfileAttribute):
            Promise<[number, Array<ProfileInstance>]> {
        return ProfileModel.update(data, {
            where: {
                id: id
            }
        });
    }

    public async delete(id: number): Promise<number> {
        return ProfileModel.destroy({
            where: {
                id: id
            }
        });
    }

    public async filterNotExistProfileId(
        profileIds: Array<number>
    ): Promise<number[]> {
        profileIds = lodash.uniq(profileIds);
        const profiles: ProfileInstance[] = await this.getAllByData({
            attributes: ['id'],
            where: {
                id: {
                    $in: profileIds
                }
            },
            raw: true
        });
        // leave only the existing profile id's
        const hashProfile = {};
        profiles.forEach((profile: ProfileInstance) =>
            hashProfile[profile.id] = true
        );
        return profileIds.filter((profileId: number): boolean =>
            hashProfile[profileId]
        );
    }
}

const profileService = new ProfileService();

export {profileService as service};
