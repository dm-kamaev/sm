/**
 * @fileoverview Event with loaded data for results list
 */
goog.provide('sm.lSearch.iSearchService.ListDataLoadedEvent');


goog.require('goog.events');


goog.scope(function() {



    /**
     * Event with loaded data for results list
     * @param  {Array<sm.bSmItem.SmItem.RenderParams>} listData
     * @param  {goog.events.EventTarget=} opt_target
     * @constructor
     */
     sm.lSearch.iSearchService.ListDataLoadedEvent =
        function(listData, opt_target) {
            sm.lSearch.iSearchService.ListDataLoadedEvent.base(
                this,
                'constructor',
                sm.lSearch.iSearchService.ListDataLoadedEvent.Type,
                opt_target
            );

            /**
             * Loaded data for entity list
             * @type {sm.lSearch.iSearchService.ListDataLoadedEvent.ListData}
             * @private
             */
            this.listData_ = listData;
    };
    goog.inherits(
        sm.lSearch.iSearchService.ListDataLoadedEvent,
        goog.events.Event
    );
    var ListDataLoadedEvent = sm.lSearch.iSearchService.ListDataLoadedEvent;


    /**
     * @typedef {{
     *     items: Array<sm.bSmItem.SmItem.RenderParams>,
     *     countResults: number
     *  }}
     */
    sm.lSearch.iSearchService.ListDataLoadedEvent.ListData;


    /**
     * Event type
     * @type {string}
     */
    ListDataLoadedEvent.Type = goog.events.getUniqueId('listDataLoaded');


    /**
     * Getter for listData_
     * @return {sm.lSearch.iSearchService.ListDataLoadedEvent.ListData}
     */
    ListDataLoadedEvent.prototype.getListData = function() {
        return this.listData_;
    };


    /**
     * Getter for items in results list
     * @return {Array<sm.bSmItem.SmItem.RenderParams>}
     */
    ListDataLoadedEvent.prototype.getListItems = function() {
        return this.listData_['items'];
    };

    /**
     * Getter for count results
     * @return {number}
     */
    ListDataLoadedEvent.prototype.getCountResults = function() {
        return this.listData_['countResults'];
    };
});  // goog.scope
