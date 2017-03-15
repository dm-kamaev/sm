/**
 * @fileOverview New comment notifier for schools
 */
import {NewCommentNotifier} from './NewCommentNotifier';

const entityType = require('../../../api/modules/entity/enums/entityType');
const config = require('../../../app/config/config.json');
const adminConfig = require('../../../app/config/admin.json');

const commentService = require('../../../api/modules/comment/services/comment');
const schoolService = require('../../../api/modules/school/services/school');

import {CommentAttributes} from '../../../api/modules/comment/types/comment';
import {SchoolAttribute} from '../../../api/modules/school/models/school';

class SchoolNewCommentNotifier extends NewCommentNotifier {
    constructor() {
        super();

        this.email = config.commentNotifications.schools;

        this.entityType = entityType.SCHOOL;
    }

    protected async getNotNotifiedComments():
            Promise<Array<CommentAttributes>> {
        return await commentService.getNotSended();
    }

    protected async getEntityByComment(
            comment: CommentAttributes): Promise<SchoolAttribute> {
        return await schoolService.getSchoolByGrouId(comment.groupId);
    };

    protected async getEntityLink(entity: SchoolAttribute): Promise<string> {
        const alias = await this.getEntityAlias(entity);
        return `${config.protocol}://${config.schools.host}/school/${alias}`;
    }

    protected getFormattedCommentText(comment: CommentAttributes): string {
        return comment.text;
    }

    protected async setSentNotificationState(comment: CommentAttributes) {
        return await commentService.update(comment.id, {
            isNoticeSend: true
        });
    }

    protected getCommentEditLink(comment, entity): string {
        return `${config.protocol}://${adminConfig.host}` +
            `/schools/schools/${entity.id}` +
            `/comments/${comment.id}/update`;
    }

    protected getRawCommentText(comment: CommentAttributes): string {
        return comment.text;
    }
}

export {SchoolNewCommentNotifier};
