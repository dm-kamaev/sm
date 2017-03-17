/**
 * @fileOverview Service for create, read, update program comments
 */
import {Service} from '../../common/services/Service';
const config = require('../../../config/config.json');
const logger = require('../../../components/logger/logger').getLogger('app');

const apiAddress = config.backendApi;
const headers = config.backendApiHeaders;

import {
    BackendProgramComment,
    ProgramCommentData
} from '../types/programComment';
import {BackendUser} from '../../user/types/user';

import {
    RequiredFieldsNotFilledException
} from './exceptions/RequiredFieldsNotFilled';
import {ProgramNotFound} from './exceptions/ProgramNotFound';
import {ProgramCommentNotFound} from './exceptions/ProgramCommentNotFound';
import {
    CommentNotBelongsToProgram
} from './exceptions/CommentNotBelongsToProgram';

class ProgramCommentService extends Service {
    private baseUrl_: string;

    constructor(programId: number) {
        super();

        this.baseUrl_ =
            `${apiAddress}/universities/api/program/${programId}/comment`;
    }

    public getUserComment(
            user: BackendUser,
            comments: Array<BackendProgramComment>
    ): BackendProgramComment {
        return comments.find(comment => comment.userId == user.id);
    }

    public async getComments(): Promise<Array<BackendProgramComment>> {
        const params = {
            url: this.baseUrl_,
            method: 'get',
            headers: {
                [headers.token.name]: headers.token.value
            }
        };
        const responce = await this.send(params);
        return responce.data;
    }

    public async changeComment(
        data: ProgramCommentData,
        user: BackendUser
    ): Promise<void> {
        return data.id ?
            await this.updateComment(data.id, data, user) :
            await this.createComment(data, user);
    }

    public async createComment(
            data: ProgramCommentData,
            user: BackendUser): Promise<void> {

        if (!this.validateData(data)) {
            throw new RequiredFieldsNotFilledException();
        }

        const params = {
            url: this.baseUrl_,
            method: 'post',
            data: this.makeBackendCommentData(data, user),
            headers: {
                [headers.token.name]: headers.token.value
            }
        };
        return await this.send(params);
    }

    public async updateComment(
            commentId: number,
            data: ProgramCommentData,
            user: BackendUser): Promise<void> {

        if (!this.validateData(data)) {
            throw new RequiredFieldsNotFilledException();
        }

        const params = {
            url: `${this.baseUrl_}/${commentId}`,
            method: 'put',
            data: this.makeBackendCommentData(data, user),
            headers: {
                [headers.token.name]: headers.token.value
            }
        };
        return await this.send(params);
    }

    protected handleError(error) {
        const data = error.data;

        if (data) {
            logger.debug(JSON.stringify(error.data));
            data.forEach(errorItem => {
                const code = errorItem.code;

                switch (code) {
                    case 'ProgramNotFound':
                        throw new ProgramNotFound();
                    case 'ProgramCommentNotFound':
                        throw new ProgramCommentNotFound();
                    case 'CommentNotBelongsToProgram':
                        throw new CommentNotBelongsToProgram();
                }
            });
        }

        throw error;
    }

    private makeBackendCommentData(
            data: ProgramCommentData,
            user: BackendUser): BackendProgramComment {
        const userId = user.id;
        return Object.assign({}, data, {userId});
    }

    private validateData(data: ProgramCommentData): boolean {
        const hasText = !!(data.pros || data.cons || data.advice),
            hasScore = !!data.score;

        return hasScore && hasText;
    }
}

export {ProgramCommentService};
