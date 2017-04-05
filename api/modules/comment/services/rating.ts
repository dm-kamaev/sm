/**
 * @fileOverview Service for make CRUD operations on rating model
 */
import {RatingAttributes, RatingInstance} from '../types/rating';

import {Model as RatingModel} from '../models/Rating';

class RatingService {
    public readonly name: string = 'rating';

    public async create(score: Array<number>): Promise<RatingInstance> {
        return await RatingModel.create({
            score: score,
            totalScore: this.calculateTotalScore(score)
        });
    }

    public async update(ratingId: number, data: RatingAttributes) {
        const instance = await this.getById(ratingId);
        return await(instance.update({
            score: data.score,
            totalScore: this.calculateTotalScore(data.score)
        }));
    }

    public async getAll() {
        return await(RatingModel.findAll());
    }

    public async getById(ratingId: number) {
        return await RatingModel.findById(ratingId);
    }

    public async delete(ratingId: number): Promise<void> {
        const instance = await RatingModel.findById(ratingId);

        return await instance.destroy();
    }

    public calculateTotalScore(score: Array<number>): number {
        const notEmptyScore = score.filter(scoreGrade => Boolean(scoreGrade));
        let result = 0;

        if (Boolean(notEmptyScore.length)) {
            const sum = score.reduce(
                (total, current) => total + Number(current),
                0
            );
            result = sum / notEmptyScore.length;
        }

        return result;
    }
}

export const service = new RatingService();
