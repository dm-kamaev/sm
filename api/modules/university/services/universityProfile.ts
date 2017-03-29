import {
    Model as UniversityProfileModel,
    UniversityProfileInstance,
} from '../models/UniversityProfile';

class UniversityProfileService {

    public async getAllByData(data): Promise<UniversityProfileInstance[]> {
        return await UniversityProfileModel.findAll(data);
    }

    public async deleteByData(data): Promise<number> {
        return await UniversityProfileModel.destroy(data);
    }
}

export const service = new UniversityProfileService();
