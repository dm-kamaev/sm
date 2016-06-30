'use strict';
const SearchDataActualizer = require('./SearchDataActualizer');
const await = require('asyncawait/await');
const searchType = require('../../../api/modules/school/enums/searchType');

/**
 * Used to actualize olymp search data for one school
 */
class OlympActualizer extends SearchDataActualizer {
    /**
     * @public
     * @param {object} school
     */
    constructor(school) {
        await(super(school)); // call parent constructor
        this.resultSubjects_ = [];
        this.searchType_ = searchType.fields.OLIMPIAD;
    }

    /**
     * @private
     * get array of subjects IDs for school olymp results
     */
    getSubjects_() {
        this.olympResults_.forEach(olympRes => {
            if (!this.resultSubjects_.find(
                    subject => subject == olympRes.subjectId)) {
                this.resultSubjects_.push(olympRes.subjectId);
            }
        });
    }

    /**
     * @private
     * get olymp results for school
     */
    getResults_() {
        // TODO: to fix 'Olimp' typo model name must be fixed as well
        this.olympResults_ = await(this.school_.getOlimpResults());
    }
}

module.exports = OlympActualizer;
