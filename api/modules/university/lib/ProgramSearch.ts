import * as squel from 'squel';

import {SearchQuery} from '../../entity/lib/Search';

import {SearchType} from '../constants/SearchType';
import {EgeSearch} from '../types/programSearch';

type SearchDataOptions = {
    isContained?: boolean;
};

export class ProgramSearchQuery extends SearchQuery {
    private programDataCount_: number;
    private programSearchParams_: any;
    private programEgeResults_: EgeSearch[];

    constructor() {
        super();

        this.programDataCount_ = 0;

        this.programSearchParams_ = squel.expr();
    }

    public getQuery(): string {
        const mainQuery: string = super.getQuery();
        let withQuery: string = '';
        if (!!this.programEgeResults_) {
            withQuery = this.generateWithProgramEgeScore_();
        }
        return withQuery + mainQuery;
    }

    public setCities(cities: number[]): this {
        this.addProgramSearchData_(cities, SearchType.CITY);

        return this;
    }

    public setEge(eges: EgeSearch[] | undefined): this {
        if (eges && eges.length) {
            this.addEgeWhere_();

            this.programEgeResults_ = eges;
        }

        return this;
    }

    public setPayType(payTypes: number[]): this {
        this.addProgramSearchData_(payTypes, SearchType.PAY_TYPE);

        return this;
    }

    public setMajors(majors: number[]): this {
        this.addProgramSearchData_(majors, SearchType.MAJOR);

        return this;
    }

    public setDiscount(isDiscounted: boolean): this {
        const discount = this.booleanToSearchArray_(isDiscounted);
        this.addProgramSearchData_(discount, SearchType.DISCOUNT);

        return this;
    }

    public setFeatures(features: number[]) {
        this.addProgramSearchData_(features, SearchType.FEATURES);

        return this;
    }

    public setMaxPrice(price: number): this {
        if (price) {
            this.innerQuery_.where('entrance_statistic.cost <= ?', price);
        }

        return this;
    }

    protected setBaseQuery_(): void {
        this.baseQuery_
            .field('program.id')
            .field('program.name')
            .field('program.total_score', 'totalScore')
            .field('program.exchange_program', 'exchangeProgram')
            .field('program.extra_exam', 'extraExam')
            .field('program.last_ege_score', 'egeScore')
            .field('program.last_cost', 'cost')
            .field('program.last_budget_places', 'budgetPlaces')
            .field('program.last_commercial_places', 'commercialPlaces')
            .field('program.last_competition', 'competition')
            .field('program.university_image_url', 'imageUrl')
            .field('program.university_name', 'universityName')
            .field('program.university_abbreviation', 'universityAbbreviation')
            .field('program.city_name', 'cityName')
            .field('program_page_data.alias', 'programAlias')
            .field('university_page_data.alias', 'universityAlias')
            .field('program.program_count', 'programCount')
            .field('program.universities', 'universities')
            .left_join(
                'program_page',
                null,
                'program.id = program_page.program_id'
            )
            .left_join(
                'university_page',
                null,
                'program.university_id = university_page.university_id'
            )
            .left_join(
                'page',
                'program_page_data',
                'program_page.page_id = program_page_data.id'
            )
            .left_join(
                'page',
                'university_page_data',
                'university_page.page_id = university_page_data.id'
            );
    }

    protected setInnerQuery_(): void {
        this.innerQuery_
            .from('program')
            .field('program.id')
            .field('program.university_id')
            .field('program.name')
            .field('program.total_score')
            .field('program.exchange_program')
            .field('program.extra_exam')
            .field('university.image_url', 'university_image_url')
            .field('university.abbreviation', 'university_abbreviation')
            .field('university.name', 'university_name')
            .field('city.name', 'city_name')
            .field('entrance_statistic.ege_pass_score', 'last_ege_score')
            .field('entrance_statistic.cost', 'last_cost')
            .field('entrance_statistic.budget_places', 'last_budget_places')
            .field('entrance_statistic.competition', 'last_competition')
            .field(
                'entrance_statistic.commercial_places',
                'last_commercial_places'
            )
            .field('count(program.id) OVER()', 'program_count')
            .field(
                'jsonb_object_agg(university.id, university.abbreviation) ' +
                    'OVER()',
                'universities'
            )
            .left_join(
                'entrance_statistic',
                null,
                'program.id = entrance_statistic.program_id AND ' +
                    `entrance_statistic.year = (${this.getLastStatistic_()})`
            )
            .left_join(
                'university',
                null,
                'program.university_id = university.id'
            )
            .left_join('city', null, 'university.city_id = city.id');
    }

    protected getAlias_(): string {
        return 'program';
    }

