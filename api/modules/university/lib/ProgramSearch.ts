import * as squel from 'squel';

import {SearchQuery} from '../../entity/lib/Search';

import {SearchType} from '../constants/SearchType';

type SearchDataOptions = {
    isContained?: boolean;
};

export class ProgramSearchQuery extends SearchQuery {
    private programDataCount_: number;
    private programSearchParams_: any;

    constructor() {
        super();

        this.programDataCount_ = 0;

        this.programSearchParams_ = squel.expr();
    }

    public setCity(cityId: number): this {
        this.addProgramSearchData_([cityId], SearchType.CITY);

        return this;
    }

    public setEge(eges: Array<number>): this {
        this.addProgramSearchData_(eges, SearchType.EGE, {
            isContained: true
        });

        return this;
    }

    public setPayType(payTypes: Array<number>): this {
        this.addProgramSearchData_(payTypes, SearchType.PAY_TYPE);

        return this;
    }

    public setMajors(majors: Array<number>): this {
        this.addProgramSearchData_(majors, SearchType.MAJOR);

        return this;
    }

    public setDiscount(isDiscounted: boolean): this {
        const discount = this.booleanToSearchArray_(isDiscounted);
        this.addProgramSearchData_(discount, SearchType.DISCOUNT);

        return this;
    }

    public setExchangeProgram(isExchangeAvailable: boolean): this {
        const exchangeProgram = this.booleanToSearchArray_(isExchangeAvailable);
        this.addProgramSearchData_(
            exchangeProgram,
            SearchType.EXCHANGE_PROGRAM
        );

        return this;
    }

    public setMilitaryDepartment(isMilitaryDepartmentAvailable: boolean): this {
        const militaryDepartment = this.booleanToSearchArray_(
            isMilitaryDepartmentAvailable
        );
        this.addProgramSearchData_(
            militaryDepartment,
            SearchType.MILITARY_DEPARTMENT
        );

        return this;
    }

    public setDormitory(isDormitoryAvailable: boolean): this {
        const dormitory = this.booleanToSearchArray_(isDormitoryAvailable);
        this.addProgramSearchData_(dormitory, SearchType.DORMITORY);

        return this;
    }

    public setMaxPrice(price: number): this {
        if (price) {
            this.innerQuery_.where('entrance_statistic.cost <= ?', price);
        }

        return this;
    }

    public setMaxPassScore(passScore: number): this {
        if (passScore) {
            this.innerQuery_.where(
                'entrance_statistic.ege_pass_score <= ?',
                passScore
            );
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
            .field('program.university_count', 'universityCount')
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
            .field('COUNT(program.id) OVER()', 'program_count')
            .field(
                'COUNT(program.university_id) OVER(PARTITION BY program.id)',
                'university_count'
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
            values: Array<number>, type: string, options?: SearchDataOptions
    ): void {
        if (values && values.length) {
            const condition = this.getProgramSearchCondition_(
                values, type, options
            );

            this.programSearchParams_.or(condition);

            this.programDataCount_++;
        }
    }

    private getProgramSearchCondition_(
            values: Array<number>, type: string, options?: SearchDataOptions
    ): Object {
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

    private booleanToSearchArray_(value: boolean): Array<number> {
        return value ? [1] : [];
    }
}
