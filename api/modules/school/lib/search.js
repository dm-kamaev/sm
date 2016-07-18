'use strict';

var squel = require('squel').useFlavour('postgres');

var schoolSearchType = require('../enums/searchType'),
    addressSearchType = require('../../geo/enums/addressSearchType');

class SearchQuery {
    /**
     * Create query templates
     */
    constructor() {
        /**
         * @private
         * @type {Object}
         */
        this.baseQuery_ = this.generateBaseQuery_();

        /**
         * @private
         * @type {Object}
         */
        this.innerQuery_ = this.generateInnerQuery_();

        /**
         * @private
         * @type {Object}
         */
        this.examTypes_ = {
            gia: schoolSearchType.fields.GIA,
            ege: schoolSearchType.fields.EGE,
            olymp: schoolSearchType.fields.OLIMPIAD,
        };

        /**
         * @private
         * @type {Object}
         */
        this.schoolSearchParams_ = squel.expr();

        /**
         * @private
         * @type {Object}
         */
        this.addressSearchParams_ = squel.expr();

        /**
         * @private
         * @type {number}
         */
        this.schoolDataCount_ = 0;

        /**
         * @private
         * @type {number}
         */
        this.addressDataCount_ = 0;

        /**
         * @private
         * @type {boolean}
         */
        this.isGeoData_ = false;
    }

    /**
     * @param {number=} opt_limit
     * @return {Object}
     */
    setLimit(opt_limit) {
        if (opt_limit) {
            this.innerQuery_.limit(opt_limit);
        }

        return this;
    }

    /**
     * @param {number} offset
     * @return {Object}
     */
    setOffset(offset) {
        this.innerQuery_.offset(offset);

        return this;
    }

    /**
     * @param {number=} opt_scoreSortType
     * @return {Object}
     */
    setSortType(opt_scoreSortType) {
        this.setScoreTypeOrder_(opt_scoreSortType);
        this.setBaseOrder_();
        this.setInnerOrder_();
        return this;
    }

    /**
     * @param {string=} opt_name
     * @return {Object}
     */
    setSearchString(opt_name) {
        if (opt_name) {
            this.setNameWhere_(opt_name);
            this.isGeoData_ = true;
        }

        return this;
    }

    /**
     * @param {Array<number>=} opt_classes
     * @return {Object}
     */
    setClasses(opt_classes) {
        if (opt_classes && opt_classes.length) {
            this.addressSearchParams_.or(
                squel.expr()
                    .and('address_search_data.type = ?',
                        addressSearchType.fields.EDUCATIONAL_GRADES
                    )
                    .and(
                        'address_search_data.values && ' +
                        this.intArrayToSql_(opt_classes)
                    )
            );

            this.addressDataCount_++;
        }

        return this;
    }

    /**
     * @param {Array<number>=} opt_schoolType
     * @return {Object}
     */
    setSchoolType(opt_schoolType) {
        if (opt_schoolType && opt_schoolType.length) {
            this.schoolSearchParams_.or(
                squel.expr()
                    .and(
                        'school_search_data.type = ?',
                        schoolSearchType.fields.SCHOOL_TYPE
                    )
                    .and(
                        'school_search_data.values && ' +
                            this.intArrayToSql_(opt_schoolType)
                    )
            );

            this.schoolDataCount_++;
        }

        return this;
    }

    /**
     * @param {Array<number>=} opt_studyResult
     * @param {string} studyType
     * @return {Object}
     */
    setStudyResult(opt_studyResult, studyType) {
        if (opt_studyResult && opt_studyResult.length) {
            this.schoolSearchParams_.or(
                squel.expr()
                .and(
                    'school_search_data.type = ?',
                    this.examTypes_[studyType]
                )
                .and(
                    'school_search_data.values @> ' +
                    this.intArrayToSql_(opt_studyResult)
                )
            );

            this.schoolDataCount_++;
        }

        return this;
    }

    /**
     * @param {number=} opt_areaId
     * @return {Object}
     */
    setArea(opt_areaId) {
        if (opt_areaId) {
            this.innerQuery_.where('area.id = ' + opt_areaId);
            this.isGeoData_ = true;
        }

        return this;
    }

    /**
     * @param {number=} opt_metroId
     * @return {Object}
     */
    setMetro(opt_metroId) {
        if (opt_metroId) {
            this.innerQuery_.where('metro.id = ' + opt_metroId);
            this.isGeoData_ = true;
        }

        return this;
    }

    /**
     * @param {number=} opt_districtId
     * @return {Object}
     */
    setDistrict(opt_districtId) {
        if (opt_districtId) {
            this.innerQuery_.where('district.id = ' + opt_districtId);
            this.isGeoData_ = true;
        }

        return this;
    }

