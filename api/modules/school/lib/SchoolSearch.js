'use strict';

var squel = require('squel').useFlavour('postgres');

var SearchQuery = require('../../entity/lib/Search');

var addressSearchType = require('../../geo/enums/addressSearchType'),
    schoolSearchType = require('../enums/searchType'),
    entityType = require('../../entity/enums/entityType');

class SchoolSearchQuery extends SearchQuery {
    /**
     * Constructor
     */
    constructor() {
        super();

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
         * @type {number}
         */
        this.schoolDataCount_ = 0;
    }

    /**
     * @param {(Array<number>|undefined)} classes
     * @return {Object}
     */
    setClasses(classes) {
        this.addAddressSearchData_(
            classes,
            addressSearchType.fields.EDUCATIONAL_GRADES,
            entityType.SCHOOL
        );

        return this;
    }

    /**
     * @param {(Array<number>|undefined)} schoolType
     * @return {Object}
     */
    setSchoolType(schoolType) {
        this.addSchoolSearchData_(
            schoolType,
            schoolSearchType.fields.SCHOOL_TYPE,
            true
        );

        return this;
    }

    /**
     * @param {(Array<number>|undefined)} studyResult
     * @param {string} studyType
     * @return {Object}
     */
    setStudyResult(studyResult, studyType) {
        this.addSchoolSearchData_(
            studyResult,
            this.examTypes_[studyType]
        );

        return this;
    }

    /**
     * Set to query condition about selected specialized class types
     * @param {(Array<number>|undefined)} specializedClassType
     * @return {Object}
     */
    setSpecializedClassType(specializedClassType) {
        this.addSchoolSearchData_(
            specializedClassType,
            schoolSearchType.fields.SPECIALIZED_CLASS_TYPE,
            true
        );

        return this;
    }


    /**
     * Set to query condition about selected activity spheres
     * @param {(Array<number>|undefined)} activitySphere
     * @return {Object}
     */
    setActivitySphere(activitySphere) {
        this.addSchoolSearchData_(
            activitySphere,
            schoolSearchType.fields.ACTIVITY_SPHERE,
            true
        );

        return this;
    }

    /**
     * @param {(number|undefined)} areaId
     * @return {Object}
     */
    setArea(areaId) {
        if (areaId) {
            this.addAddressSearchData_(
                [areaId],
                addressSearchType.fields.AREA,
                entityType.SCHOOL
            );
        }

        return this;
    }

    /**
     * @param {(number|undefined)} metroId
     * @return {Object}
     */
    setMetro(metroId) {
        if (metroId) {
            this.addAddressSearchData_(
                [metroId],
                addressSearchType.fields.METRO,
                entityType.SCHOOL
            );
        }

        return this;
    }

    /**
     * @param {(number|undefined)} districtId
     * @return {Object}
     */
    setDistrict(districtId) {
        if (districtId) {
            this.addAddressSearchData_(
                [districtId],
                addressSearchType.fields.DISTRICT,
                entityType.SCHOOL
            );
        }

        return this;
    }

    /**
     * @private
     */
    setBaseQuery_() {
        this.baseQuery_
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
            .field('address.is_school', 'addressIsSchool')
            .field(
                'department.educational_grades',
                'departmentEducationalGrades'
            )
            .field('school.result_count', 'countResults')
            .left_join(
                'address',
                null,
                'school.id = address.entity_id AND ' +
                    'address.entity_type = \'school\''
            )
            .left_join(
                'address_metro',
                null,
                'address.id = address_metro.address_id'
            )
            .left_join('metro', null, 'metro.id = address_metro.metro_id')
            .left_join('area', null, 'area.id = address.area_id')
            .left_join(
                'department',
                null,
                'address.id = department.address_id'
            );
    }

