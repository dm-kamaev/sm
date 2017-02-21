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
}

const profileService = new ProfileService();

export {profileService as service};
