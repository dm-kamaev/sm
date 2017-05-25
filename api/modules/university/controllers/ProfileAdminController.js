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
const Controller = require('nodules/controller').Controller;
const profile_1 = require("../services/profile");
const ProfileNotFound_1 = require("./errors/ProfileNotFound");
class ProfileAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProfileNotFoundException: ProfileNotFound_1.ProfileNotFound
        };
    }
    /**
     * @api {get} /api/admin/profile Get all profiles
     * @apiVersion 1.0.0
     * @apiName getAllProfiles
     * @apiGroup Admin University Profile
     *
     * @apiSuccess {Object[]} -            Response body.
     * @apiSuccess {Number}   -.id         Id.
     * @apiSuccess {String}   -.name       Name.
     * @apiSuccess {String}   -.created_at Created at.
     * @apiSuccess {String}   -.updated_at Updated at.
     */
    actionList(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return profile_1.service.getAll();
        });
    }
    /**
     * @api {get} /api/admin/profile/:id Get profile by id
     * @apiVersion 1.0.0
     * @apiName getProfile
     * @apiGroup Admin University Profile
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} name       Name.
     * @apiSuccess {String} created_at Created at.
     * @apiSuccess {String} updated_at Updated at.
     *
     * @apiError (404) ProfileNotFound Profile with given Id not found.
     */
    actionGet(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return profile_1.service.get(id);
        });
    }
    /**
     * @api {post} /api/admin/profile Create profile
     * @apiVersion 1.0.0
     * @apiName createProfile
     * @apiGroup Admin University Profile
     *
     * @apiParam {String} name Profile's name.
     *
     * @apiSuccess {Number} id         Id.
     * @apiSuccess {String} name       Name.
     * @apiSuccess {String} created_at Created at.
     * @apiSuccess {String} updated_at Updated at.
     */
    actionCreate(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileData = {
                name: actionContext.request.body.name
            };
            return profile_1.service.create(profileData);
        });
    }
    /**
     * @api {put} /api/admin/profile/:id Update profile
     * @apiVersion 1.0.0
     * @apiName updateProfile
     * @apiGroup Admin University Profile
     *
     * @apiParam {Number} id   Profile's id.
     * @apiParam {String} name Profile's new name.
     *
     * @apiSuccess {Array}  -    Response body.
     * @apiSuccess {Number} -[0] Number of updated rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     [
     *         1
     *     ]
     */
    actionUpdate(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileData = {
                name: actionContext.request.body.name
            };
            return profile_1.service.update(id, profileData);
        });
    }
    /**
     * @api {delete} /api/admin/profile/:id Delete profile
     * @apiVersion 1.0.0
     * @apiName deleteProfile
     * @apiGroup Admin University Profile
     *
     * @apiParam {Number} id   Profile's id.
     *
     * @apiSuccess {Number}  - Number of deleted rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     1
     */
    actionDelete(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return profile_1.service.delete(id);
        });
    }
}
exports.ProfileAdminController = ProfileAdminController;
