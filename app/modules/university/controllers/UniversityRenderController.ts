import {LegacyController} from '../../../../api/components/interface';

const Controller: LegacyController = require('nodules/controller').Controller;

import {userService} from '../../user/services/user';

import {universityRenderHomeView} from '../views/universityRenderHomeView';

const soy = require('../../../components/soy');
const config = require('../../../config/config.json');

class UnivrersityRenderController extends Controller {
    constructor() {
        super();
    }

    public async actionGetHome(actionContext: any) {
        const user = userService.getUserFromRequest(actionContext.request);

        const templateParams = universityRenderHomeView.render({
            data: {
                favorites: []
            },
            config: config,
            requestData: {
                user: user,
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
