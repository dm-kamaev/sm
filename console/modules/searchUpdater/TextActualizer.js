'use strict';

var await = require('asyncawait/await'),
    lodash = require('lodash');

var services = require('../../../app/components/services').all;

class TextActualizer {

    /**
     * @param {Array<Object>} data
     * @param {string} entityType
     * @param {Array<string>} fieldsToActualize
     */
    constructor(data, entityType, fieldsToActualize) {
        /**
         * @private
         * @type {Array<Object>}
         */
        this.data_ = data;

        /**
         * @private
         * @type {string}
         */
        this.entityType_ = entityType;

        /**
         * @private
         * @type {Array<string>}
         */
        this.fieldsToActualize_ = fieldsToActualize;

        /**
         * @private
         * @type {Array<Object>}
         */
        this.textSearchData_ = await(services.textSearchData.getByEntityType(
            entityType
        ));
    }

    /**
     * Main method
     * @return {Promise<Array>}
     */
    actualize() {
        var actualized = [];
        this.data_.forEach(item => {
            actualized.push(this.actualizeItem_(item));
        });
        return actualized;
    }

    /**
     * @private
     * @param {Object} item
     * @return {Array<Object>}
     */
    actualizeItem_(item) {
        var actualized = [];
        this.fieldsToActualize_.forEach(field => {
            if (item[field]) {
                actualized.push(this.actualizeData_(item, field));
            }
        });
        return actualized;
    }

    /**
     * @private
     * @param {Object} item
     * @param {string} field
     * @return {Promise<Object>}
     */
    actualizeData_(item, field) {
        var searchData = this.getSearchData_(
                item.id,
                field
            ),
            actualized;
        if (!searchData) {
            actualized = services.textSearchData.create({
                entityId: item.id,
                entityType: this.entityType_,
                formattedText: this.formatText_(item[field]),
                originalText: item[field],
                type: field
            });
        } else if (searchData.formattedText !== item[field]) {
            actualized = searchData.update({
                formattedText: this.formatText_(item[field]),
                originalText: item[field]
            });
        }
        return actualized;
    }

    /**
     * @private
     * @param {string} entityId
     * @param {string} type
     * @return {Object}
     */
    getSearchData_(entityId, type) {
        return lodash.find(this.textSearchData_, item => {
            return item.entityId === entityId &&
                item.entityType === this.entityType_ &&
                item.type === type;
        });
    }

    /**
     * @private
     * @param {string} text
     * @return {string}
     */
    formatText_(text) {
        return text
            .toLowerCase()
            .replace(/ё/g, 'е');
    }
}

module.exports = TextActualizer;