    protected setTypeOrder_(sortType: number): void {
        let innerSortField;
        let baseSortField;
        let sortOrder;
        switch (sortType) {
        case 1:
            innerSortField = 'entrance_statistic.cost';
            baseSortField = 'program.last_cost';
            sortOrder = true; // squel 'ASC'
            break;
        case 2:
            innerSortField = baseSortField = 'program.total_score';
            sortOrder = false; // squel 'DESC'
            break;
        }

        this.innerQuery_
            .order(innerSortField, sortOrder);
        this.baseQuery_
            .order(baseSortField, sortOrder);
    }

    protected setQueriesOrder_(): void {
        this.setBaseOrder_();
        this.setInnerOrder_();
    }

    protected setStringWhere_(searchString: string): void {
        const searchName = `%${searchString}%`;
        this.innerQuery_.where('program.name ILIKE ?', searchName);
    }

    protected updateInnerWhere_(): void {
        if (this.programDataCount_) {
            this.innerQuery_
                .where(
                    `program.id IN (${this.generateProgramDataQuery_()})`
                );
        }
    }

    private addProgramSearchData_(
            values: number[], type: string, options?: SearchDataOptions
    ): void {
        if (values && values.length) {
            const condition = this.getProgramSearchCondition_(
                values, type, options
            );

            this.programSearchParams_.or(condition);

            this.programDataCount_++;
        }
    }

    private addEgeWhere_(): void {
        this.innerQuery_
            .where(`program.id IN (${this.generateEgeWhereSubquery_()})`);
    }

    private generateEgeWhereSubquery_(): string {
        return squel.select()
            .from('program_ege_score')
            .field('program_ege_score.program_id')
            .where('entrance_statistic.ege_pass_score <= ' +
                'program_ege_score.score_sum')
            .toString();
    }

    private getProgramSearchCondition_(
            values: number[], type: string, options?: SearchDataOptions
    ): string {
        const isContained = options && options.isContained;
        const arrayOperator = isContained ? '<@' : '&&';
        return squel.expr()
            .and('program_search_data.type = ?', type)
            .and(`program_search_data.values ${arrayOperator} ` +
                `${this.intArrayToSql_(values)}`)
            .toString();
    }

    private setBaseOrder_(): void {
        this.baseQuery_
            .order('program.last_ege_score', true)
            .order('program.id', true);
    }

    private setInnerOrder_(): void {
        this.innerQuery_
            .order('entrance_statistic.ege_pass_score')
            .order('program.id', true);
    }

    private generateProgramDataQuery_(): string {
        return squel.select()
            .from('program_search_data')
            .field('DISTINCT program_id')
            .where(
                this.programSearchParams_.toString()
            )
            .group('program_id')
            .having(
                `COUNT(DISTINCT id) = ${this.programDataCount_}`
            )
            .toString();
    }

    private getLastStatistic_(): string {
        return squel.select()
            .field('max(entrance_statistic.year)')
            .from('entrance_statistic')
            .where('program.id = entrance_statistic.program_id');
    }

    private generateWithProgramEgeScore_(): string {
        const userEgeScoreQuery: string = this.generateUserEgeScoreQuery_();
        const programEgeQuery: string = this.generateProgramEgeQuery_();
        const programEgeScoreQuery: string =
            this.generateProgramEgeScoreQuery_();
        const withQuery = `WITH user_ege_score AS (${userEgeScoreQuery}),
    program_ege AS (${programEgeQuery}),
    program_ege_score AS (${programEgeScoreQuery})`;
        return withQuery;
    }

    private generateUserEgeScoreQuery_(): string {
        return `SELECT *
    FROM (${this.generateEgeConstantsTable_()})
    AS user_ege_score (subject_id, score)`;
    }

    private generateEgeConstantsTable_(): string {
        const egeSubjectValues: string[] = this.programEgeResults_.map(
            egeResult => `(${egeResult.subjectId}, ${egeResult.score})`
        );
        return `VALUES${egeSubjectValues.join(', ')}`;
    }

    private generateProgramEgeQuery_(): string {
        const egeIds: number[] = this.programEgeResults_.map(egeResult =>
            egeResult.subjectId);
        const whereCondition: string = this.getProgramSearchCondition_(
            egeIds,
            SearchType.EGE, {
                isContained: true
            }
        );

        return `SELECT program_id, unnest(values) AS subject_id
    FROM program_search_data
    WHERE (${whereCondition})`;
    }

    private generateProgramEgeScoreQuery_(): string {
        return squel.select()
            .from('program_ege')
            .field('program_ege.program_id')
            .field('sum(user_ege_score.score)', 'score_sum')
            .join(
                'user_ege_score',
                null,
                'program_ege.subject_id = user_ege_score.subject_id'
            )
            .group('program_ege.program_id')
            .toString();
    }

    private booleanToSearchArray_(value: boolean): number[] {
        return value ? [1] : [];
    }
}
