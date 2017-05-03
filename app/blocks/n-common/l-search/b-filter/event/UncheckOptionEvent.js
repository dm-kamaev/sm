goog.provide('sm.lSearch.bFilter.UncheckOptionEvent');

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
    sm.lSearch.bFilter.UncheckOptionEvent = function(params) {
        sm.lSearch.bFilter.UncheckOptionEvent.base(
            this, 'constructor', sm.lSearch.bFilter.UncheckOptionEvent.Type
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
    goog.inherits(sm.lSearch.bFilter.UncheckOptionEvent, goog.events.Event);
    var UncheckOptionEvent = sm.lSearch.bFilter.UncheckOptionEvent;


    /**
     * Event type
     * @type {string}
     */
    UncheckOptionEvent.Type = goog.events.getUniqueId('uncheck-option');
});  // goog.scope
