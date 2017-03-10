/**
 * @fileOverview Service for make CRUD operations on rating model
 */
import {RatingAttributes, RatingInstance} from '../types/rating';

import {Model as RatingModel} from '../models/rating';

class RatingService {
    public readonly name: string = 'rating';

    public async create(score: Array<number>): Promise<RatingInstance> {
        return await RatingModel.create({
            score: score,
            totalScore: this.calculateTotalScore(score)
        });
    }

    public async update(ratingId: number, data: RatingAttributes) {
        var instance = await this.getById(ratingId);
        return await(instance.update(data));
    }

    public async getAll() {
        return await(RatingModel.findAll());
    }

    public async getById(ratingId: number) {
        return await RatingModel.findById(ratingId);
    }

    public async delete(ratingId: number): Promise<void> {
        let instance = await this.silentGetOne_(ratingId);

        if (!instance) {

        }

        return await instance.destroy();
    }

    public calculateTotalScore(score: Array<number>): number {
        let notEmptyScore = score.every(scoreGrade => !!scoreGrade),
            result = 0;

        if (notEmptyScore) {
            let sum = score.reduce(
                (total, current) => total + current,
                0
            );
            result = sum / score.length;
        }

        return result;
    }

    private async silentGetOne_(ratingId: number): Promise<RatingInstance> {
        return await RatingModel.findById(ratingId);
    }
}

export const service = new RatingService();
