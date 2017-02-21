import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {ProfileAttribute} from '../models/Profile';

import {service as profileService} from '../services/profile';

import {ProfileNotFound} from './errors/ProfileNotFound';

class ProfileAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProfileNotFoundException: ProfileNotFound
        };
    }

    /**
     * @api {get} /api/admin/profile Get all profiles
     * @apiVersion 1.0.0
     * @apiName getAllProfiles
     * @apiGroup Admin University
     *
     * @apiSuccess {Object[]} -            Response body.
     * @apiSuccess {Number}   -.id         Id.
     * @apiSuccess {String}   -.name       Name.
     * @apiSuccess {String}   -.created_at Created at.
     * @apiSuccess {String}   -.updated_at Updated at.
     */
    public async actionList(actionContext: any) {
        return profileService.getAll();
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
    public async actionGet(actionContext: any, id: any) {
        return profileService.get(id);
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
    public async actionCreate(actionContext: any) {
        const profileData: ProfileAttribute = {
            name: actionContext.request.body.name
        };
        return profileService.create(profileData);
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
    public async actionUpdate(actionContext: any, id: any) {
        const profileData: ProfileAttribute = {
            name: actionContext.request.body.name
        };
        return profileService.update(id, profileData);
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
    public async actionDelete(actionContext: any, id: any) {
        return profileService.delete(id);
    }
}

export {ProfileAdminController};
