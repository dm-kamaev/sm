/**
 * @fileoverview Controller for course page meta
 */
import {LegacyController} from '../../../components/interface';
const Controller: LegacyController = require('nodules/controller').Controller;

import {service as coursePageMetaService} from '../services/coursePageMeta';

import {PageMetaNotBelongsToCourse} from './errors/PageMetaNotBelongToCourse'
import {CoursePageMetaAlreadyExists}
    from './errors/CoursePageMetaAlreadyExists';

class CoursePageMetaController extends Controller {
    constructor() {
        super();

        /**
         * Possible errors
         */
        this.errors = {
            PageMetaNotBelongsToCourse,
            CoursePageMetaAlreadyExists
        };
    }

    /**
     * @apiDefine CoursePageMetaAlreadyExistsError
     * @apiError (422) CoursePageMetaAlreadyExists Course page already have
     * meta information
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "CoursePageMetaAlreadyExists",
     *           "message": "Course page already have meta information"
     *      }
     */

    /**
     * @apiDefine PageMetaNotBelongToCourseError
     * @apiError (422) PageMetaNotBelongToCourse Given id of course page meta
     * information not belongs to course with given id
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {
     *           "code": "PageMetaNotBelongToCourse",
     *           "message":
     *               "Given course page meta information not belongs to course"
     *      }
     */

    /**
     * @api {get} /course/:courseId/pagemeta/:id
     *     Get one page meta for course with given id
     * @apiVersion 0.1.0
     * @apiName getCoursePageMeta
     * @apiGroup CoursePageMeta
     *
     * @apiSuccess {Object} coursePageMeta
     * @apiSuccess {String} coursePageMeta.tabTitle             Tab title of
     *     course page
     * @apiSuccess {String} coursePageMeta.seoDescription       Meta tag
     *     description of course page
     * @apiSuccess {String} coursePageMeta.openGraphTitle       Open graph title
     *     of course page
     * @apiSuccess {String} coursePageMeta.openGraphDescription Open graph
     *     description of course page
     * @apiSuccess {String} coursePageMeta.relapTag             Relap tag of
     *     course page
     * @apiSuccess {String} coursePageMeta.shareImageUrl        Sharing image of
     *     course page
     *
     * @apiSuccessExample Success-Responce:
     *     HTTP 1/1 200 OK
     *     {
     *         id: 10,
     *         tabTitle: "Курсы мела",
     *         seoDescription: "Лучшие курсы Мела. Цены, описание отзывы",
     *         openGraphTitle: "Курсы мела",
     *         openGraphDescription: "Лучшие курсы Школ Мела",
     *         relapTag: "Профориентация",
     *         shareImageUrl: "/static/images/abc.png"
     *     }
     *
     * @apiUse PageMetaNotBelongToCourseError
     */
    public async actionGet(
        actionContext: any, courseId: number, pageMetaId: number) {
        return await coursePageMetaService.getOne(courseId, pageMetaId);
    }

    /**
     * @api {post} /course/:courseId/pagemeta/
     *     Create page meta for course with given id
     * @apiVersion 0.1.0
     * @apiName createCoursePageMeta
     * @apiGroup CoursePageMeta
     *
     * @apiParam {Object} coursePageMeta
     * @apiParam {String} coursePageMeta.tabTitle             Tab title of
     *     course page
     * @apiParam {String} coursePageMeta.seoDescription       Meta tag
     *     description of course page
     * @apiParam {String} coursePageMeta.openGraphTitle       Open graph title
     *     of course page
     * @apiParam {String} coursePageMeta.openGraphDescription Open graph
     *     description of course page
     * @apiParam {String} coursePageMeta.relapTag             Relap tag of
     *     course page
     * @apiParam {String} coursePageMeta.shareImageUrl        Sharing image of
     *     course page
     *
     * @apiParamExample Request-Example:
     *     {
     *         tabTitle: "Курсы мела",
     *         seoDescription: "Лучшие курсы Мела. Цены, описание отзывы",
     *         openGraphTitle: "Курсы мела",
     *         openGraphDescription: "Лучшие курсы Школ Мела",
     *         relapTag: "Профориентация",
     *         shareImageUrl: "/static/images/abc.png"
     *     }
     *
     * @apiSuccess {Object} coursePageMeta
     * @apiSuccess {String} coursePageMeta.tabTitle             Tab title of
     *     course page
     * @apiSuccess {String} coursePageMeta.seoDescription       Meta tag
     *     description of course page
     * @apiSuccess {String} coursePageMeta.openGraphTitle       Open graph title
     *     of course page
     * @apiSuccess {String} coursePageMeta.openGraphDescription Open graph
     *     description of course page
     * @apiSuccess {String} coursePageMeta.relapTag             Relap tag of
     *     course page
     * @apiSuccess {String} coursePageMeta.shareImageUrl        Sharing image of
     *     course page
     *
     * @apiSuccessExample Success-Responce:
     *     HTTP 1/1 200 OK
     *     {
     *         id: 10,
     *         tabTitle: "Курсы мела",
     *         seoDescription: "Лучшие курсы Мела. Цены, описание отзывы",
     *         openGraphTitle: "Курсы мела",
     *         openGraphDescription: "Лучшие курсы Школ Мела",
     *         relapTag: "Профориентация",
     *         shareImageUrl: "/static/images/abc.png"
     *     }
     *
     * @apiUse CoursePageMetaAlreadyExistsError
     */
    public async actionCreate(actionContext: any, courseId: number) {
        const data = actionContext.data;
        console.log(actionContext.data);
        return await coursePageMetaService.create(
            courseId,
            {
                tabTitle: data.tabTitle,
                seoDescription: data.seoDescription,
                openGraphTitle: data.openGraphTitle,
                openGraphDescription: data.openGraphDescription,
                relapTag: data.relapTag,
                shareImageUrl: data.shareImageUrl
            });
    }

