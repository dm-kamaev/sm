/**
 * @fileOverview Service for CRUD operations with university comments
 *
 * Full create method create all entities which associated with comment:
 * userData and rating (if needed)
 */
import * as Sequelize from 'sequelize/v3';
const db: Sequelize.Sequelize = require('../../../../app/components/db');

const logger =
    require('../../../../app/components/logger/logger').getLogger('app');

import {service as ratingService} from './rating';
import {Model as RatingModel} from '../models/Rating';
import {service as userDataService} from '../../user/services/userData';
import {Model as UserDataModel} from '../../user/models/userData';
import {service as programService} from '../../university/services/program';

import {
    ProgramCommentInstance,
    ProgramCommentAttributes,
    ProgramCommentFullCreateAttributes
} from '../types/programComment';

import {ProgramCommentNotFound}
    from './exceptions/ProgramCommentNotFound';
import {CommentNotBelongsToProgram}
    from './exceptions/CommentNotBelongsToProgram';

import {Model as ProgramCommentModel} from '../models/ProgramComment';

class ProgramCommentService {
    public readonly name: string = 'programComment';

    public async create(
            data: ProgramCommentAttributes
    ): Promise<ProgramCommentInstance> {
        return await ProgramCommentModel.create(data);
    }

    public async fullCreate(
        programId: number,
        data: ProgramCommentFullCreateAttributes
    ): Promise<void> {
        return await db.transaction(async() => {
            await this.fullCreate_(programId, data);
        }).catch((error) => {
            throw error;
        });
    }

    public async getOne(
            programId: number, commentId: number
    ): Promise<ProgramCommentInstance> {
        const commentInstance = await this.silentGetOne_(commentId);
        if (!commentInstance) {
            throw new ProgramCommentNotFound(commentId);
        }

        const commentGroup = await programService.getCommentGroup(programId);
        if (commentGroup.id !== commentInstance.commentGroupId) {
            throw new CommentNotBelongsToProgram(
                programId, commentId
            );
        }

        return commentInstance;
    }

    public async getOneWithFullData(
            programId: number, commentId: number
    ): Promise<ProgramCommentInstance> {
        const comment = await this.getOne(programId, commentId);

        comment.userData = await userDataService.getOne(comment.userDataId);
        if (comment.ratingId) {
            comment.rating = await ratingService.getById(comment.ratingId);
        }

        return comment;
    }

    public async getAllByProgramIdWithFullData(
            programId: number): Promise<Array<ProgramCommentInstance>> {
        const commentGroup = await programService.getCommentGroup(programId);
        return await ProgramCommentModel.findAll({
            where: {
                commentGroupId: commentGroup.id
            },
            include: [{
                model: UserDataModel,
                attributes: [
                    'userType', 'grade', 'yearGraduate', 'userId', 'username'
                ],
                as: 'userData'
            }, {
                model: RatingModel,
                attributes: [
                    'score', 'totalScore'
                ],
                as: 'rating'
            }]
        });
    }

    public async update(
            programId: number,
            commentId: number,
            data: ProgramCommentAttributes
    ): Promise<ProgramCommentInstance> {
        const instance = await this.getOne(programId, commentId);

        return await instance.update(data);
    }

    public async updateById(
            commentId: number,
            data: ProgramCommentAttributes
    ): Promise<ProgramCommentInstance> {
        const instance = await this.silentGetOne_(commentId);

        return await instance.update(data);
    }

    public async fullUpdate(
            programId: number,
            commentId: number,
            data: ProgramCommentFullCreateAttributes): Promise<void> {
        return await db.transaction(async() => {
            await this.fullUpdate_(programId, commentId, data);
        }).catch((error) => {
            throw error;
        });
    }

    public async fullDelete(
            programId: number, commentId: number): Promise<void> {
        return await db.transaction(async() => {
            await this.fullDelete_(programId, commentId);
        }).catch((error) => {
            throw error;
        });
    }

    public async getNotNotified(): Promise<Array<ProgramCommentInstance>> {
        return ProgramCommentModel.findAll({
            where: {
                isNoticeSend: false
            }
        });
    }

    private async fullDelete_(
            programId: number, commentId: number): Promise<void> {
        const commentInstance = await this.getOne(programId, commentId);

        await commentInstance.destroy();
        await userDataService.delete(commentInstance.userDataId);
        if (commentInstance.ratingId) {
            await ratingService.delete(commentInstance.ratingId);
        }
    }

    private async fullCreate_(
            programId: number,
            data: ProgramCommentFullCreateAttributes): Promise<void> {
        const commentInstance = await this.create(data),
            userDataInstance = await userDataService.create(data),
            commentGroup =
                await programService.getCommentGroup(programId);

        if (data.score && data.score.length) {
            await this.createCommentRating_(commentInstance, data);
        }

        await commentInstance.setUserData(userDataInstance);
        await commentInstance.setCommentGroup(commentGroup);
    }

    private async fullUpdate_(
            programId: number,
            commentId: number,
            data: ProgramCommentFullCreateAttributes
    ): Promise<void> {
        const commentInstance = await this.update(programId, commentId, data);

        if (data.score) {
            commentInstance.ratingId ?
                await ratingService.update(commentInstance.ratingId, data) :
                await this.createCommentRating_(commentInstance, data);
        }
        await userDataService.update(commentInstance.userDataId, data);
    }

    private async createCommentRating_(
            comment: ProgramCommentInstance,
            data: ProgramCommentFullCreateAttributes): Promise<void> {
        const ratingInstance = await ratingService.create(data.score);
        await comment.setRating(ratingInstance);
    }

    private async silentGetOne_(
            commentId: number): Promise<ProgramCommentInstance> {
        return await ProgramCommentModel.findById(commentId);
    }
}

export const service = new ProgramCommentService();
