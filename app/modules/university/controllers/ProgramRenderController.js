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
const programService_1 = require("../services/programService");
const universityService_1 = require("../services/universityService");
const EntranceStatisticService_1 = require("../services/EntranceStatisticService");
const user_1 = require("../../user/services/user");
const egeExamService_1 = require("../services/egeExamService");
const ProgramComment_1 = require("../../comment/services/ProgramComment");
const SimilarProgramsService_1 = require("../services/SimilarProgramsService");
const programMajorService_1 = require("../services/programMajorService");
const programMetaService_1 = require("../services/programMetaService");
const searchService_1 = require("../services/searchService");
const cityService_1 = require("../../geo/services/cityService");
const majorService_1 = require("../services/majorService");
const informationView_1 = require("../views/informationView");
const programSearchView_1 = require("../views/programSearchView");
const programRenderSearchView_1 = require("../views/programRenderSearchView");
const soy = require('../../../components/soy');
const config = require('../../../config/config.json');
const entityType = require('../../../../api/modules/entity/enums/entityType.js');
const LIMIT = 10;
class ProgramRenderController extends Controller {
    constructor() {
        super();
    }
    actionGetInformation(actionContext, universityAlias, programAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_1.userService.getUserFromRequest(actionContext.request);
            const [universityId, programId] = yield Promise.all([
                universityService_1.universityService.getIdByAlias(universityAlias),
                programService_1.programService.getIdByAlias(programAlias, universityAlias)
            ]);
            const entranceStatisticService = new EntranceStatisticService_1.EntranceStatisticService(programId);
            const similarProgramsService = new SimilarProgramsService_1.SimilarProgramsService(programId);
            const programCommentService = new ProgramComment_1.ProgramCommentService(programId);
            const [program, university, entranceStatistic, comments, egeExams, pageMeta, similarPrograms] = yield Promise.all([
                programService_1.programService.getById(programId),
                universityService_1.universityService.getById(universityId),
                entranceStatisticService.getLast(),
                programCommentService.getComments(),
                egeExamService_1.egeExamService.getProgramExams(programId),
                programMetaService_1.programMetaService.getById(programId),
                similarProgramsService.getSimilar()
            ]);
            const usefulCourses = yield programMajorService_1.programMajorService.getAdvicedCourses(program.programMajor.id);
            const userComment = programCommentService.getUserComment(user, comments);
            const users = yield user_1.userService.getById(comments.map(comment => comment.userId));
            const templateParams = informationView_1.informationView.render({
                data: {
                    program,
                    university,
                    entranceStatistic,
                    comments,
                    egeExams,
                    pageMeta,
                    userComment,
                    users,
                    similarPrograms,
                    usefulCourses,
                    favorites: []
                },
                config: config,
                requestData: {
                    user: user,
                    query: actionContext.request.query,
                    csrf: actionContext.request.csrfToken()
                },
            });
            return soy.render('sm.lUniversity.Template.university', {
                params: templateParams
            });
        });
    }
    actionGetSearch(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_1.userService.getUserFromRequest(actionContext.request);
            const queryParams = actionContext.request.query;
            const egeExams = yield egeExamService_1.egeExamService.getExams();
            const searchParams = programSearchView_1.programSearchView.initSearchParams(queryParams, { egeExams });
            const [resultsList, cities, majors] = yield Promise.all([
                searchService_1.searchService.findByParams(searchParams, LIMIT),
                cityService_1.cityService.getAllSortedByProgramCount(),
                majorService_1.majorService.getPopular()
            ]);
            const templateParams = programRenderSearchView_1.programRenderSearchView.render({
                data: {
                    resultsList,
                    cities,
                    egeExams,
                    majors,
                    searchParams,
                    favorites: []
                },
                config: config,
                requestData: {
                    user: user,
                    query: actionContext.request.query,
                    csrf: actionContext.request.csrfToken()
                }
            });
            return soy.render('sm.lSearch.TemplateUniversity.search', {
                params: templateParams
            });
        });
    }
}
exports.ProgramRenderController = ProgramRenderController;