    /**
     * @api {put} /course/:courseId/pagemeta/:id
     *     Update page meta for course with given id
     * @apiVersion 0.1.0
     * @apiName updateCoursePageMeta
     * @apiGroup CoursePageMeta
     *
     * @apiParam {Object} coursePageMeta
     * @apiParam {String} coursePageMeta.tabTitle             Tab title of
     *     course page
     * @apiParam {String} coursePageMeta.seoDescription       Meta tag
     *     description of course page
     * @apiParam {String} coursePageMeta.openGraphTitle       Open graph title
     *     of course page
     * @apiParam {String} coursePageMeta.openGraphDescription Open graph
     *     description of course page
     * @apiParam {String} coursePageMeta.relapTag             Relap tag of
     *     course page
     * @apiParam {String} coursePageMeta.shareImageUrl        Sharing image of
     *     course page
     *
     * @apiParamExample Request-Example:
     *     {
     *         tabTitle: "Курсы мела",
     *         seoDescription: "Лучшие курсы Мела. Цены, описание отзывы",
     *         openGraphTitle: "Курсы мела",
     *         openGraphDescription: "Лучшие курсы Школ Мела",
     *         relapTag: "Профориентация",
     *         shareImageUrl: "/static/images/abc.png"
     *     }
     *
     * @apiSuccess {Object} coursePageMeta
     * @apiSuccess {String} coursePageMeta.tabTitle             Tab title of
     *     course page
     * @apiSuccess {String} coursePageMeta.seoDescription       Meta tag
     *     description of course page
     * @apiSuccess {String} coursePageMeta.openGraphTitle       Open graph title
     *     of course page
     * @apiSuccess {String} coursePageMeta.openGraphDescription Open graph
     *     description of course page
     * @apiSuccess {String} coursePageMeta.relapTag             Relap tag of
     *     course page
     * @apiSuccess {String} coursePageMeta.shareImageUrl        Sharing image of
     *     course page
     *
     * @apiSuccessExample Success-Responce:
     *     HTTP 1/1 200 OK
     *     {
     *         id: 10,
     *         tabTitle: "Курсы мела",
     *         seoDescription: "Лучшие курсы Мела. Цены, описание отзывы",
     *         openGraphTitle: "Курсы мела",
     *         openGraphDescription: "Лучшие курсы Школ Мела",
     *         relapTag: "Профориентация",
     *         shareImageUrl: "/static/images/abc.png"
     *     }
     *
     * @apiUse PageMetaNotBelongToCourseError
     */
    public async actionUpdate(
            actionContext: any, courseId: number, pageMetaId: number) {
        const data = actionContext.data;
        return await coursePageMetaService.update(
            courseId,
            pageMetaId,
            {
                tabTitle: data.tabTitle,
                seoDescription: data.seoDescription,
                openGraphTitle: data.openGraphTitle,
                openGraphDescription: data.openGraphDescription,
                relapTag: data.relapTag,
                shareImageUrl: data.shareImageUrl
            });
    }

    /**
     * @api {delete} /course/:courseId/pagemeta/:id
     *
     * @apiSuccessExample Success-Responce:
     *     HTTP 1/1 404 OK
     */
    public async actionDelete(actionContext) {
        actionContext.status = 404;
    }

    /**
     * @api {delete} /course/:courseId/pagemeta
     *
     * @apiSuccessExample Success-Responce:
     *     HTTP 1/1 404 OK
     *
     */
    public async actionList(actionContext) {
        actionContext.status = 404;
    }
}

export {CoursePageMetaController};
