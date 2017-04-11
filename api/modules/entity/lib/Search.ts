'use strict';

const squel = require('squel').useFlavour('postgres');

export abstract class SearchQuery {
    protected baseQuery_;
    protected innerQuery_;
    protected addressDataCount_;
    protected addressSearchParams_;

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
    public getQuery(): string {
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
    public setLimit(limit: number | undefined): this {
        if (limit) {
            this.innerQuery_.limit(limit);
        }

        return this;
    }

    /**
     * @param {number} offset
     * @return {Object}
     */
    public setOffset(offset: number): this {
        this.innerQuery_.offset(offset);

        return this;
    }

    /**
     * @param {(number|undefined)} sortType
     * @return {Object}
     */
    public setSortType(sortType: number | undefined): this {
        if (sortType && sortType != 0) {
            this.setTypeOrder_(sortType);
        }
        this.setQueriesOrder_();

        return this;
    }

    /**
     * @param {(string|undefined)} searchString
     * @return {Object}
     */
    public setSearchString(searchString: string | undefined): this {
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
    protected addAddressSearchData_(
            values: Array<number>, type: string, entityType: string): void {
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
     * @return {string}
     */
    protected generateAddressDataQuery_(): string {
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

    /**
    * @protected
    * @param {Array<number>} arr
    * @return {string}
    */
    protected intArrayToSql_(arr: Array<number>): string {
        return 'ARRAY [' + arr.map(item => '\'' + item + '\'') +
        ']::INTEGER[]';
    }

    /* Virtual methods */

    /**
    * Set base params
    * @virtual
    * @protected
    */
    protected abstract setBaseQuery_(): void

    /**
    * Set inner params
    * @virtual
    */
    protected abstract setInnerQuery_(): void

    /**
    * Alias for inner query
    * @virtual
    * @return {string}
    */
    protected abstract getAlias_(): string

    /**
    * @virtual
    * @param {number} sortType
    */
    protected abstract setTypeOrder_(sortType: number): void

    /**
    * @virtual
    */
    protected abstract setQueriesOrder_(): void

    /**
    * @virtual
    * @param {string} searchString
    */
    protected abstract setStringWhere_(searchString: string): void

    /**
    * @virtual
    */
    protected abstract updateInnerWhere_(): void

    /* Private methods */

    /**
     * Main query object
     * @private
     * @return {Object}
     */
    private generateBaseQuery_(): Object {
        return squel.select({
            autoQuoteAliasNames: true,
            tableAliasQuoteCharacter: '"'
        });
    }

    /**
     * @private
     * @return {Object}
     */
    private generateInnerQuery_(): Object {
        return squel.select();
    }

    /**
     * @private
     */
    private updateQueries_(): void {
        this.setBaseQuery_();
        this.setInnerQuery_();
    }
}
