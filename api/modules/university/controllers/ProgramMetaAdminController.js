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
const programMeta_1 = require("../services/programMeta");
const programMeta_2 = require("../views/programMeta");
const page_1 = require("../../entity/services/page");
const entityTypes = require('../../entity/enums/entityType.js');
const ProgramNotFound_1 = require("./errors/ProgramNotFound");
class ProgramMetaAdminController extends Controller {
    constructor() {
        super();
        this.errors = {
            ProgramNotFoundException: ProgramNotFound_1.ProgramNotFound
        };
    }
    /**
     * @api {get} /api/admin/program/:programId/pagemeta/:id
     *     Get program meta by program id
     * @apiVersion 1.0.0
     * @apiName getProgramMeta
     * @apiGroup Admin Program Meta
     *
     * @apiParam {Number}     programId             Program's id
     * @apiParam {Number}     id                    Program's meta id
     *
     * @apiSuccess {Number}   id                    Id.
     * @apiSuccess {Number}   programId             Program's id.
     * @apiSuccess {String}   keywords              Keywords
     * @apiSuccess {String}   tabTitle              h1.
     * @apiSuccess {String}   seoDescription        Meta description.
     * @apiSuccess {String}   openGraphDescription  Open graph description.
     * @apiSuccess {String}   createdAt             Created at.
     * @apiSuccess {String}   updatedAt             Updated at.
     * @apiSuccess {String}   url                   Url for program
     *
     * @apiSuccessExample {json} Success-Response:
     *    {
     *        "id": 5,
     *        "programId": 12,
     *        "keywords": "test_keywords",
     *        "tabTitle": "test_title",
     *        "seoDescription": "test_description",
     *        "openGraphDescription": "open_graph_description",
     *        "createdAt": "2017-03-28T07:27:40.260Z",
     *        "updatedAt": "2017-03-28T07:27:40.260Z",
     *        "url": "prikladnaya-matematika"
     *    }
     * @apiError (404) ProgramNotFound Program with given Id not found.
     *
     */
    actionGet(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const intProgramId = parseInt(programId, 10);
            const programMetaId = parseInt(id, 10);
            const programMeta = (yield programMeta_1.programMetaService.get(programMetaId)) || {};
            const page = yield page_1.service.getOne(intProgramId, entityTypes.PROGRAM);
            const alias = (page) ? page.alias : '';
            return programMeta_2.programMetaView.render(programMeta, alias);
        });
    }
    /**
    * @api {post} /api/admin/program/:programId/pagemeta
    * Update program meta
    * @apiVersion 1.0.0
    * @apiName updateProgramMeta
    * @apiGroup Admin Program Meta
    *
    * @apiParam {Number} id   Program's id
    * @apiParamExample {json} Request-Example:
    *    {
    *        "url": "prikladnaya-matematika1",
    *        "keywords": "test_keywords",
    *        "tabTitle": "test_title",
    *        "seoDescription": "test_description",
    *        "openGraphDescription": "open_graph_description"
    *    }
    * @apiParam {String}   url                   Url for program
    * @apiParam {String}   keywords              Keywords
    * @apiParam {String}   tabTitle              h1.
    * @apiParam {String}   seoDescription        Meta description.
    * @apiParam {String}   openGraphDescription  Open graph description.
    *
    * @apiSuccess {Number}   id                    Id.
    * @apiSuccess {Number}   programId             Program's id.
    * @apiSuccess {String}   keywords              Keywords
    * @apiSuccess {String}   tabTitle              h1.
    * @apiSuccess {String}   seoDescription        Meta description.
    * @apiSuccess {String}   openGraphDescription  Open graph description.
    * @apiSuccess {String}   createdAt             Created at.
    * @apiSuccess {String}   updatedAt             Updated at.
    * @apiSuccess {String}   url                   Url for program
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 5,
    *        "program_id": 12,
    *        "keywords": "test_keywords",
    *        "created_at": "2017-03-28T07:27:40.260Z",
    *        "updated_at": "2017-03-28T09:06:33.269Z",
    *        "tabTitle": "test_title",
    *        "seoDescription": "test_description",
    *        "openGraphDescription": "open_graph_description"
    *    }
    */
    actionCreate(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = actionContext.request;
            const body = request.body || {};
            const programId = request.params.programId;
            let url = '';
            if (body.url) {
                url = body.url
                    .replace(/[а-я]/ig, '')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
            const programMetaData = {
                url,
                keywords: body.keywords,
                tabTitle: body.tabTitle,
                seoDescription: body.seoDescription,
                openGraphDescription: body.openGraphDescription,
            };
            return yield programMeta_1.programMetaService.create(programMetaData, programId);
        });
    }
    /**
    * @api {put} /api/admin/program/:programId/pagemeta/:id
    * Update program meta
    * @apiVersion 1.0.0
    * @apiName updateProgramMeta
    * @apiGroup Admin Program Meta
    *
    * @apiParam {Number} id   Program's meta id
    * @apiParamExample {json} Request-Example:
    *    {
    *        "url": "prikladnaya-matematika1",
    *        "keywords": "test_keywords",
    *        "tabTitle": "test_title",
    *        "seoDescription": "test_description",
    *        "openGraphDescription": "open_graph_description"
    *    }
    * @apiParam {String}   url                   Url for program
    * @apiParam {String}   keywords              Keywords
    * @apiParam {String}   tabTitle              h1.
    * @apiParam {String}   seoDescription        Meta description.
    * @apiParam {String}   openGraphDescription  Open graph description.
    *
    * @apiSuccess {Number}   id                    Id.
    * @apiSuccess {Number}   programId             Program's id.
    * @apiSuccess {String}   keywords              Keywords
    * @apiSuccess {String}   tabTitle              h1.
    * @apiSuccess {String}   seoDescription        Meta description.
    * @apiSuccess {String}   openGraphDescription  Open graph description.
    * @apiSuccess {String}   createdAt             Created at.
    * @apiSuccess {String}   updatedAt             Updated at.
    * @apiSuccess {String}   url                   Url for program
    *
    * @apiSuccessExample {json} Example response:
    *    {
    *        "id": 5,
    *        "program_id": 12,
    *        "keywords": "test_keywords",
    *        "created_at": "2017-03-28T07:27:40.260Z",
    *        "updated_at": "2017-03-28T09:06:33.269Z",
    *        "tabTitle": "test_title",
    *        "seoDescription": "test_description",
    *        "openGraphDescription": "open_graph_description"
    *    }
    */
    actionUpdate(actionContext, programId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const intProgramId = parseInt(programId, 10);
            const programMetaId = parseInt(id, 10);
            const request = actionContext.request;
            const body = request.body || {};
            let url = '';
            if (body.url) {
                url = body.url
                    .replace(/[а-я]/ig, '')
                    .replace(/\s+/g, ' ')
                    .trim();
            }
            const programMetaData = {
                url,
                keywords: body.keywords,
                tabTitle: body.tabTitle,
                seoDescription: body.seoDescription,
                openGraphDescription: body.openGraphDescription,
            };
            return yield programMeta_1.programMetaService.update(intProgramId, programMetaId, programMetaData);
        });
    }
}
exports.ProgramMetaAdminController = ProgramMetaAdminController;
