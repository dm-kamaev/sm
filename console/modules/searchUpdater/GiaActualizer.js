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
     * @param {object} school
     * @param {array<object>} citySubjects - subject instances with avg results for Moscow
     */
    constructor(school, citySubjects) {
        await(super(school, citySubjects)); //call parent constructor
        this.citySubjects_ = citySubjects;
        this.resultSubjects_ = [];
        this.searchType_ = searchType.GIA;
    }


    /**
     * @private
     * get array of subjects IDs where school gia result > city avg result
     * it works, I promise
     */
    getSubjects_() {
        //TODO: refactor or comment this
        await (this.giaResults_.forEach(giaResult => { 
            var citySubject = this.citySubjects_.find(
                subj => subj.id == giaResult.subject_id);
            if (citySubject) {
                var cityResult = citySubject.cityResult.find(
                    res => (
                        res.cityId == this.school_.city_id &&
                        res.type == searchType.GIA
                    ));
                if (cityResult && giaResult.result >= cityResult.result)
                    this.resultSubjects_.push(giaResult.subject_id);
            }
        }));
    }

    /**
     * @private
     * get gia results for school
     */
    getResults_() {
        this.giaResults_ = await (this.school_.getGiaResults()); 
    }
}

module.exports = GiaActualizer;
