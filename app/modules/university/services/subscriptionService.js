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
const mailChimp = require('../../../config/config.json').mailChimp;
const mailChimpUrl = `https://${mailChimp.dc}.api.mailchimp.com/3.0` +
    `/lists/${mailChimp.listId}/members`;
const MailChimpErrorTitle_1 = require("../constants/MailChimpErrorTitle");
const InvalidEmail_1 = require("./exceptions/InvalidEmail");
const Service_1 = require("../../common/services/Service");
class SubscriptionService extends Service_1.Service {
    constructor() {
        super();
    }
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: mailChimpUrl,
                method: 'get',
                auth: {
                    username: mailChimp.name,
                    password: mailChimp.password
                }
            };
            return yield this.send(params);
        });
    }
    create(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: mailChimpUrl,
                method: 'post',
                data: {
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                        PROGRAM_LI: id.toString()
                    }
                },
                auth: {
                    username: mailChimp.name,
                    password: mailChimp.password
                }
            };
            return yield this.send(params);
        });
    }
    update(id, programList) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                url: mailChimpUrl + `/${id}`,
                method: 'put',
                data: {
                    merge_fields: {
                        PROGRAM_LI: programList
                    }
                },
                auth: {
                    username: mailChimp.name,
                    password: mailChimp.password
                }
            };
            return yield this.send(params);
        });
    }
    handleError(error) {
        switch (error.data.title) {
            case MailChimpErrorTitle_1.MailChimpErrorTitle.INVALID_RESOURSE:
                throw new InvalidEmail_1.InvalidEmail();
            case MailChimpErrorTitle_1.MailChimpErrorTitle.EMAIL_EXIST:
                return MailChimpErrorTitle_1.MailChimpErrorTitle.EMAIL_EXIST;
            default:
                throw error;
        }
    }
}
exports.service = new SubscriptionService();
