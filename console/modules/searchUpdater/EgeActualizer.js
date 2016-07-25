'use strict';
const SearchDataActualizer = require('./SearchDataActualizer');
const await = require('asyncawait/await');
const searchType = require('../../../api/modules/school/enums/searchType');

/**
 * Used to actualize ege search data for one school
 */
class EgeActualizer extends SearchDataActualizer {
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
        this.searchType_ = searchType.fields.EGE;
    }


    /**
     * Get ege values for school search data
     * @override
     * @protected
     */
    getValues() {
        var egeResults = this.getResults_();

        return this.getSubjects_(egeResults);
    }


    /**
     * Try to get 'good' subjects for 2015 year,
     * then if there are no 2015 results for subject
     * try to use 2014 results, etc
     * @param {Array<models.EgeResult>} egeResults
     * @return {Array<number>}
     * @private
     */
    getSubjects_(egeResults) {
        var yearsResults = [],
            processedSubjects = [],
            resultSubjects = [];
        // TODO: move years in constants
        for (var year = 2015; year >= 2010; year--) {
            var yearResults = this.getYearResults_(egeResults, year);
            yearsResults.push(
                await(this.getYearSubjects_(yearResults, year))
            );
        }

        yearsResults.forEach(subjectArr => {
            subjectArr.forEach(subjectRec => {
                var index = processedSubjects.indexOf(subjectRec.id),
                    isProcessed = index != -1;
                if (!isProcessed) {
                    if (subjectRec.isPassed) {
                        resultSubjects.push(subjectRec.id);
                    }
                    processedSubjects.push(subjectRec.id);
                }
            });
        });
        return resultSubjects;
    }

    /**
     * @private
     * @param {Array<models.EgeResult>} yearResults
     * @param {number} year
     * @return {Array<{
     *     id: number,
     *     isPassed: boolean
     * }>} yearSubjects
     * get array of subjects IDs
     * where school ege result > city avg result for year
     */
    getYearSubjects_(yearResults, year) {
        // TODO: refactor or comment this
        var yearSubjects = [];
        await(yearResults.forEach(egeResult => {
            var citySubject = this.citySubjects_.find(
                    subj => subj.id == egeResult.subjectId
            );

            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (
                        res.cityId == this.school_.cityId &&
                        res.year == year &&
                        res.type == this.searchType_
                    )
                );

                if (cityResult) {
                    var isPassed;
                    if (egeResult.result >= cityResult.result) {
                        isPassed = true;
                    } else {
                        isPassed = false;
                    }
                    yearSubjects.push({
                        id: egeResult.subjectId,
                        isPassed: isPassed
                    });
                }
            }
        }));

        return yearSubjects;
    }

    /**
     * get ege results for school
     * @return {Array<models.EgeResult>}
     * @private
     */
    getResults_() {
        return await(this.school_.getEgeResults());
    }

    /**
     * get year ege results for school filtered by given year
     * @param {Array<models.EgeResult>} egeResults
     * @param {number} year
     * @return {Array<models.EgeResult>}
     * @private
     */
    getYearResults_(egeResults, year) {
        return egeResults.filter(res => res.year == year);
    }
}

module.exports = EgeActualizer;
