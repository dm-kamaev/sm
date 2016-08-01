'use strict';

var squel = require('squel').useFlavour('postgres');

module.exports = class {
    /**
     * @param {Array<string>} entityTypes
     */
    constructor(entityTypes) {
        /**
         * @private
         * @type {Array<string>}
         */
        this.entityTypes_ = entityTypes;

        /**
         * @private
         * @type {Object}
         */
        this.query_ = this.generateQuery_();
    }

    /**
     * @return {string}
     */
    getQuery() {
        return this.query_.toString();
    }

    /**
     * @param {string} searchString
     * @return {Object}
     */
    setSearchString(searchString) {
        var whereExpression = squel.expr(),
            substrings = this.extractSubstrings_(searchString);

        substrings.forEach(substring =>
            whereExpression.and('formatted_text LIKE ?', substring)
        );

        this.query_.where(whereExpression);

        return this;
    }

    /**
     * @private
     * @return {Object}
     */
    generateQuery_() {
        return squel.select({autoQuoteAliasNames: true})
            .from('text_search_data')
            .field('DISTINCT entity_id', 'entityId')
            .field('entity_type', 'entityType')
            .where('entity_type IN (\'' +
                this.entityTypes_.join('\', \'') +
                '\')'
            )
            .limit(10);
    }

    /**
     * @private
     * @param {string} searchString
     * @return {Array<string>}
     */
    extractSubstrings_(searchString) {
        return searchString
            .toLowerCase()
            .trim()
            .replace(/[^\wа-яА-ЯёЁ\-\s]/g, '')
            .replace(/ {2,}/g, ' ')
            .split(' ')
            .map(string => '%' + string + '%');
    }
};
