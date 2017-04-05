import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {programMetaService} from '../services/programMeta';
import {programMetaView} from '../views/programMeta';
import {service as pageService} from '../../entity/services/page';
import {PageIntstance, PageAttribute} from '../../entity/types/page';
import {
    ProgramPageMetaInformationInstance,
    ProgramMetaAdmin,
} from '../types/programPageMetaInformation';
const entityTypes = require('../../entity/enums/entityType.js');
import {ProgramNotFound} from './errors/ProgramNotFound';

class ProgramMetaAdminController extends Controller {
    constructor() {
        super();

        this.errors = {
            ProgramNotFoundException: ProgramNotFound
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
    public async actionGet(actionContext: any, programId: string, id: string) {
        const intProgramId: number = parseInt(programId, 10);
        const programMetaId: number = parseInt(id, 10);

        const programMeta: ProgramPageMetaInformationInstance | {}
            = await programMetaService.get(programMetaId) || {};

        const page: PageIntstance | null
            = await pageService.getOne(intProgramId, entityTypes.PROGRAM);
        const alias: string = (page) ? (page as PageIntstance).alias : '';

        return programMetaView.render(programMeta, alias);
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
    public async actionCreate(actionContext: any) {
        const request = actionContext.request;
        const body = request.body || {};
        const programId = request.params.programId;
        let url: string = '';
        if (body.url) {
            url = body.url
                      .replace(/[а-я]/ig, '')
                      .replace(/\s+/g, ' ')
                      .trim();
        }
        const programMetaData: ProgramMetaAdmin = {
            url,
            keywords: body.keywords,
            tabTitle: body.tabTitle,
            seoDescription: body.seoDescription,
            openGraphDescription: body.openGraphDescription,
        };
        return await programMetaService.create(programMetaData, programId);
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
    public async actionUpdate(
        actionContext: any,
        programId: string,
        id: string
    ) {
        const intProgramId: number = parseInt(programId, 10);
        const programMetaId: number = parseInt(id, 10);
        const request = actionContext.request;
        const body = request.body || {};
        let url: string = '';
        if (body.url) {
            url = body.url
                      .replace(/[а-я]/ig, '')
                      .replace(/\s+/g, ' ')
                      .trim();
        }
        const programMetaData: ProgramMetaAdmin = {
            url,
            keywords: body.keywords,
            tabTitle: body.tabTitle,
            seoDescription: body.seoDescription,
            openGraphDescription: body.openGraphDescription,
        };
        return await programMetaService.update(
            intProgramId,
            programMetaId,
            programMetaData
        );
    }


}

export {ProgramMetaAdminController};
