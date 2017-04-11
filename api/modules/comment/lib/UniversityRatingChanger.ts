import * as squel from 'squel';
squel.useFlavour('postgres');

const sequelize = require('../../../../app/components/db');

import {service as programService} from '../../university/services/program';
import {service as ratingService} from '../services/rating';

type Rating = {
    totalScore?: number;
    reviewCount: number;
    score: Array<number>;
    scoreCount: Array<number>;
};

const SCORE_COUNT = 4;
const MIN_REVIEW_COUNT = 5;
const MIN_SCORE_COUNT = 3;

export class UniversityRatingChanger {
    public async update(commentGroupId: number): Promise<any> {
        const program = await programService.getByCommentGroup(commentGroupId);
        const universityId = program.universityId;

        const overallRating: Rating = await this.getOverallRating(
            universityId
        );

        overallRating.score = overallRating.score.map((grade, i) =>
            overallRating.scoreCount[i] >= MIN_SCORE_COUNT ?
                Number(grade) :
                0
        );

        if (overallRating.score.every(grade => !!grade) &&
                overallRating.reviewCount >= MIN_REVIEW_COUNT) {
            overallRating.totalScore = ratingService.calculateTotalScore(
                overallRating.score
            );
        } else {
            overallRating.totalScore = 0;
        }

        return this.updateUniversity(universityId, overallRating);
    }

    private async getOverallRating(universityId: number): Promise<Rating> {
        const query = squel
            .select({autoQuoteAliasNames: true})
            .from('program')
            .field('sum(program.review_count)', 'reviewCount')
            .field(this.getScoreQuery(), 'score')
            .field(this.getScoreCountQuery(), 'scoreCount')
            .where(`program.university_id = ${universityId}`)
            .toString();

        const result = await sequelize.query(
            query, {
                type: sequelize.QueryTypes.SELECT
            }
        );

        return result[0];
    }

    private getScoreQuery(): string {
        return this.getQueryArray(this.getScoreElementQuery);
    }

    private getScoreCountQuery(): string {
        return this.getQueryArray(this.getScoreCountElementQuery);
    }

    private getQueryArray(getArrayElement: Function): string {
        const elementCalculation = [];
        for (let i = 1; i <= SCORE_COUNT; i++) {
            elementCalculation.push(getArrayElement(i));
        }
        return `ARRAY[${elementCalculation.join(', ')}]`;
    }

    private getScoreElementQuery(index: number): string {
        return `sum(program.score[${index}] * program.score_count[${index}]) ` +
            `FILTER(WHERE program.score[${index}] > 0) / ` +
            `sum(program.score_count[${index}])`;
    }

    private getScoreCountElementQuery(index: number): string {
        return `sum(program.score_count[${index}])`;
    }

    private async updateUniversity(
            universityId: number, rating: Rating): Promise<any> {
        const query = squel.update()
            .table('university')
            .set('review_count', rating.reviewCount)
            .set('score', `{${rating.score.join(', ')}}`)
            .set('score_count', `{${rating.scoreCount.join(', ')}}`)
            .set('total_score', rating.totalScore)
            .where(`university.id = ${universityId}`)
            .toString();

        return sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    }
}
