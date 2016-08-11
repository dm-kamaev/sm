/**
 * @fileoverview Event with loaded data for map
 */
goog.provide('sm.lSmSearch.iSearchService.MapDataLoadedEvent');


goog.require('goog.events.Event');


goog.scope(function() {



    /**
     * Event with loaded data for results list
     * @param  {sm.lSmSearch.iSearchService.MapDataLoadedEvent.MapData} mapData
     * @param  {goog.events.EventTarget=} opt_target
     * @constructor
     */
    sm.lSmSearch.iSearchService.MapDataLoadedEvent =
        function(mapData, opt_target) {
            sm.lSmSearch.iSearchService.MapDataLoadedEvent.base(
                this,
                'constructor',
                opt_target,
                sm.lSmSearch.iSearchService.MapDataLoadedEvent.Type
            );

            /**
             * Loaded data for entity list
             * @type {sm.lSmSearch.iSearchService.MapDataLoadedEvent.MapData}
             * @private
             */
            this.mapData_ = mapData;
    };
    goog.inherits(
        sm.lSmSearch.iSearchService.MapDataLoadedEvent,
        goog.events.Event
    );
    var MapDataLoadedEvent = sm.lSmSearch.iSearchService.MapDataLoadedEvent;


    /**
     * @typedef {{
     *     data: Array<{
     *         entities: Array<sm.bSmMap.SmMap.Entity>
     *         type: string
     *     }>,
     *     center: Array<number>
     * }}
     */
    MapDataLoadedEvent.MapData;


    /**
     * Event type
     * @type {string}
     */
    MapDataLoadedEvent.Type = goog.events.getUniqueId('listDataLoaded');


    /**
     * Getter for mapData_
     * @return {sm.lSmSearch.iSearchService.MapDataLoadedEvent.MapData}
     */
    MapDataLoadedEvent.prototype.getMapData = function() {
        return this.mapData_;
    };
});  // goog.scope
