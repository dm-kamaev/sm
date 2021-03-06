/**
 * @fileoverview Event with loaded data for map
 */
goog.provide('sm.lSearch.iSearchService.MapDataLoadedEvent');


goog.require('goog.events');


goog.scope(function() {



    /**
     * Event with loaded data for results list
     * @param  {sm.lSearch.iSearchService.MapDataLoadedEvent.MapData} mapData
     * @param  {goog.events.EventTarget=} opt_target
     * @constructor
     */
    sm.lSearch.iSearchService.MapDataLoadedEvent =
        function(mapData, opt_target) {
            sm.lSearch.iSearchService.MapDataLoadedEvent.base(
                this,
                'constructor',
                sm.lSearch.iSearchService.MapDataLoadedEvent.Type,
                opt_target
            );

            /**
             * Loaded data for entity list
             * @type {sm.lSearch.iSearchService.MapDataLoadedEvent.MapData}
             * @private
             */
            this.mapData_ = mapData;
    };
    goog.inherits(
        sm.lSearch.iSearchService.MapDataLoadedEvent,
        goog.events.Event
    );
    var MapDataLoadedEvent = sm.lSearch.iSearchService.MapDataLoadedEvent;


    /**
     * @typedef {{
     *     itemGroups: Array<{
     *         entities: Array<sm.bSmMap.SmMap.Entity>,
     *         type: string
     *     }>,
     *     position: sm.bSmMap.SmMap.PositionParams
     * }}
     */
    MapDataLoadedEvent.MapData;


    /**
     * Event type
     * @type {string}
     */
    MapDataLoadedEvent.Type = goog.events.getUniqueId('mapDataLoaded');


    /**
     * Getter for item groups
     * @return {Array<{
     *     entities: Array<sm.bSmMap.SmMap.Entity>,
     *     type: string
     * }>}
     */
    MapDataLoadedEvent.prototype.getItemGroups = function() {
        return this.mapData_['itemGroups'];
    };


    /**
     * Getter for positoin
     * @return {sm.bSmMap.SmMap.PositionParams}
     */
    MapDataLoadedEvent.prototype.getPosition = function() {
        return this.mapData_['position'];
    };
});  // goog.scope
