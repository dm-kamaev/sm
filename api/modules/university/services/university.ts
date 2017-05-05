const squel = require('squel');

const sequelize = require('../../../../app/components/db');
const services = require('../../../../app/components/services').all;
import {
    Model as UniversityModel,
    UniversityInstance,
    UniversityAttribute
} from '../models/University';

import {UniversityAdminList} from '../types/university';

import {Model as CityModel} from '../../geo/models/city';
import {Model as ProgramModel} from '../models/Program';

import {ProfileInstance, Model as ProfileModel} from '../models/Profile';
import {service as profileService} from '../services/profile';
import {
    service as universityProfileService
} from '../services/universityProfile';
import {service as pageService} from '../../entity/services/page';
const entityTypes = require('../../entity/enums/entityType.js');
import {
    UniversityProfileInstance,
    Model as UniversityProfileModel
} from '../models/UniversityProfile';

import {UniversityPageInstance} from '../models/UniversityPage';
import {UniversityNotFound} from './exceptions/UniversityNotFound';
import {
    UniversityNameIsEmptyException,
    UniversityAliasDuplicateException
} from './exceptions/index';

class UniversityService {
    public async getAll(): Promise<Array<UniversityAdminList>> {
        const university = 'university',
        city = 'city', program = 'program',
        profile = 'profile', universityProfile = 'university_profile';
        const query: string = squel.select()
            .from(university)
            .field(`${university}.id`)
            .field(`${university}.name`)
            .field(`${university}.abbreviation`)
            .field(`${city}.name`, 'cityName')
            .field(`${profile}.name`, 'profileName')
            .field(`COUNT(${program}.id)`, 'programCount')
            .field(`${university}.updated_at`, 'updatedAt')
            .left_join(city, null, `${university}.${city}_id = ${city}.id`)
            .left_join(
                universityProfile,
                null,
                `${universityProfile}.university_id = ${university}.id`
            )
            .left_join(
                profile,
                null,
                `${universityProfile}.profile_id = profile.id`
             )
            .left_join(
                program,
                null,
                `${university}.id = ${program}.${university}_id`
            )
            .group(`${university}.id`)
            .group(`${city}.name`)
            .group(`"profileName"`)
            .toString();

        return await sequelize.query(query,
                {type: sequelize.QueryTypes.SELECT, raw: true}
        );
    }

    public async get(id: number): Promise<UniversityInstance>;
    public async get(id: number[]): Promise<UniversityInstance[]>;
    public async get(id): Promise<any> {
        const isSingleId: boolean = typeof id === 'number';
        let where;
        if (isSingleId) {
            where = {id};
        } else {
            where = {
                id: {
                    $in: id
                }
            };
        }
        const result: UniversityInstance[] =
            await UniversityModel.findAll({
                attributes: {
                    exclude: ['city_id', 'university_profile']
                },
                where: where,
                include: [{
                    attributes: ['id', 'name', 'regionId'],
                    model: CityModel,
                    as: 'city'
                }, {
                    attributes: ['id', 'name'],
                    model: ProfileModel,
                    as: 'profiles'
                }]
            });

        if (!result.length && isSingleId) {
            throw new UniversityNotFound(id);
        }

        return isSingleId ? result[0] : result;
    }

    public async create(
            data: UniversityAttribute, profileIds: Array<number>
    ): Promise<UniversityInstance> {
        return sequelize.transaction(async t => {
            const universityName: string = data.name;
            if (!universityName) {
                throw new UniversityNameIsEmptyException(universityName);
            }
            const alias: string =
                services.urls.stringToURL(universityName.trim());
            const duplicate = await pageService.getByAlias(
                alias,
                entityTypes.UNIVERSITY
            );
            if (duplicate) {
                throw new UniversityAliasDuplicateException(alias, duplicate);
            }

            const university: UniversityInstance
                = await UniversityModel.create(data);
            profileIds =
                await profileService.filterNotExistProfileId(profileIds);
            const universityProfiles: Array<{
                universityId: number,
                profileId: number
            }> = profileIds.map((profileId: number) => {
                return {
                    universityId: university.id,
                    profileId
                };
            });
            await UniversityProfileModel.bulkCreate(universityProfiles);
            return university;
        }).catch(error => {
            throw error;
        });
    }

    public async update(
            universityId: number,
            data: UniversityAttribute,
            profileIds: Array<number>
    ): Promise<UniversityInstance | null> {
        return sequelize.transaction(async t => {
            const universityName: string = data.name;
            if (!universityName) {
                throw new UniversityNameIsEmptyException(universityName);
            }
            const alias: string =
                services.urls.stringToURL(universityName.trim());
            const duplicate = await pageService.searchDuplicateAlias({
                entityId: data.id,
                entityType: entityTypes.UNIVERSITY,
                alias
            });
            if (duplicate) {
                throw new UniversityAliasDuplicateException(alias, duplicate);
            }

            profileIds =
                await profileService.filterNotExistProfileId(profileIds);
            let universityProfiles: UniversityProfileInstance[];
            universityProfiles = await universityProfileService.getAllByData({
                where: {
                    universityId,
                    profileId: {
                        $in: profileIds
                    }
                }
            });
            await universityProfileService.deleteByData({
                where: {universityId}
            });

            let newProfiles: Array<{profileId: number, universityId: number}>;
            newProfiles = profileIds.map((profileId: number) => {
                return {profileId, universityId};
            });
            await UniversityProfileModel.bulkCreate(newProfiles);

            const university: [number, UniversityInstance[]]
                = await UniversityModel.update(data, {
                where: {
                    id: universityId
                },
                returning: true,
            });
            return (university && university[1]) ? university[1][0] : null;
        }).catch(error => {
            throw error;
        });
    }

    public async delete(universityId: number): Promise<number> {
        return sequelize.transaction(async t => {
            const res: number = await UniversityModel.destroy({
                where: {
                    id: universityId
                }
            });
            await universityProfileService.deleteByData({
                where: {universityId}
            });
            await pageService.delete(universityId, entityTypes.UNIVERSITY);
            return res;
        }).catch(error => {
            throw error;
        });
    }
}

export const service = new UniversityService();
