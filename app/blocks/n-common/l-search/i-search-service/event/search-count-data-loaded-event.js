/**
 * @fileoverview Event with loaded count of search result
 */
goog.provide('sm.lSearch.iSearchService.SearchCountDataLoadedEvent');


goog.require('goog.events');


goog.scope(function() {



    /**
     * Event with loaded count of search result
     * @param  {number} data
     * @param  {goog.events.EventTarget=} opt_target
     * @constructor
     */
    sm.lSearch.iSearchService.SearchCountDataLoadedEvent =
        function(data, opt_target) {
            sm.lSearch.iSearchService.SearchCountDataLoadedEvent.base(
                this, 'constructor', DataLoadedEvent.Type, opt_target
            );

            /**
             * Loaded data
             * @type {number}
             */
            this.data = data;
        };

    goog.inherits(
        sm.lSearch.iSearchService.SearchCountDataLoadedEvent,
        goog.events.Event
    );

    var DataLoadedEvent = sm.lSearch.iSearchService.SearchCountDataLoadedEvent;

    /**
     * Event type
     * @type {string}
     */
    DataLoadedEvent.Type = goog.events.getUniqueId('countSearchDataLoaded');

});  // goog.scope
