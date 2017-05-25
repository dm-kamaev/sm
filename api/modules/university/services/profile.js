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
const lodash = require("lodash");
const Profile_1 = require("../models/Profile");
const ProfileNotFound_1 = require("./exceptions/ProfileNotFound");
class ProfileService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Profile_1.Model.findAll();
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield Profile_1.Model.findOne({
                where: {
                    id: id
                }
            });
            if (!profile) {
                throw new ProfileNotFound_1.ProfileNotFound(id);
            }
            return profile;
        });
    }
    getAllByData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Profile_1.Model.findAll(params);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Profile_1.Model.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return Profile_1.Model.update(data, {
                where: {
                    id: id
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Profile_1.Model.destroy({
                where: {
                    id: id
                }
            });
        });
    }
    filterNotExistProfileId(profileIds) {
        return __awaiter(this, void 0, void 0, function* () {
            profileIds = lodash.uniq(profileIds);
            const profiles = yield this.getAllByData({
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
            profiles.forEach((profile) => hashProfile[profile.id] = true);
            return profileIds.filter((profileId) => hashProfile[profileId]);
        });
    }
}
const profileService = new ProfileService();
exports.service = profileService;
