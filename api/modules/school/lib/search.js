'use strict';

var squel = require('squel').useFlavour('postgres');

var schoolSearchType = require('../enums/searchType'),
    addressSearchType = require('../../geo/enums/addressSearchType'),
    entityType = require('../../entity/enums/entityType');

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
        this.countQuery_ = this.generateCountQuery_();

        /**
         * @private
         * @type {Object}
         */
        this.examTypes_ = {
            gia: schoolSearchType.fields.GIA,
            ege: schoolSearchType.fields.EGE,
            olymp: schoolSearchType.fields.OLIMPIAD
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
        this.addAddressSearchData_(
            opt_classes,
            addressSearchType.fields.EDUCATIONAL_GRADES
        );

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
     * Set to query condition about selected specialized class types
     * @param {Array<number>} opt_specializedClassType
     * @return {Object}
     */
    setSpecializedClassType(opt_specializedClassType) {
        if (opt_specializedClassType && opt_specializedClassType.length) {
            this.schoolSearchParams_.or(
                squel.expr()
                    .and(
                    'school_search_data.type = ?',
                    schoolSearchType.fields.SPECIALIZED_CLASS_TYPE
                )
                    .and(
                    'school_search_data.values @> ' +
                    this.intArrayToSql_(opt_specializedClassType)
                )
            );

            this.schoolDataCount_++;
        }

        return this;
    }


    /**
     * Set to query condition about selected activity spheres
     * @param {Array<number>} opt_activitySphere
     * @return {Object}
     */
    setActivitySphere(opt_activitySphere) {
        if (opt_activitySphere && opt_activitySphere.length) {
            this.schoolSearchParams_.or(
                squel.expr()
                    .and(
                    'school_search_data.type = ?',
                    schoolSearchType.fields.ACTIVITY_SPHERE
                )
                    .and(
                    'school_search_data.values @> ' +
                    this.intArrayToSql_(opt_activitySphere)
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
            this.addAddressSearchData_(
                [opt_areaId],
                addressSearchType.fields.AREA
            );
        }

        return this;
    }

    /**
     * @param {number=} opt_metroId
     * @return {Object}
     */
    setMetro(opt_metroId) {
        if (opt_metroId) {
            this.addAddressSearchData_(
                [opt_metroId], addressSearchType.fields.METRO
            );
        }

        return this;
    }

    /**
     * @param {number=} opt_districtId
     * @return {Object}
     */
    setDistrict(opt_districtId) {
        if (opt_districtId) {
            this.addAddressSearchData_(
                [opt_districtId], addressSearchType.fields.DISTRICT
            );
        }

        return this;
    }

    /**
     * Get query string
     * @return {string}
     */
    getQuery() {
        this.setGeoJoin_()
            .setSearchData_()
            .setGeoCount_();
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
     * @return {Object}
     */
    generateInnerQuery_() {
        return squel.select()
            .field('DISTINCT school.id')
            .field('school.name')
            .field('school.full_name')
            .field('school.rank_dogm')
            .field('school.description')
            .field('school.score')
            .field('school.total_score')
            .field('school.score_count')
            .group('school.id');
    }

    /**
     * @private
     * @return {Object}
     */
    generateCountQuery_() {
        return squel.select()
            .field('DISTINCT school.id')
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
            .field('school.score[' + sortType + ']', 'score' + sortType)
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
                    .or('district.name ILIKE ?', searchString)
            );

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setGeoJoin_() {
        if (this.isGeoData_) {
            this.innerQuery_
                .left_join('address', null, 'school.id = address.school_id')
                .left_join(
                    'address_metro',
                    null,
                    'address.id = address_metro.address_id'
                )
                .left_join('metro', null, 'metro.id = address_metro.metro_id')
                .left_join('area', null, 'area.id = address.area_id')
                .left_join('district', null, 'area.district_id = district.id');
        }

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    setGeoCount_() {
        if (this.addressDataCount_) {
            this.baseQuery_
                .from(this.getFromCountQuery_(), 'result_count')
                .field('result_count.count', 'countResults');
        } else {
            this.baseQuery_
                .field('result_count', 'countResults');
            this.innerQuery_
                .field('COUNT(school.id) OVER()', 'result_count');
        }

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    getFromCountQuery_() {
        return squel.select()
            .from(this.countQuery_, 'raw_data')
            .field('COUNT(raw_data.id)');
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

            this.countQuery_
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
                .where('school.id = address_search_data.entity_id')
                .where('address_search_data.entity_type = ?', entityType.SCHOOL)
                .group('address_search_data.address_id')
                .having(
                    'COUNT(DISTINCT address_search_data.id) = ' +
                    this.addressDataCount_
                );

            this.countQuery_
                .from('address_search_data')
                .from('school')
                .where(this.addressSearchParams_)
                .where('school.id = address_search_data.entity_id')
                .where('address_search_data.entity_type = ?', entityType.SCHOOL)
                .group('address_search_data.address_id')
                .having(
                    'COUNT(DISTINCT address_search_data.id) = ' +
                    this.addressDataCount_
                );
        }

        return this;
    }

    /**
     * @private
     * @param {Array<number>} values
     * @param {string} type
     * @return {Object}
     */
    addAddressSearchData_(values, type) {
        if (values && values.length) {
            this.addressSearchParams_.or(
                squel.expr()
                    .and(
                        'address_search_data.type = ?',
                        type
                    )
                    .and(
                        'address_search_data.values @> ' +
                        this.intArrayToSql_(values)
                    )
            );

            this.addressDataCount_++;
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