    /**
     * @private
     */
    setInnerQuery_() {
        this.innerQuery_
            .from('school')
            .field('school.id')
            .field('school.name')
            .field('school.full_name')
            .field('school.rank_dogm')
            .field('school.description')
            .field('school.score')
            .field('school.total_score')
            .field('school.score_count')
            .field('COUNT(school.id) OVER()', 'result_count');
    }

    /**
     * @private
     * @return {string}
     */
    getAlias_() {
        return 'school';
    }

    /**
     * @private
     * @param {number} sortType
     */
    setTypeOrder_(sortType) {
        this.baseQuery_
            .order('school.score[' + sortType + '] DESC NULLS LAST', null);
        this.innerQuery_
            .order('school.score[' + sortType + '] DESC NULLS LAST', null);
    }

    /**
     * @private
     */
    setQueriesOrder_() {
        this.setBaseOrder_();
        this.setInnerOrder_();
    }

    /**
     * @private
     */
    setBaseOrder_() {
        this.baseQuery_
            .order('school.total_score', false)
            .order('school.score DESC NULLS LAST', null)
            .order('school.id', true)
            .order('address_metro.distance');
    }

    /**
     * @private
     */
    setInnerOrder_() {
        this.innerQuery_
            .order('school.total_score', false)
            .order('school.score DESC NULLS LAST', null)
            .order('school.id', true);
    }

    /**
     * @private
     * @param {string} searchString
     */
    setStringWhere_(searchString) {
        this.setNameWhere_(searchString);
        this.setNameJoinAndGroup_();
    }

    /**
     * @private
     * @param {string} name
     */
    setNameWhere_(name) {
        this.innerQuery_
            .where(
                squel.expr()
                    .or('school.name ILIKE :name')
                    .or('school.full_name ILIKE :name')
                    .or('school.abbreviation ILIKE :name')
                    .or('metro.name ILIKE :name')
                    .or('area.name ILIKE :name')
                    .or('district.name ILIKE :name')
                    .toString()
            );
    }

    /**
     * @private
     */
    setNameJoinAndGroup_() {
        this.innerQuery_
            .left_join(
                'address',
                null,
                'school.id = address.entity_id AND ' +
                    'address.entity_type = \'school\''
            )
            .left_join(
                'address_metro',
                null,
                'address.id = address_metro.address_id'
            )
            .left_join('metro', null, 'metro.id = address_metro.metro_id')
            .left_join('area', null, 'area.id = address.area_id')
            .left_join('district', null, 'district.id = area.district_id')
            .group('school.id');
    }

    /**
     * @private
     */
    updateInnerWhere_() {
        if (this.addressDataCount_) {
            this.innerQuery_
                .where(
                    'school.id IN (' + this.generateAddressDataQuery_() + ')'
                );
        }

        if (this.schoolDataCount_) {
            this.innerQuery_
                .where(
                    'school.id IN (' + this.generateSchoolDataQuery_() + ')'
                );
        }
    }

    /**
     * @private
     * @param {Array<number>} values
     * @param {string} type
     * @param {boolean=} opt_overlap
     */
    addSchoolSearchData_(values, type, opt_overlap) {
        if (values && values.length) {
            var operator = opt_overlap ? '&&' : '@>';
            this.schoolSearchParams_.or(
                squel.expr()
                    .and(
                        'school_search_data.type = ?',
                        type
                    )
                    .and(
                        'school_search_data.values ' + operator + ' ' +
                        this.intArrayToSql_(values)
                    )
                    .toString()
            );

            this.schoolDataCount_++;
        }
    }

    /**
     * @private
     * @return {Object}
     */
    generateSchoolDataQuery_() {
        return squel.select()
            .from('school_search_data')
            .field('DISTINCT school_id')
            .where(
                this.schoolSearchParams_.toString()
            )
            .group('school_id')
            .having(
                'COUNT(DISTINCT id) = ' + this.schoolDataCount_
            )
            .toString();
    }
}

module.exports = SchoolSearchQuery;
