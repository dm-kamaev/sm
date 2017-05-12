import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {userService} from '../../user/services/user';
import {egeExamService} from '../services/egeExamService';
import {
    popularUniversitiesService
} from '../services/popularUniversitiesService';


import {universityRenderHomeView} from '../views/universityRenderHomeView';

const soy = require('../../../components/soy');
const config = require('../../../config/config.json');

class UnivrersityRenderController extends Controller {
    constructor() {
        super();
    }

    public async actionGetHome(actionContext: any) {
        const user = userService.getUserFromRequest(actionContext.request);
        const ege = await egeExamService.getExams();
        const populars = await popularUniversitiesService.getPopulars();

        const templateParams = universityRenderHomeView.render({
            data: {
                ege,
                favorites: [],
                populars
            },
            config: config,
            requestData: {
                user,
                query: actionContext.request.query,
                csrf: actionContext.request.csrfToken()
            },
        });

        return soy.render(
            'sm.lHomeUniversity.Template.homeUniversity', {
                params: templateParams
            }
        );
    }
}

export {UnivrersityRenderController};
