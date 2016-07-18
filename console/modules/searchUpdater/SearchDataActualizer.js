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
        this.school_ = school;
        this.currentSearcData_ = await(
            services.search.getSchoolRecords(this.school_.id)
        );
    }

    /**
     * @public
     * actualize olymp search data for school
     */
    actualize() {
        this.getData_();
        await(this.getResults_());
        this.getSubjects_();
        if (this.resultSubjects_.length) {
            await(this.updateDb_());
        }
    }

    /**
     * @private
     * get current gia search data for school
     */
    getData_() {
        this.typeData_ = this.currentSearcData_.find(
            rec => rec.type == this.searchType_
        );
    }

    /**
     * @private
     */
    updateDb_() {
        if (this.typeData_) {
            await(this.typeData_.update({
                values: this.resultSubjects_
            }));
        } else {
            await(services.search.addSearchData(
                this.school_.id,
                this.resultSubjects_,
                this.searchType_)
            );
        }
    }
}

module.exports = SearchDataActualizer;