    /**
     * Get query string
     * @return {string}
     */
    getQuery() {
        this.setGeoJoin_()
            .setSearchData_();
        return this.baseQuery_
            .from(
                this.innerQuery_,
                'school'
            )
            .toString();
    }

    /**
     * Main query object
     * @private
     * @return {Object}
     */
    generateBaseQuery_() {
        return squel.select({
            autoQuoteAliasNames: true,
            tableAliasQuoteCharacter: '"'
        })
        .field('school.id')
        .field('school.name')
        .field('school.full_name', 'fullName')
        .field('school.rank_dogm', 'rankDogm')
        .field('school.description')
        .field('school.score')
        .field('school.total_score', 'totalScore')
        .field('school.score_count', 'scoreCount')
        .field('school.count_results', 'countResults')
        .field('address.id', 'addressId')
        .field('metro.id', 'metroId')
        .field('metro.name', 'metroName')
        .field('area.id', 'areaId')
        .field('area.name', 'areaName')
        .field('address.coords', 'addressCoords')
        .field('address.name', 'addressName')
        .field('department.educational_grades', 'departmentEducationalGrades')
        .where('address.is_school = true')
        .left_join('address', null, 'school.id = address.school_id')
        .left_join(
            'address_metro',
            null,
            'address.id = address_metro.address_id'
        )
        .left_join('metro', null, 'metro.id = address_metro.metro_id')
        .left_join('area', null, 'area.id = address.area_id')
        .left_join('department', null, 'address.id = department.address_id');
    }

    /**
     * @private
     * @param {number} offset
     * @param {number} opt_limit
     * @return {Object}
     */
    generateInnerQuery_() {
        return squel.select()
            .field('school.id')
            .field('school.name')
            .field('school.full_name')
            .field('school.rank_dogm')
            .field('school.description')
            .field('school.score')
            .field('school.total_score')
            .field('school.score_count')
            .field('COUNT(*) OVER()', 'count_results')
            .group('school.id');
    }

    /**
     * @private
     * @param {number=} opt_scoreSortType
     * @return {Object}
     */
    setScoreTypeOrder_(opt_scoreSortType) {
        var sortType = opt_scoreSortType || 0;
        this.baseQuery_
            .order('school.score[' + sortType + '] DESC NULLS LAST', null);
        this.innerQuery_
            .order('school.score[' + sortType + '] DESC NULLS LAST', null);

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setBaseOrder_() {
        this.baseQuery_
            .order('school.total_score', false)
            .order('school.score DESC NULLS LAST', null)
            .order('school.id')
            .order('address_metro.distance');

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setInnerOrder_() {
        this.innerQuery_
            .order('school.total_score', false)
            .order('school.score DESC NULLS LAST', null)
            .order('school.id');

        return this;
    }

    /**
     * @private
     * @param {string} name
     * @return {Object}
     */
    setNameWhere_(name) {
        var searchString = '%' + name + '%';
        this.innerQuery_
            .where(
                squel.expr()
                    .or('school.name ILIKE ?', searchString)
                    .or('school.full_name ILIKE ?', searchString)
                    .or('metro.name ILIKE ?', searchString)
                    .or('area.name ILIKE ?', searchString)
            );

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setGeoJoin_() {
        if (this.addressDataCount_ || this.isGeoData_) {
            this.innerQuery_
                .left_join('address', null, 'school.id = address.school_id')
                .left_join(
                    'address_metro',
                    null,
                    'address.id = address_metro.address_id'
                )
                .left_join('metro', null, 'metro.id = address_metro.metro_id')
                .left_join('area', null, 'area.id = address.area_id')
                .left_join('district', null, 'district.id = area.district_id');
        }

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setSearchData_() {
        this.setSchoolSearchData_();
        this.setAddressSearchData_();

        this.innerQuery_
            .from('school');

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setSchoolSearchData_() {
        if (this.schoolDataCount_) {
            this.innerQuery_
                .from('school_search_data')
                .where(this.schoolSearchParams_)
                .where('school.id = school_search_data.school_id')
                .having(
                    'COUNT(DISTINCT school_search_data.id) = ' +
                    this.schoolDataCount_
                );
        }

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setAddressSearchData_() {
        if (this.addressDataCount_) {
            this.innerQuery_
                .from('address_search_data')
                .where(this.addressSearchParams_)
                .where('address.id = address_search_data.address_id')
                .having(
                    'COUNT(DISTINCT address_search_data.id) = ' +
                    this.addressDataCount_
                );
        }

        return this;
    }

    /**
     * @private
     * @param {Array<number>} arr
     * @return {string}
     */
    intArrayToSql_(arr) {
        return 'ARRAY [' + arr.map(number => '\'' + number + '\'') +
            ']::INTEGER[]';
    };
}

module.exports = SearchQuery;
