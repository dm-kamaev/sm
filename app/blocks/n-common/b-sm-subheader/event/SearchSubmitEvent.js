/**
 * @fileoverview Event with selected data in suggest
 */

goog.provide('sm.bSmSubheader.SearchSubmitEvent');

goog.require('goog.events');

goog.scope(function() {


    /**
     * Event with suggest data on submit pr item select
     * @param {sm.bSearch.Search.SearchData} searchData
     * @constructor
     */
    sm.bSmSubheader.SearchSubmitEvent = function(searchData) {
        sm.bSmSubheader.SearchSubmitEvent.base(
            this, 'constructor', sm.bSmSubheader.SearchSubmitEvent.Type
        );

        /**
         * Current search data
         * @type {sm.bSearch.Search.Data}
         * @private
         */
        this.searchData_ = searchData;
    };
    goog.inherits(sm.bSmSubheader.SearchSubmitEvent, goog.events.Event);
    var SearchSubmitEvent = sm.bSmSubheader.SearchSubmitEvent;


    /**
     * Event type
     * @type {string}
     */
    SearchSubmitEvent.Type = goog.events.getUniqueId('search_submit');


    /**
     * Return current search data
     * @return {sm.bSearch.Search.Data}
     * @public
     */
    SearchSubmitEvent.prototype.getSearchData = function() {
        return this.searchData_;
    };
});  // goog.scope
