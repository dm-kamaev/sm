'use strict';

const lodash = require('lodash'),
    await = require('asyncawait/await');

const services = require('../../../app/components/services').all,
    searchTypeEnum =
        require('../../../api/modules/geo/enums/addressSearchType'),
    entityTypeEnum = require('../../../api/modules/entity/enums/entityType');

class AddressActualizer {
    /**
     * @param {Object} address
     */
    constructor(address) {
        /**
         * @private
         * @type {Object}
         */
        this.address_ = address;

        /**
         * @private
         * @type {Object}
         */
        this.addressEntityType_ = {
            'school': entityTypeEnum.SCHOOL
        };
    }

    /**
     * Actualize address related search data
     */
    actualize() {
        if (this.address_.entityType === 'school') {
            this.actualizeEducationalGrades_();
        }
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
            ),
            entityType = this.addressEntityType_[this.address_.entityType],
            entityIds;
        if (entityType === 'school') {
            entityIds = [this.address_.entityId];
        } else if (this.address_.courseDepartments.length) {
            entityIds = await(services.course.findByAddressId(
                this.address_.id
            ));
            entityType = entityTypeEnum.COURSE;
        }

        if (searchData.length) {
            this.updateValues_(
                entityIds,
                entityType,
                searchData,
                searchType,
                values
            );
        } else if (values.length) {
            entityIds.forEach(entityId => {
                await(services.addressSearch.create({
                    entityId: entityId,
                    entityType: entityType,
                    addressId: this.address_.id,
                    values: values,
                    type: searchType
                }));
            });
        }
    }

    /**
     * @private
     * @param {Array<number>} entityIds
     * @param {string} entityType
     * @param {Array<Object>} searchData
     * @param {string} searchType
     * @param {Array<number>} values
     */
    updateValues_(entityIds, entityType, searchData, searchType, values) {
        entityIds.forEach(entityId => {
            let where = {
                entityId: entityId,
                entityType: entityType,
                type: searchType,
                addressId: this.address_.id
            };
            if (searchData.find(datum =>
                datum.entityId == entityId && datum.entityType == entityType
            )) {
                await(services.addressSearch.updateByEntity(where, {
                    values: values
                }));
            } else {
                await(services.addressSearch.deleteByEntity(where));
            }
        });
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
        return searchData.filter(data => data.type === searchType);
    }
}

module.exports = AddressActualizer;
