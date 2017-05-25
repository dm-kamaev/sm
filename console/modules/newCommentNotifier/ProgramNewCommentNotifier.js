"use strict";
/**
 * @fileOverview New comment notifier for universities
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NewCommentNotifier_1 = require("./NewCommentNotifier");
const entityType = require('../../../api/modules/entity/enums/entityType');
const config = require('../../../app/config/config.json');
const adminConfig = require('../../../app/config/admin.json');
const programComment_1 = require("../../../api/modules/comment/services/programComment");
const program_1 = require("../../../api/modules/university/services/program");
class ProgramNewCommentNotifier extends NewCommentNotifier_1.NewCommentNotifier {
    constructor() {
        super();
        this.email = config.notifications.universities;
        this.entityType = entityType.UNIVERSITY;
    }
    getNotNotifiedComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield programComment_1.service.getNotNotified();
        });
    }
    getEntityByComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield program_1.service.getByCommentGroup(comment.commentGroupId);
        });
    }
    getEntityAlias(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield program_1.service.getUrl(entity);
        });
    }
    getEntityLink(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = yield this.getEntityAlias(entity);
            return `${config.protocol}://${config.universities.host}/${alias}`;
        });
    }
    getFormattedCommentText(comment) {
        let formattedText = '';
        if (comment.pros) {
            formattedText +=
                `<b>Что понравилось:</b><br />${comment.pros}<br />`;
        }
        if (comment.cons) {
            formattedText +=
                `<b>Что не понравилось:</b><br />${comment.cons}<br />`;
        }
        if (comment.advice) {
            formattedText +=
                `<b>Совет:</b><br />${comment.advice}<br />`;
        }
        return formattedText;
    }
    getCommentEditLink(comment, entity) {
        return `${config.protocol}://${adminConfig.host}/universities/` +
            `programs/${entity.id}/comments/${comment.id}/update`;
    }
    setSentNotificationState(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield programComment_1.service.updateById(comment.id, {
                isNoticeSend: true
            });
        });
    }
    getRawCommentText(comment) {
        return `${comment.pros} ${comment.cons} ${comment.advice}`;
    }
}
exports.ProgramNewCommentNotifier = ProgramNewCommentNotifier;
