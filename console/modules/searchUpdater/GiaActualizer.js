'use strict';
const SearchDataActualizer = require('./SearchDataActualizer');
const await = require('asyncawait/await');
const searchType = require('../../../api/modules/school/enums/searchType');

/**
 * Used to actualize gia search data for one school
 */
class GiaActualizer extends SearchDataActualizer {
    /**
     * @public
     * @param {models.School} school
     * @param {Array<models.Subject>} citySubjects - subject instances
     *     with avg results for Moscow
     */
    constructor(school, citySubjects) {
        super(school); // call parent constructor

        /**
         * Subject instances with avg results for Moscow
         * @type {Array<models.Subject>}
         * @private
         */
        this.citySubjects_ = citySubjects;

        /**
         * Type of current search data
         * @type {string}
         * @private
         */
        this.searchType_ = searchType.fields.GIA;
    }


    /**
     * Get olympiads values for school search data
     * @return {Array<number>}
     * @override
     * @protected
     */
    getValues() {
        var giaResults = this.getResults_();
        return this.getSubjects_(giaResults);
    }


    /**
     * get gia results for school
     * @return {Array<models.GiaResult>}
     * @private
     */
    getResults_() {
        return await(this.school_.getGiaResults());
    }

    /**
     * get array of subjects IDs where school gia result > city avg result
     * it works, I promise
     * @param {Array<models.GiaResult>} giaResults
     * @return {Array<number>}
     * @private
     */
    getSubjects_(giaResults) {
        // TODO: refactor or comment this
        var resultSubjects = [];
        await(giaResults.forEach(giaResult => {
            var citySubject = this.citySubjects_.find(
                subj => subj.id == giaResult.subjectId);

            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (
                        res.cityId == this.school_.city_id &&
                        res.type == this.searchType_
                    ));
                if (cityResult && giaResult.result >= cityResult.result) {
                    resultSubjects.push(giaResult.subjectId);
                }
            }
        }));
        console.log(resultSubjects);
        
        return resultSubjects;
    }
}

module.exports = GiaActualizer;
