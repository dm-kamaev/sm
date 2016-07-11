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

        /**
         * @type {Array<Object>}
         */
        this.searchData_ = address.searchData;
    }

    /**
     * Actualize address related search data
     */
    actualize() {
        this.actualizeEducationalGrades_();
        this.actualizeMetro_();
        this.actualizeArea_();
    }

    /**
     * @private
     */
    actualizeEducationalGrades_() {
        var educationalGrades = this.getEducationalGrades_(),
            searchType = searchTypeEnum.EDUCATIONAL_GRADES;
        this.upsertData_(searchType, educationalGrades);
    }

    /**
     * @private
     */
    actualizeMetro_() {
        var metroIds = this.address_.addressMetroes.map(addressMetro =>
            addressMetro['metro_id']),
            searchType = searchTypeEnum.METRO;
        this.upsertData_(searchType, metroIds);
    }

    /**
     * @private
     */
    actualizeArea_() {
        var areaId = [this.address_.area_id],
            searchType = searchTypeEnum.AREA;
        this.upsertData_(searchType, areaId);
    }

    /**
     * @private
     * @param {string} searchType
     * @param values {Array<number>}
     */
    upsertData_(searchType, values) {
        if (this.getSearchDataByType_(searchType)) {
            services.addressSearch.update(this.searchData_.id, {
                values: values,
                entityType: entityType.SCHOOL,
                entityId: this.address_.school_id
            });
        } else if (values.length) {
            services.addressSearch.create({
                addressId: this.address_.id,
                type: searchType,
                values: values,
                entityType: entityType.SCHOOL,
                entityId: this.address_.school_id
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
     * @param {string} searchType
     * @return {(Object | undefined)}
     */
    getSearchDataByType_(searchType) {
        return this.searchData_.find(data => data.type === searchType);
    }
}

module.exports = AddressActualizer;
