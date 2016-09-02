'use strict';

var squel = require('squel').useFlavour('postgres');

class SearchQuery {
    /**
     * Init inner queries
     */
    constructor() {
        /**
         * @protected
         * @type {Object}
         */
        this.baseQuery_ = this.generateBaseQuery_();

        /**
         * @protected
         * @type {Object}
         */
        this.innerQuery_ = this.generateInnerQuery_();

        /**
         * @protected
         * @type {number}
         */
        this.addressDataCount_ = 0;

        /**
         * @private
         * @type {Object}
         */
        this.addressSearchParams_ = squel.expr();
    }

    /**
     * Get query string
     * @return {string}
     */
    getQuery() {
        this.updateQueries_();
        this.updateInnerWhere_();
        return this.baseQuery_
            .from(
                this.innerQuery_,
                this.getAlias_()
            )
            .toString();
    }

    /**
     * @param {(number|undefined)} limit
     * @return {Object}
     */
    setLimit(limit) {
        if (limit) {
            this.innerQuery_.limit(limit);
        }

        return this;
    }

    /**
     * @param {number} offset
     * @return {Object}
     */
    setOffset(offset) {
        this.innerQuery_.offset(offset);

        return this;
    }

    /**
     * @param {(number|undefined)} scoreSortType
     * @return {Object}
     */
    setSortType(scoreSortType) {
        if (scoreSortType && scoreSortType !== '0') {
            this.setScoreTypeOrder_(scoreSortType);
        }
        this.setQueriesOrder_();

        return this;
    }

    /**
     * @param {(string|undefined)} searchString
     * @return {Object}
     */
    setSearchString(searchString) {
        if (searchString) {
            this.setStringWhere_(searchString);
        }

        return this;
    }

    /* Protected methods */

    /**
     * @protected
     * @param {Array<number>} values
     * @param {string} type
     * @param {string} entityType
     */
    addAddressSearchData_(values, type, entityType) {
        if (values && values.length) {
            this.addressSearchParams_.or(
                squel.expr()
                    .and(
                        'address_search_data.type = ?',
                        type
                    )
                    .and(
                        'address_search_data.values @> ' +
                        this.intArrayToSql_(values)
                    )
                    .and(
                        'address_search_data.entity_type = ?',
                        entityType
                    )
                    .toString()
            );

            this.addressDataCount_++;
        }
    }

    /**
     * @protected
     * @return {Object}
     */
    generateAddressDataQuery_() {
        return squel.select()
            .from('address_search_data')
            .field('DISTINCT entity_id')
            .where(
                this.addressSearchParams_.toString()
            )
            .group('entity_id')
            .group('address_id')
            .having(
                'COUNT(DISTINCT id) = ' + this.addressDataCount_
            )
            .toString();
    }

    /* Private methods */

    /**
     * Main query object
     * @private
     * @return {Object}
     */
    generateBaseQuery_() {
        return squel.select({
            autoQuoteAliasNames: true,
            tableAliasQuoteCharacter: '"'
        });
    }

    /**
     * @private
     * @return {Object}
     */
    generateInnerQuery_() {
        return squel.select();
    }

    /**
     * @private
     */
    updateQueries_() {
        this.setBaseQuery_();
        this.setInnerQuery_();
    }

    /**
     * @private
     * @param {Array<number>} arr
     * @return {string}
     */
    intArrayToSql_(arr) {
        return 'ARRAY [' + arr.map(number => '\'' + number + '\'') +
            ']::INTEGER[]';
    };

    /* Virtual methods */

    /**
     * Set base params
     * @virtual
     */
    setBaseQuery_() {}

    /**
     * Set inner params
     * @virtual
     */
    setInnerQuery_() {}

    /**
     * Alias for inner query
     * @virtual
     * @return {string}
     */
    getAlias_() {}

    /**
     * @virtual
     * @param {number} scoreSortType
     */
    setScoreTypeOrder_(scoreSortType) {}

    /**
     * @virtual
     */
    setQueriesOrder_() {}

    /**
     * @virtual
     * @param {string} searchString
     */
    setStringWhere_(searchString) {}

    /**
     * @virtual
     */
    updateInnerWhere_() {}
}

module.exports = SearchQuery;
