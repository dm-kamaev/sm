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
    UniversityCommentInstance,
    UniversityCommentAttributes,
    UniversityCommentFullCreateAttributes
} from '../types/universityComment';

import {UniversityCommentNotFound}
    from './exceptions/UniversityCommentNotFound';
import {UniversityCommentNotBelongsToProgram}
    from './exceptions/UniversityCommentNotBelongsToProgram';

import {Model as UniversityCommentModel} from '../models/UniversityComment';

class UniversityCommentService {
    public readonly name: string = 'universityComment';

    public async create(
            data: UniversityCommentAttributes
    ): Promise<UniversityCommentInstance> {
        return await UniversityCommentModel.create(data);
    }

    public async fullCreate(
        programId: number,
        data: UniversityCommentFullCreateAttributes
    ): Promise<void> {
        return await db.transaction(async() => {
            await this.fullCreate_(programId, data);
        }).catch((error) => {
            throw error;
        });
    }

    public async getOne(
            programId: number, commentId: number
    ): Promise<UniversityCommentInstance> {
        const commentInstance = await this.silentGetOne_(commentId);
        if (!commentInstance) {
            throw new UniversityCommentNotFound(commentId);
        }

        const commentGroup = await programService.getCommentGroup(programId);
        if (commentGroup.id !== commentInstance.commentGroupId) {
            throw new UniversityCommentNotBelongsToProgram(
                programId, commentId
            );
        }

        return commentInstance;
    }

    public async getOneWithFullData(
            programId: number, commentId: number
    ): Promise<UniversityCommentInstance> {
        const comment = await this.getOne(programId, commentId);

        comment.userData = await userDataService.getOne(comment.userDataId);
        if (comment.ratingId) {
            comment.rating = await ratingService.getById(comment.ratingId);
        }

        return comment;
    }

    public async getAllByProgramIdWithFullData(
            programId: number): Promise<Array<UniversityCommentInstance>> {
        const commentGroup = await programService.getCommentGroup(programId);
        return await UniversityCommentModel.findAll({
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
            data: UniversityCommentAttributes
    ): Promise<UniversityCommentInstance> {
        const instance = await this.getOne(programId, commentId);

        return await instance.update(data);
    }


    public async fullUpdate(
            programId: number,
            commentId: number,
            data: UniversityCommentFullCreateAttributes): Promise<void> {
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

    private async fullDelete_(
            programId: number, commentId: number): Promise<void> {
        const commentInstance = await this.getOne(programId, commentId);

        await userDataService.delete(commentInstance.userDataId);
        if (commentInstance.ratingId) {
            await ratingService.delete(commentInstance.ratingId);
        }
        await commentInstance.destroy();
    }

    private async fullCreate_(
            programId: number,
            data: UniversityCommentFullCreateAttributes): Promise<void> {
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
            data: UniversityCommentFullCreateAttributes
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
            comment: UniversityCommentInstance,
            data: UniversityCommentFullCreateAttributes): Promise<void> {
        const ratingInstance = await ratingService.create(data.score);
        await comment.setRating(ratingInstance);
    }

    private async silentGetOne_(
            commentId: number): Promise<UniversityCommentInstance> {
        return await UniversityCommentModel.findById(commentId);
    }
}

export const service = new UniversityCommentService();
