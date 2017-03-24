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
import {
    UserAlreadyCommentedProgram
} from './exceptions/UserAlreadyCommentedProgram';

class ProgramCommentService extends Service {
    constructor(programId: number) {
        super();

        this.baseUrl =
            `${apiAddress}/universities/api/program/${programId}/comment`;
    }

    public getUserComment(
            user: BackendUser,
            comments: Array<BackendProgramComment>
    ): BackendProgramComment {
        const userComment = comments.find(comment => comment.userId == user.id);

        return userComment || {};
    }

    public async getComments(): Promise<Array<BackendProgramComment>> {
        const params = {
            url: this.baseUrl,
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
            url: this.baseUrl,
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
            url: `${this.baseUrl}/${commentId}`,
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
                    case 'UserAlreadyCommentedProgram':
                        throw new UserAlreadyCommentedProgram();
                }
            });
        }

        throw error;
    }

    private makeBackendCommentData(
            data: ProgramCommentData,
            user: BackendUser): BackendProgramComment {
        return {
            userType: data.userType,
            yearGraduate: data.yearGraduate || null,
            grade: data.grade || null,
            pros: data.pros,
            cons: data.cons,
            advice: data.advice,
            score: data.score,
            userId: user.id
        };
    }

    private validateData(data: ProgramCommentData): boolean {
        const hasText = Boolean(data.pros || data.cons || data.advice),
            hasScore = Boolean(data.score) && Boolean(data.score.length);

        return hasScore || hasText;
    }
}

export {ProgramCommentService};
