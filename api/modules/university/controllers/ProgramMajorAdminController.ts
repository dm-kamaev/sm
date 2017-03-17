import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as programMajorService} from '../services/programMajor';

import {ProgramMajorAdmin} from '../types/programMajor';

class ProgramMajorAdminController extends Controller {
    /**
     * @api {get} /api/admin/programmajor Get all program majors
     * @apiVersion 1.0.0
     * @apiName getAllProgramMajor
     * @apiGroup Program Major
     *
     * @apiSuccess {Object[]} -                Response body.
     * @apiSuccess {Number}   -.id             Id.
     * @apiSuccess {String}   -.name           Name.
     * @apiSuccess {Object[]} -.courseTypes    Array of course types.
     * @apiSuccess {Number}   -.courseTypes.id Course type's id.
     * @apiSuccess {String}   -.createdAt      Created at.
     * @apiSuccess {String}   -.updatedAt      Updated at.
     */
    public async actionList(actionContext: any) {
        return programMajorService.getAll();
    }

    /**
     * @api {get} /api/admin/programmajor/:id Get program major by id
     * @apiVersion 1.0.0
     * @apiName getProgramMajor
     * @apiGroup Program Major
     *
     * @apiSuccess {Number}   id             Id.
     * @apiSuccess {String}   name           Name.
     * @apiSuccess {Object[]} courseTypes    Array of course types.
     * @apiSuccess {Number}   courseTypes.id Course type's id.
     * @apiSuccess {String}   createdAt      Created at.
     * @apiSuccess {String}   updatedAt      Updated at.
     */
    public async actionGet(actionContext: any, id: string) {
        return programMajorService.get(Number(id));
    }

    /**
     * @api {post} /api/admin/programmajor Create program major
     * @apiVersion 1.0.0
     * @apiName createProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {String}   name        Program major's name.
     * @apiParam {Number[]} courseTypes Array of course types' ids.
     *
     * @apiSuccess {Number}   id             Id.
     * @apiSuccess {String}   name           Name.
     * @apiSuccess {String}   created_at     Created at.
     * @apiSuccess {String}   updated_at     Updated at.
     * @apiSuccess {String}   createdAt      Created at.
     * @apiSuccess {String}   updatedAt      Updated at.
     */
    public async actionCreate(actionContext: any) {
        const body = actionContext.request.body;
        const programMajorData: ProgramMajorAdmin = {
            name: body.name,
            courseTypes: body.courseTypes
        };
        return programMajorService.create(programMajorData);
    }

    /**
     * @api {put} /api/admin/programmajor/:id Update program major
     * @apiVersion 1.0.0
     * @apiName updateProgramMajor
     * @apiGroup Program Major
     *
     * @apiParam {String}   name        Program major's name.
     * @apiParam {Number[]} courseTypes Array of course types' ids.
     *
     * @apiSuccess {Number}   id             Id.
     * @apiSuccess {String}   name           Name.
     * @apiSuccess {String}   created_at     Created at.
     * @apiSuccess {String}   updated_at     Updated at.
     * @apiSuccess {String}   createdAt      Created at.
     * @apiSuccess {String}   updatedAt      Updated at.
     */
    public async actionUpdate(actionContext: any, id: string) {
        const body = actionContext.request.body;
        const programMajorData: ProgramMajorAdmin = {
            name: body.name,
            courseTypes: body.courseTypes
        };
        return programMajorService.update(Number(id), programMajorData);
    }

    /**
     * @api {delete} /api/admin/programmajor/:id Delete program major
     * @apiVersion 1.0.0
     * @apiName deleteProgramMajor
     * @apiGroup Program Major
     *
     * @apiSuccess {Number} - Number of deleted rows (Should be always 1).
     *
     * @apiSuccessExample {json} Example response:
     *     HTTP/1.1 200 OK
     *     1
     */
    public async actionDelete(actionContext: any, id: string) {
        return programMajorService.delete(Number(id));
    }
}

export {ProgramMajorAdminController};
