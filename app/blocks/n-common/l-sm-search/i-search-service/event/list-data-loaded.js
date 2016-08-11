/**
 * @fileoverview Event with loaded data for results list
 */
goog.provide('sm.lSmSearch.iSearchService.ListDataLoadedEvent');


goog.require('goog.events.Event');


goog.scope(function() {



    /**
     * Event with loaded data for results list
     * @param  {Array<sm.bSmItem.SmItem.RenderParams>} listData
     * @param  {goog.events.EventTarget=} opt_target
     * @constructor
     */
     sm.lSmSearch.iSearchService.ListDataLoadedEvent =
        function(listData, opt_target) {
            sm.lSmSearch.iSearchService.ListDataLoadedEvent.base(
                this,
                'constructor',
                sm.lSmSearch.iSearchService.ListDataLoadedEvent.Type,
                opt_target
            );

            /**
             * Loaded data for entity list
             * @type {sm.lSmSearch.iSearchService.ListDataLoadedEvent.ListData}
             * @private
             */
            this.listData_ = listData;
    };
    goog.inherits(
        sm.lSmSearch.iSearchService.ListDataLoadedEvent,
        goog.events.Event
    );
    var ListDataLoadedEvent = sm.lSmSearch.iSearchService.ListDataLoadedEvent;


    /**
     * @typedef {Array<sm.bSmItem.SmItem.RenderParams>}
     */
    ListDataLoadedEvent.listData;


    /**
     * Event type
     * @type {string}
     */
    ListDataLoadedEvent.Type = goog.events.getUniqueId('listDataLoaded');


    /**
     * Getter for listData_
     * @return {sm.lSmSearch.iSearchService.ListDataLoadedEvent.ListData}
     */
    ListDataLoadedEvent.prototype.getListData = function() {
        return this.listData_;
    };
});  // goog.scope
