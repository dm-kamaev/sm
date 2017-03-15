/**
 * @fileOverview New comment notifier for universities
 */

import {NewCommentNotifier} from './NewCommentNotifier';

const entityType = require('../../../api/modules/entity/enums/entityType');
const config = require('../../../app/config/config.json');

import {
    service as universityCommentService
} from '../../../api/modules/comment/services/universityComment';
import {
    UniversityCommentAttributes
} from '../../../api/modules/comment/types/universityComment';

import {
    service as programService
} from '../../../api/modules/university/services/program';
import {
    ProgramAttribute
} from '../../../api/modules/university/types/program';

class UniversityNewCommentNotifier extends NewCommentNotifier {
    constructor() {
        super();

        this.email = config.commentNotifications.universities;

        this.entityType = entityType.UNIVERSITY;
    }

    protected async getNotNotifiedComments():
            Promise<UniversityCommentAttributes> {
        return await universityCommentService.getNotNotified();
    }

    protected async getEntityByComment(
        comment: UniversityCommentAttributes): Promise<ProgramAttribute> {
        return await programService.getByCommentGroup(comment.commentGroupId);
    };

    protected async getEntityLink(entity: ProgramAttribute): Promise<string> {
        const alias = await this.getEntityAlias(entity);
        return `${config.protocol}://${config.universities.host}/` +
            `link%to%program/${alias}`;
    }

    protected getFormattedCommentText(
            comment: UniversityCommentAttributes): string {
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

    protected getCommentEditLink(
            comment: UniversityCommentAttributes, entity: ProgramAttribute
    ): string {
        return `http://link%to%comment`;
    }

    protected async setSentNotificationState(
            comment: UniversityCommentAttributes): Promise<void> {
        await universityCommentService.updateById(comment.id, {
            isNoticeSend: true
        });
    }

    protected getRawCommentText(comment: UniversityCommentAttributes): string {
        return `${comment.pros} ${comment.cons} ${comment.advice}`;
    }
}

export {UniversityNewCommentNotifier};
