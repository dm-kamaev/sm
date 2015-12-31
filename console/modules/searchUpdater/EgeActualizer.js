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
     * @param {object} school
     * @param {array<object>} citySubjects - subject instances with avg results for Moscow
     */
    constructor(school, citySubjects) {
        await(super(school)); //call parent constructor
        this.citySubjects_ = citySubjects;
        this.resultSubjects_ = [];
        this.searchType_ = searchType.EGE;
    }


    /**
     * @private
     * Try to get 'good' subjects for 2015 year, 
     * then if there are no 2015 results for subject
     * try to use 2014 results, etc
     */
    getSubjects_() {
        var yearsResults = [],
            processedSubjects = [];
        //TODO: move years in constants
        for (var year = 2015; year >= 2010; year--) {
            var yearResults = this.getYearResults_(year);
            yearsResults.push(
                await(this.getYearSubjects_(yearResults, year))
            );
        }

        yearsResults.forEach(subjectArr => {
            subjectArr.forEach(subjectRec => {
                var index = processedSubjects.indexOf(subjectRec.id),
                    isProcessed = index == -1 ? false : true;
                if (!isProcessed) {
                    if (subjectRec.isPassed)
                        this.resultSubjects_.push(subjectRec.id);
                    processedSubjects.push(subjectRec.id);
                }
            });
        }); 
    }

    /**
     * @private
     * @param {array<object>} yearResults
     * @param {number} year
     * @return {array<id, isPassed>} yearSubjects
     * get array of subjects IDs where school ege result > city avg result for year
     */
    getYearSubjects_(yearResults, year) {
        //TODO: refactor or comment this
        var yearSubjects = [];
        await (yearResults.forEach(egeResult => { 
            var citySubject = this.citySubjects_.find(
                subj => subj.id == egeResult.subject_id);
            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (
                        res.cityId == this.school_.city_id &&
                        res.year == year &&
                        res.type == searchType.EGE
                    ));
                if (cityResult) {
                    var isPassed;
                    if (egeResult.result >= cityResult.result)
                        isPassed = true;
                    else
                        isPassed = false;
                    yearSubjects.push({
                        id: egeResult.subject_id,
                        isPassed: isPassed
                    });
                } 
            }
        }));
        return yearSubjects;
    }

    /**
     * @private
     * get ege results for school
     */
    getResults_() {
        this.egeResults_ = await (this.school_.getEgeResults()); 
    }

    /**
     * @private
     * @param {number} year
     * @return {array<object>}
     * get year ege results for school
     */
    getYearResults_(year) {
        return this.egeResults_.filter(res => res.year == year);
    }
}

module.exports = EgeActualizer;

