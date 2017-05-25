"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const squel = require('squel');
const sequelize = require('../../../../app/components/db');
const services = require('../../../../app/components/services').all;
const University_1 = require("../models/University");
const city_1 = require("../../geo/models/city");
const Profile_1 = require("../models/Profile");
const profile_1 = require("../services/profile");
const universityProfile_1 = require("../services/universityProfile");
const page_1 = require("../../entity/services/page");
const entityTypes = require('../../entity/enums/entityType.js');
const UniversityProfile_1 = require("../models/UniversityProfile");
const UniversityNotFound_1 = require("./exceptions/UniversityNotFound");
const index_1 = require("./exceptions/index");
class UniversityService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const university = 'university', city = 'city', program = 'program', profile = 'profile', universityProfile = 'university_profile';
            const query = squel.select()
                .from(university)
                .field(`${university}.id`)
                .field(`${university}.name`)
                .field(`${university}.abbreviation`)
                .field(`${city}.name`, 'cityName')
                .field(`${profile}.name`, 'profileName')
                .field(`COUNT(${program}.id)`, 'programCount')
                .field(`${university}.updated_at`, 'updatedAt')
                .left_join(city, null, `${university}.${city}_id = ${city}.id`)
                .left_join(universityProfile, null, `${universityProfile}.university_id = ${university}.id`)
                .left_join(profile, null, `${universityProfile}.profile_id = profile.id`)
                .left_join(program, null, `${university}.id = ${program}.${university}_id`)
                .group(`${university}.id`)
                .group(`${city}.name`)
                .group(`"profileName"`)
                .toString();
            return yield sequelize.query(query, { type: sequelize.QueryTypes.SELECT, raw: true });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isSingleId = typeof id === 'number';
            let where;
            if (isSingleId) {
                where = { id };
            }
            else {
                where = {
                    id: {
                        $in: id
                    }
                };
            }
            const result = yield University_1.Model.findAll({
                attributes: {
                    exclude: ['city_id', 'university_profile']
                },
                where: where,
                include: [{
                        attributes: ['id', 'name', 'regionId'],
                        model: city_1.Model,
                        as: 'city'
                    }, {
                        attributes: ['id', 'name'],
                        model: Profile_1.Model,
                        as: 'profiles'
                    }]
            });
            if (!result.length && isSingleId) {
                throw new UniversityNotFound_1.UniversityNotFound(id);
            }
            return isSingleId ? result[0] : result;
        });
    }
    create(data, profileIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const universityName = data.name;
                if (!universityName) {
                    throw new index_1.UniversityNameIsEmptyException(universityName);
                }
                const alias = services.urls.stringToURL(universityName.trim());
                const duplicate = yield page_1.service.getByAlias(alias, entityTypes.UNIVERSITY);
                if (duplicate) {
                    throw new index_1.UniversityAliasDuplicateException(alias, duplicate);
                }
                const university = yield University_1.Model.create(data);
                profileIds =
                    yield profile_1.service.filterNotExistProfileId(profileIds);
                const universityProfiles = profileIds.map((profileId) => {
                    return {
                        universityId: university.id,
                        profileId
                    };
                });
                yield UniversityProfile_1.Model.bulkCreate(universityProfiles);
                return university;
            })).catch(error => {
                throw error;
            });
        });
    }
    update(universityId, data, profileIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const universityName = data.name;
                if (!universityName) {
                    throw new index_1.UniversityNameIsEmptyException(universityName);
                }
                const alias = services.urls.stringToURL(universityName.trim());
                const duplicate = yield page_1.service.searchDuplicateAlias({
                    entityId: data.id,
                    entityType: entityTypes.UNIVERSITY,
                    alias
                });
                if (duplicate) {
                    throw new index_1.UniversityAliasDuplicateException(alias, duplicate);
                }
                profileIds =
                    yield profile_1.service.filterNotExistProfileId(profileIds);
                let universityProfiles;
                universityProfiles = yield universityProfile_1.service.getAllByData({
                    where: {
                        universityId,
                        profileId: {
                            $in: profileIds
                        }
                    }
                });
                yield universityProfile_1.service.deleteByData({
                    where: { universityId }
                });
                let newProfiles;
                newProfiles = profileIds.map((profileId) => {
                    return { profileId, universityId };
                });
                yield UniversityProfile_1.Model.bulkCreate(newProfiles);
                const university = yield University_1.Model.update(data, {
                    where: {
                        id: universityId
                    },
                    returning: true,
                });
                return (university && university[1]) ? university[1][0] : null;
            })).catch(error => {
                throw error;
            });
        });
    }
    delete(universityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const res = yield University_1.Model.destroy({
                    where: {
                        id: universityId
                    }
                });
                yield universityProfile_1.service.deleteByData({
                    where: { universityId }
                });
                yield page_1.service.delete(universityId, entityTypes.UNIVERSITY);
                return res;
            })).catch(error => {
                throw error;
            });
        });
    }
}
exports.service = new UniversityService();
