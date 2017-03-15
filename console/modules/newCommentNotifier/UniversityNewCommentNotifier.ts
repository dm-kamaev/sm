/**
 * @fileOverview New comment notifier for universities
 */

import {NewCommentNotifier} from './NewCommentNotifier';

const entityType = require('../../../api/modules/entity/enums/entityType');
const config = require('../../../app/config/config.json');

import {
    service as programCommentService
} from '../../../api/modules/comment/services/programComment';
import {
    ProgramCommentAttributes
} from '../../../api/modules/comment/types/programComment';

import {
    service as programService
} from '../../../api/modules/university/services/program';
import {
    ProgramAttribute
} from '../../../api/modules/university/types/program';

class UniversityNewCommentNotifier extends NewCommentNotifier {
    constructor() {
        super();

        this.email = config.notifications.universities;

        this.entityType = entityType.UNIVERSITY;
    }

    protected async getNotNotifiedComments():
            Promise<ProgramCommentAttributes> {
        return await programCommentService.getNotNotified();
    }

    protected async getEntityByComment(
        comment: ProgramCommentAttributes): Promise<ProgramAttribute> {
        return await programService.getByCommentGroup(comment.commentGroupId);
    };

    protected async getEntityLink(entity: ProgramAttribute): Promise<string> {
        const alias = await this.getEntityAlias(entity);
        return `${config.protocol}://${config.universities.host}/` +
            `link%to%program/${alias}`;
    }

    protected getFormattedCommentText(
            comment: ProgramCommentAttributes): string {
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
            comment: ProgramCommentAttributes, entity: ProgramAttribute
    ): string {
        return `http://link%to%comment`;
    }

    protected async setSentNotificationState(
            comment: ProgramCommentAttributes): Promise<void> {
        await programCommentService.updateById(comment.id, {
            isNoticeSend: true
        });
    }

    protected getRawCommentText(comment: ProgramCommentAttributes): string {
        return `${comment.pros} ${comment.cons} ${comment.advice}`;
    }
}

export {UniversityNewCommentNotifier};
