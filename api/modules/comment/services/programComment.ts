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
import {RatingChanger} from '../lib/RatingChanger';
import {UniversityRatingChanger} from '../lib/UniversityRatingChanger';

import {
    ProgramCommentInstance,
    ProgramCommentAttributes,
    ProgramCommentFullCreateAttributes
} from '../types/programComment';

import {ProgramCommentNotFound}
    from './exceptions/ProgramCommentNotFound';
import {CommentNotBelongsToProgram}
    from './exceptions/CommentNotBelongsToProgram';
import {UserAlreadyCommentedProgram}
    from './exceptions/UserAlreadyCommentedProgram';

import {Model as ProgramCommentModel} from '../models/ProgramComment';
import {Model as ProgramModel} from '../../university/models/Program';

type SequelizeOrder = Array<
    Array<string | {model: Sequelize.Model<any, any>, as?: string}>
>;

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
            programId: number, orderType?: number
    ): Promise<Array<ProgramCommentInstance>> {
        const commentGroup = await programService.getCommentGroup(programId);
        const order = this.getCommentsOrder_(orderType);
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
            }],
            order: order
        });
    }


    public async getAllTotalScore(
        commentGroupIds: number[]
    ): Promise<ProgramCommentInstance[]> {
        return await ProgramCommentModel.findAll({
            attributes: ['commentGroupId'],
            where: {
                commentGroupId: {
                    $in: commentGroupIds
                },
            },
            include: [{
                model: RatingModel,
                attributes: ['totalScore'],
                as: 'rating'
            }],
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

        await this.updateRating_(commentInstance.commentGroupId);
        await this.updateUniversityRating_(commentInstance.commentGroupId);
    }

    private async fullCreate_(
            programId: number,
            data: ProgramCommentFullCreateAttributes): Promise<void> {
        const userId = data.userId,
            isUserCommented =
                await this.checkIfCommented_(programId, userId);
        if (isUserCommented) {
            throw new UserAlreadyCommentedProgram(programId, userId);
        }

        const commentInstance = await this.create(data),
            userDataInstance = await userDataService.create(data),
            commentGroup =
                await programService.getCommentGroup(programId);

        if (data.score && data.score.length) {
            await this.createCommentRating_(commentInstance, data);
        }

        await commentInstance.setUserData(userDataInstance);
        await commentInstance.setCommentGroup(commentGroup);

        await this.updateRating_(commentGroup.id);
        await this.updateUniversityRating_(commentGroup.id);
    }

    private async checkIfCommented_(
            programId: number, userId: number): Promise<boolean> {
        const commentGroup = await programService.getCommentGroup(programId),
            comment = await ProgramCommentModel.findAll({
                where: {
                    commentGroupId: commentGroup.id
                },
                include: [{
                    model: UserDataModel,
                    attributes: [
                        'userType',
                        'grade',
                        'yearGraduate',
                        'userId',
                        'username'
                    ],
                    where: {
                        userId: userId
                    },
                    as: 'userData'
                }, {
                    model: RatingModel,
                    attributes: [
                        'score', 'totalScore'
                    ],
                    as: 'rating'
                }]
            });

        return Boolean(comment.length);
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

        await this.updateRating_(commentInstance.commentGroupId);
        await this.updateUniversityRating_(commentInstance.commentGroupId);
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

    private getCommentsOrder_(orderType: number) {
        const order: SequelizeOrder = [];
        switch (orderType) {
            case 1:
                order.push([
                    {model: RatingModel, as: 'rating'},
                    'totalScore',
                    'DESC'
                ]);
                break;
            case 2:
                order.push([
                    {model: RatingModel, as: 'rating'},
                    'totalScore',
                    'ASC'
                ]);
                break;
            default:
                order.push([
                    'createdAt',
                    'DESC'
                ]);
                break;
        }
        return order;
    }

    private async updateRating_(commentGroupId: number): Promise<any> {
        const programTableName: any = ProgramModel.getTableName();
        const programCommentTableName: any = ProgramCommentModel.getTableName();
        const ratingChanger = new RatingChanger(
            programTableName, commentGroupId, programCommentTableName
        );
        return ratingChanger.update();
    }

    private async updateUniversityRating_(
            commentGroupId: number): Promise<any> {
        const universityRatingChanger = new UniversityRatingChanger();
        return universityRatingChanger.update(commentGroupId);
    }
}

export const service = new ProgramCommentService();
