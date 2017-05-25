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
const subscriptionService_1 = require("../services/subscriptionService");
const Controller = require('nodules/controller').Controller;
const InvalidEmail_1 = require("./errors/InvalidEmail");
const MailChimpErrorTitle_1 = require("../constants/MailChimpErrorTitle");
class SubscriptionController extends Controller {
    constructor() {
        super();
        this.errors = {
            InvalidEmailException: InvalidEmail_1.InvalidEmail
        };
    }
    /**
     * @apiDefine EmailAlreadyExistError
     * @apiError (409) EmailAlreadyExistError Email already exist
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 409 Conflict
     *      [{
     *           "code": "EmailAlreadyExist",
     *           "message": "Данный email уже зарегистрирован"
     *      }]
     */
    /**
     * @apiDefine InvalidEmailError
     * @apiError (422) InvalidEmailError Invalid email
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Unprocessable Entity
     *      [{
     *           "code": "InvalidEmail",
     *           "message": "Некорректный email"
     *      }]
     */
    /**
     * @apiDefine InvalidEmailError
     * @apiError (422) InvalidEmailError Invalid email
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 422 Unprocessable Entity
     *      [{
     *           "code": "InvalidEmail",
     *           "message": "Некорректный email"
     *      }]
     */
    /**
     * @api {post} /program/subscribe Add subscriber
     * @apiVersion 1.0.0
     * @apiName addSubscriber
     *
     * @apiSuccess {Object} subscriber
     * @apiSuccess {Number} subscriber.id
     * @apiSuccess {String} subscriber.email
     * @apiSuccess {String} subscriber.status
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "id": "76234da8e",
     *         "email": "123qwe@yandex.ru",
     *         "status": "subscribed"
     *     }
     *
     * @apiUse InvalidEmailError
     */
    actionCreate(actionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = actionContext.data.id;
            const email = actionContext.data.email;
            let result = yield subscriptionService_1.service.create(id, email);
            if (result === MailChimpErrorTitle_1.MailChimpErrorTitle.EMAIL_EXIST) {
                const subscribers = yield subscriptionService_1.service.getList();
                const subscriber = subscribers.data.members
                    .find(subscriber => subscriber['email_address'] === email);
                subscriber['merge_fields']['PROGRAM_LI'] += `, ${id}`;
                result = yield subscriptionService_1.service.update(subscriber.id, subscriber['merge_fields']['PROGRAM_LI']);
            }
            return {
                id: result.data.id,
                email: result.data['email_address'],
                status: result.data.status
            };
        });
    }
}
exports.SubscriptionController = SubscriptionController;
