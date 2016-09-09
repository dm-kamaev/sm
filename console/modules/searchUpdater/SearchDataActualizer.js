'use strict';
const await = require('asyncawait/await');
const services = require('../../../app/components/services').all;

/**
 * abstract class
 */
class SearchDataActualizer {
    /**
     * @param {Object} school
     */
    constructor(school) {
        /**
         * School to update search data
         * @type {models.School}
         * @private
         */
        this.school_ = school;

        /**
         * All search data, associated with given school
         * @type {?models.schoolSearchData}
         * @private
         */
        this.searchData_ = null;

        /**
         * Type of current search data
         * @type {?string}
         * @private
         */
        this.searchType = null;
    }

    /**
     * @public
     * actualize search data for given school
     */
    actualize() {
        await(this.init());

        var values = await(this.getValues());
        if (values.length) {
            await(this.updateDb_(values));
        }
    }

    /**
     * Init class
     * @public
     */
    init() {
        this.searchData_ = await(this.getSearchData_());
    }


    /**
     * Get search data for given school and search type
     * @return {?models.SchoolSearchData}
     * @private
     */
    getSearchData_() {
        var searchData =
            await(services.schoolSearch.getSchoolRecords(
                this.school_.id,
                this.searchType_
            ));

    /** As service uses model.getAll it return array of 0 or 1 element **/
        return searchData.length ?
            searchData[0] :
            null;
    }


    /**
     * Get values for school search data
     * @return {Array<number>}
     * @protected
     */
    getValues() {
        return [];
    }

    /**
     *
     * @param {Array<number>} searchValues
     * @private
     */
    updateDb_(searchValues) {
        if (this.searchData_) {
            await(this.searchData_.update({
                values: searchValues
            }));
        } else {
            await(services.schoolSearch.addSearchData(
                this.school_.id,
                searchValues,
                this.searchType_
            ));
        }
    }
}

module.exports = SearchDataActualizer;
