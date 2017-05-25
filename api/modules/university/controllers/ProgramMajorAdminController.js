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
const programMajor_1 = require("../services/programMajor");
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
    actionList(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return programMajor_1.service.getAll();
        });
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
    actionGet(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return programMajor_1.service.get(Number(id));
        });
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
    actionCreate(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body;
            const programMajorData = {
                name: body.name,
                courseTypes: body.courseTypes
            };
            return programMajor_1.service.create(programMajorData);
        });
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
    actionUpdate(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = actionContext.request.body;
            const programMajorData = {
                name: body.name,
                courseTypes: body.courseTypes
            };
            return programMajor_1.service.update(Number(id), programMajorData);
        });
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
    actionDelete(actionContext, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return programMajor_1.service.delete(Number(id));
        });
    }
}
exports.ProgramMajorAdminController = ProgramMajorAdminController;
