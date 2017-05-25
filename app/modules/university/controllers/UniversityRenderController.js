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
const user_1 = require("../../user/services/user");
const egeExamService_1 = require("../services/egeExamService");
const popularUniversitiesService_1 = require("../services/popularUniversitiesService");
const universityRenderHomeView_1 = require("../views/universityRenderHomeView");
const soy = require('../../../components/soy');
const config = require('../../../config/config.json');
class UnivrersityRenderController extends Controller {
    constructor() {
        super();
    }
    actionGetHome(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_1.userService.getUserFromRequest(actionContext.request);
            const ege = yield egeExamService_1.egeExamService.getExams();
            const populars = yield popularUniversitiesService_1.popularUniversitiesService.getPopulars();
            const templateParams = universityRenderHomeView_1.universityRenderHomeView.render({
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
            return soy.render('sm.lHomeUniversity.Template.homeUniversity', {
                params: templateParams
            });
        });
    }
}
exports.UnivrersityRenderController = UnivrersityRenderController;
