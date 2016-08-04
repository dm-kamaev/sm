'use strict';
const SearchDataActualizer = require('./SearchDataActualizer');
const await = require('asyncawait/await');
const searchType = require('../../../api/modules/school/enums/searchType');

/**
 * Used to actualize olymp search data for one school
 */
class OlympActualizer extends SearchDataActualizer {
    /**
     * @constructor
     * @param {models.School} school
     */
    constructor(school) {
        super(school);

        this.resultSubjects_ = [];


        this.searchType_ = searchType.fields.OLIMPIAD;
    }


    /**
     * Get olympiads values for school search data
     * @override
     * @protected
     */
    getValues() {
        var olympiadResults = this.getResults_();

        return this.getSubjects_(olympiadResults);
    }


    /**
     * get olympiads results for school
     * @return {Array<models.OlimpResult>}
     * @private
     */
    getResults_() {
        // TODO: to fix 'Olimp' typo model name must be fixed as well
        return await(this.school_.getOlimpResults());
    }

    /**
     * get array of subjects IDs for school olymp results
     * @param {Array<models.OlimpResult>} olympiadResults
     * @return {Array<number>}
     * @private
     */
    getSubjects_(olympiadResults) {
        var resultSubjects = [];
        olympiadResults.forEach(olympRes => {
            if (!resultSubjects.find(
                    subject => subject == olympRes.subjectId)) {
                resultSubjects.push(olympRes.subjectId);
            }
        });

        return resultSubjects;
    }


}

module.exports = OlympActualizer;
