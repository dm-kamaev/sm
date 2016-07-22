'use strict';

var await = require('asyncawait/await'),
    lodash = require('lodash');

var services = require('../../../app/components/services').all;

class TextActualizer {

    /**
     * @param {Array<Object>} data
     * @param {string} type
     * @param {Array<string>} fieldsToUpdate
     */
    constructor(data, type, fieldsToUpdate) {
        /**
         * @private
         * @type {Array<Object>}
         */
        this.data_ = data;

        /**
         * @private
         * @type {string}
         */
        this.type_ = type;

        /**
         * @private
         * @type {Array<string>}
         */
        this.fieldsToUpdate_ = fieldsToUpdate;

        /**
         * @private
         * @type {Array<Object>}
         */
        this.textSearchData_ = await(services.textSearchData.getAll());
    }

    /**
     * @param {Array<Object>} data
     */
    set data(data) {
        this.data_ = data || [];
    }

    /**
     * Main method
     */
    actualize() {
        this.data_.forEach(item => {
            this.actualizeItem_(item);
        });
    }

    /**
     * @private
     * @param {Object}
     */
    actualizeItem_(item) {
        this.fieldsToUpdate_.forEach(field => {
            this.actualizeData_(item, field);
        });
    }

    /**
     * @private
     * @param {Object} item
     * @param {string} field
     */
    actualizeData_(item, field) {
        var searchData = this.getSearchData_(item[field]);
        console.log(searchData); process.exit();
    }

    /**
     * @private
     * @param {string} value
     * @param {string} type
     */
    getSearchData_(value) {
        return lodash.find(this.textSearchData_, item => {
            return item.originalText === value &&
                item.entityType === this.type_;
        });
    }
}

module.exports = TextActualizer;
