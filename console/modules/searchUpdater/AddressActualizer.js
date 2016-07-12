'use strict';

const lodash = require('lodash');

const services = require('../../../app/components/services').all,
    searchTypeEnum =
        require('../../../api/modules/geo/enums/addressSearchType');

class AddressActualizer {
    /**
     * @param {Object} address
     */
    constructor(address) {
        /**
         * @type {Object}
         */
        this.address_ = address;
    }

    /**
     * Actualize address related search data
     */
    actualize() {
        this.actualizeEducationalGrades_();
    }

    /**
     * @private
     */
    actualizeEducationalGrades_() {
        var educationalGrades = this.getEducationalGrades_(),
            searchData = this.address_.searchData,
            searchType = searchTypeEnum.EDUCATIONAL_GRADES;
        if (this.getSearchDataByType_(searchData, searchType)) {
            services.addressSearch.update(searchData.id, {
                values: educationalGrades
            });
        } else if (educationalGrades.length) {
            services.addressSearch.create({
                addressId: this.address_.id,
                type: searchType,
                values: educationalGrades
            });
        }
    }

    /**
     * @private
     * @return {Array<number>}
     */
    getEducationalGrades_() {
        return lodash
            .chain(this.address_.departments
                .map(department => department.educationalGrades))
            .flatten()
            .uniq()
            .filter((grade) => grade !== null)
            .value();
    }

    /**
     * @private
     * @param {Array<Object>} searchData
     * @param {string} searchType
     * @return {(Object | undefined)}
     */
    getSearchDataByType_(searchData, searchType) {
        return searchData.find(data => data.type === searchType);
    }
}

module.exports = AddressActualizer;
