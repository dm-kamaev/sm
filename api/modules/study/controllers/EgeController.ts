import {LegacyController} from '../../../components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {egeService} from '../services/ege';

export class EgeController extends Controller {
    /**
     * @api {get} /api/subject/ege Get all ege subjects sorted by json.
     * @apiVersion 1.0.0
     * @apiName GetEgeSubjects
     * @apiGroup Ege
     *
     * @apiParam (query) {String="general","university"} [type="general"]
     *     Type of ege subjects: general or university.
     *
     * @apiSuccess {Object[]} - Response body.
     * @apiSuccess {Number}   -.id Subject's id.
     * @apiSuccess {String}   -.name Lowercase name.
     * @apiSuccess {String}   -.displayName Usual name.
     * @apiSuccess {String}   -.alias Transliterated name.
     * @apiSuccess {String}   -.created_at Created at.
     * @apiSuccess {String}   -.updated_at Updated at.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *         {
     *             "id": 1,
     *             "name": "математика",
     *             "displayName": "Математика",
     *             "alias": "math",
     *             "created_at": "2016-02-27T11:37:21.430Z",
     *             "updated_at": "2016-04-08T10:58:03.376Z"
     *         }, {
     *             "id": 37,
     *             "name": "русский язык",
     *             "displayName": "Русский язык",
     *             "alias": "russian",
     *             "created_at": "2016-02-27T11:37:21.430Z",
     *             "updated_at": "2016-04-08T10:58:03.448Z"
     *         }
     *     }]
     */
    public async actionGetAllSorted(actionContext: any) {
        const type = actionContext.data.type;
        return egeService.getAllOrdered(type);
    }
}
