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
/**
 * @fileOverview New comment notifier for schools
 */
const NewCommentNotifier_1 = require("./NewCommentNotifier");
const entityType = require('../../../api/modules/entity/enums/entityType');
const config = require('../../../app/config/config.json');
const adminConfig = require('../../../app/config/admin.json');
const commentService = require('../../../api/modules/comment/services/comment');
const schoolService = require('../../../api/modules/school/services/school');
class SchoolNewCommentNotifier extends NewCommentNotifier_1.NewCommentNotifier {
    constructor() {
        super();
        this.email = config.notifications.schools;
        this.entityType = entityType.SCHOOL;
    }
    getNotNotifiedComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentService.getNotSended();
        });
    }
    getEntityByComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schoolService.getSchoolByGrouId(comment.groupId);
        });
    }
    ;
    getEntityLink(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const alias = yield this.getEntityAlias(entity);
            return `${config.protocol}://${config.schools.host}/school/${alias}`;
        });
    }
    getFormattedCommentText(comment) {
        return comment.text;
    }
    setSentNotificationState(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentService.update(comment.id, {
                isNoticeSend: true
            });
        });
    }
    getCommentEditLink(comment, entity) {
        return `${config.protocol}://${adminConfig.host}` +
            `/schools/schools/${entity.id}` +
            `/comments/${comment.id}/update`;
    }
    getRawCommentText(comment) {
        return comment.text;
    }
}
exports.SchoolNewCommentNotifier = SchoolNewCommentNotifier;
