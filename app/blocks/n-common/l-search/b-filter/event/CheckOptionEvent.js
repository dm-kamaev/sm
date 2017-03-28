goog.provide('sm.lSearch.bFilter.CheckOptionEvent');

goog.require('goog.events');



goog.scope(function() {


    /**
     * Event with data on filter option check/uncheck
     * @param {{
     *      data: sm.lSearch.bFilter.Filter.OptionData,
     *      position: number
     * }} params
     * @constructor
     */
    sm.lSearch.bFilter.CheckOptionEvent = function(params) {
        sm.lSearch.bFilter.CheckOptionEvent.base(
            this, 'constructor', sm.lSearch.bFilter.CheckOptionEvent.Type
        );

        /**
         * data of filter option
         * @type {sm.lSearch.bFilter.Filter.OptionData}
         */
        this.data = params.data;

        /**
         * position of filter option
         * @type {number}
         */
        this.position = params.position;
    };
    goog.inherits(sm.lSearch.bFilter.CheckOptionEvent, goog.events.Event);
    var CheckOptionEvent = sm.lSearch.bFilter.CheckOptionEvent;


    /**
     * Event type
     * @type {string}
     */
    CheckOptionEvent.Type = goog.events.getUniqueId('check-option');
});  // goog.scope
