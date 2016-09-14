/**
 * @fileOverview Class to actualize table school_search_data
 * It can actualize records only related to school specialized classes
 */


'use strict';

const SearchDataActualizer = require('./SearchDataActualizer'),
    searchType = require('../../../api/modules/school/enums/searchType');

/**
 * Actualizes school search data related to specialized classes
 */
class SpecializedClassTypeActualizer extends SearchDataActualizer {
    /**
     * @param {models.School} school
     * @constructor
     */
    constructor(school) {
        super(school); // call parent constructor

        /**
         * school to update
         * @type {models.School}
         */
        this.school_ = school;


        /**
         * Type of current search data
         * @type {string}
         * @private
         */
        this.searchType_ = searchType.fields.SPECIALIZED_CLASS_TYPE;
    }

    /**
     * Get olympiads values for school search data
     * @return {Array<number>}
     * @override
     * @protected
     */
    getValues() {
        return this.getSpecializedClassTypeIds_();
    }


    /**
     * Get specialized class types from school
     * @return {?Array<number>}
     * @private
     */
    getSpecializedClassTypeIds_() {
        var specializedClasses = this.school_.specializedClasses;

        return specializedClasses ?
            specializedClasses.map(specializedClass => {
                /** As specialized classes stores in db as array with
                 * possible grades as first element and type as second -> return
                 * all types **/
                return specializedClass[1];
            }) :
            [];
    }
}

module.exports = SpecializedClassTypeActualizer;
