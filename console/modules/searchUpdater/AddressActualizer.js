'use strict';

const lodash = require('lodash');

const services = require('../../../app/components/services').all,
    searchTypeEnum =
        require('../../../api/modules/geo/enums/addressSearchType'),
    entityType = require('../../../api/modules/entity/enums/entityType');

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
        this.actualizeMetros_();
        this.actualizeArea_();
        this.actualizeDistrict_();
    }

    /**
     * @private
     */
    actualizeEducationalGrades_() {
        this.actualizeData_(
            this.getEducationalGrades_(),
            searchTypeEnum.EDUCATIONAL_GRADES
        );
    }

    /**
     * @private
     */
    actualizeMetros_() {
        this.actualizeData_(
            this.getMetros_(this.address_.addressMetroes),
            searchTypeEnum.METRO
        );
    }

    /**
     * @private
     */
    actualizeArea_() {
        this.actualizeData_(
            [this.address_.areaId],
            searchTypeEnum.AREA
        );
    }

    /**
     * @private
     */
    actualizeDistrict_() {
        this.actualizeData_(
            [this.address_.area.district.id],
            searchTypeEnum.DISTRICT
        );
    }

    /**
     * @private
     * @param {Array<number>} values
     * @param {string} searchType
     */
    actualizeData_(values, searchType) {
        var searchData = this.getSearchDataByType_(
            this.address_.searchData,
            searchType
        );
        if (searchData) {
            services.addressSearch.update(searchData.id, {
                entityId: this.address_.entityId,
                entityType: entityType.SCHOOL,
                values: values
            });
        } else if (values.length) {
            services.addressSearch.create({
                entityId: this.address_.entityId,
                entityType: entityType.SCHOOL,
                addressId: this.address_.id,
                values: values,
                type: searchType
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
     * @param {Array<Object>} metros
     * @return {Array<number>}
     */
    getMetros_(metros) {
        return metros.map(metro => metro.metroId);
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
