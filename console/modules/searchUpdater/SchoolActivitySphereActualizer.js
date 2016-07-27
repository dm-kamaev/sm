/**
 * @fileOverview Class to actualize table school_search_data
 * It can actualize records only related to school activities
 */
'use strict';

const await = require('asyncawait/await');

const SearchDataActualizer = require('./SearchDataActualizer'),
    services = require('../../../app/components/services').all,
    searchType = require('../../../api/modules/school/enums/searchType');

/**
 * Actualizes school search data related to activities
 */
class SchoolActivitySphereActualizer extends SearchDataActualizer {
    /**
     * @param {models.School} school
     */
    constructor(school) {
        super(school);

        /**
         * school to update
         * @type {models.School}
         * @private
         */
        this.school_ = school;


        /**
         * Type of current search data
         * @type {string}
         * @private
         */
        this.searchType_ = searchType.fields.ACTIVITY_SPHERE;
    }


    /**
     * Get olympiads values for school search data
     * @override
     * @protected
     */
    getValues() {
        return await(this.getActivitySpheres_());
    }


    /**
     * Get all possible activity spheres for school
     * @return {Array<number>}
     * @private
     */
    getActivitySpheres_() {
        var activities =
            await(services.additionalEducation.getUniqueSpheresBySchoolId(
                this.school_.id
            ));

        return activities.map(activity => activity.sphereId);
    }
}

module.exports = SchoolActivitySphereActualizer;
