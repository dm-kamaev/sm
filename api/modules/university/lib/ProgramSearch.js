"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const squel = require("squel");
const Search_1 = require("../../entity/lib/Search");
const SearchType_1 = require("../constants/SearchType");
class ProgramSearchQuery extends Search_1.SearchQuery {
    constructor() {
        super();
        this.programDataCount_ = 0;
        this.programSearchParams_ = squel.expr();
    }
    getQuery() {
        const mainQuery = super.getQuery();
        let withQuery = '';
        if (!!this.programEgeResults_) {
            withQuery = this.generateWithProgramEgeScore_();
        }
        return withQuery + mainQuery;
    }
    setCities(cities) {
        this.addProgramSearchData_(cities, SearchType_1.SearchType.CITY);
        return this;
    }
    setEge(eges) {
        if (eges && eges.length) {
            this.addEgeWhere_();
            this.programEgeResults_ = eges;
        }
        return this;
    }
    setPayType(payTypes) {
        this.addProgramSearchData_(payTypes, SearchType_1.SearchType.PAY_TYPE);
        return this;
    }
    setMajors(majors) {
        this.addProgramSearchData_(majors, SearchType_1.SearchType.MAJOR);
        return this;
    }
    setDiscount(isDiscounted) {
        const discount = this.booleanToSearchArray_(isDiscounted);
        this.addProgramSearchData_(discount, SearchType_1.SearchType.DISCOUNT);
        return this;
    }
    setFeatures(features) {
        this.addProgramSearchData_(features, SearchType_1.SearchType.FEATURES);
        return this;
    }
    setMaxPrice(price) {
        if (price) {
            this.innerQuery_.where('entrance_statistic.cost <= ? ' +
                'OR entrance_statistic.cost IS NULL', price);
        }
        return this;
    }
    setBaseQuery_() {
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
            .left_join('program_page', null, 'program.id = program_page.program_id')
            .left_join('university_page', null, 'program.university_id = university_page.university_id')
            .left_join('page', 'program_page_data', 'program_page.page_id = program_page_data.id')
            .left_join('page', 'university_page_data', 'university_page.page_id = university_page_data.id');
    }
    setInnerQuery_() {
        this.innerQuery_
            .from('program')
            .field('program.id')
            .field('program.university_id')
            .field('program.name')
            .field('program.total_score')
            .field('program.review_count')
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
            .field('entrance_statistic.commercial_places', 'last_commercial_places')
            .field('count(program.id) OVER()', 'program_count')
            .field('jsonb_object_agg(university.id, university.abbreviation) ' +
            'OVER()', 'universities')
            .left_join('entrance_statistic', null, 'program.id = entrance_statistic.program_id AND ' +
            `entrance_statistic.year = (${this.getLastStatistic_()})`)
            .left_join('university', null, 'program.university_id = university.id')
            .left_join('city', null, 'university.city_id = city.id');
    }
    getLastStatistic_() {
        return squel.select()
            .field('max(entrance_statistic.year)')
            .from('entrance_statistic')
            .where('program.id = entrance_statistic.program_id');
    }
    getAlias_() {
        return 'program';
    }
    setTypeOrder_(sortType) {
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
                this.addCommentCount_();
                innerSortField = 'comment_count DESC NULLS LAST';
                baseSortField = 'program.comment_count DESC NULLS LAST';
                sortOrder = null;
                break;
        }
        this.innerQuery_
            .order(innerSortField, sortOrder);
        this.baseQuery_
            .order(baseSortField, sortOrder);
    }
    setQueriesOrder_() {
        this.setBaseOrder_();
        this.setInnerOrder_();
    }
    setStringWhere_(searchString) {
        const searchName = `%${searchString}%`;
        this.innerQuery_.where('program.name ILIKE ?', searchName);
    }
    updateInnerWhere_() {
        if (this.programDataCount_) {
            this.innerQuery_
                .where(`program.id IN (${this.generateProgramDataQuery_()})`);
        }
    }
    addProgramSearchData_(values, type, options) {
        if (values && values.length) {
            const condition = this.getProgramSearchCondition_(values, type, options);
            this.programSearchParams_.or(condition);
            this.programDataCount_++;
        }
    }
    addEgeWhere_() {
        this.innerQuery_
            .where(`program.id IN (${this.generateEgeWhereSubquery_()})`);
    }
    generateEgeWhereSubquery_() {
        return squel.select()
            .from('program_ege_score')
            .field('program_ege_score.program_id')
            .where('entrance_statistic.ege_pass_score <= ' +
            'program_ege_score.score_sum')
            .toString();
    }
    getProgramSearchCondition_(values, type, options) {
        const isContained = options && options.isContained;
        const arrayOperator = isContained ? '<@' : '&&';
        return squel.expr()
            .and('program_search_data.type = ?', type)
            .and(`program_search_data.values ${arrayOperator} ` +
            `${this.intArrayToSql_(values)}`)
            .toString();
    }
    setBaseOrder_() {
        this.baseQuery_
            .order('program.last_ege_score ASC NULLS LAST', null)
            .order('program.id', true);
    }
    setInnerOrder_() {
        this.innerQuery_
            .order('entrance_statistic.ege_pass_score ASC NULLS LAST', null)
            .order('program.id', true);
    }
    generateProgramDataQuery_() {
        return squel.select()
            .from('program_search_data')
            .field('DISTINCT program_id')
            .where(this.programSearchParams_.toString())
            .group('program_id')
            .having(`COUNT(DISTINCT id) = ${this.programDataCount_}`)
            .toString();
    }
    generateWithProgramEgeScore_() {
        const userEgeScoreQuery = this.generateUserEgeScoreQuery_();
        const programEgeQuery = this.generateProgramEgeQuery_();
        const programEgeScoreQuery = this.generateProgramEgeScoreQuery_();
        const withQuery = `WITH user_ege_score AS (${userEgeScoreQuery}),
    program_ege AS (${programEgeQuery}),
    program_ege_score AS (${programEgeScoreQuery})`;
        return withQuery;
    }
    generateUserEgeScoreQuery_() {
        return `SELECT *
    FROM (${this.generateEgeConstantsTable_()})
    AS user_ege_score (subject_id, score)`;
    }
    generateEgeConstantsTable_() {
        const egeSubjectValues = this.programEgeResults_.map(egeResult => `(${egeResult.subjectId}, ${egeResult.score})`);
        return `VALUES${egeSubjectValues.join(', ')}`;
    }
    generateProgramEgeQuery_() {
        const egeIds = this.programEgeResults_.map(egeResult => egeResult.subjectId);
        const whereCondition = this.getProgramSearchCondition_(egeIds, SearchType_1.SearchType.EGE, {
            isContained: true
        });
        return `SELECT program_id, unnest(values) AS subject_id
    FROM program_search_data
    WHERE (${whereCondition})`;
    }
    generateProgramEgeScoreQuery_() {
        return squel.select()
            .from('program_ege')
            .field('program_ege.program_id')
            .field('sum(user_ege_score.score)', 'score_sum')
            .join('user_ege_score', null, 'program_ege.subject_id = user_ege_score.subject_id')
            .group('program_ege.program_id')
            .toString();
    }
    booleanToSearchArray_(value) {
        return value ? [1] : [];
    }
    addCommentCount_() {
        this.innerQuery_
            .field('count(program_comment.id)', 'comment_count')
            .left_join('comment_group', null, 'program.comment_group_id = comment_group.id')
            .left_join('program_comment', null, 'comment_group.id = program_comment.comment_group_id')
            .group('program.id')
            .group('university.id')
            .group('entrance_statistic.id')
            .group('city.id');
        this.baseQuery_
            .field('program.comment_count', 'commentCount');
    }
}
exports.ProgramSearchQuery = ProgramSearchQuery;
