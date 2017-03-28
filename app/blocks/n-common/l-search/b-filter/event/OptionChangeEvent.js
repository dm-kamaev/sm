goog.provide('sm.lSearch.bFilter.OptionChangeEvent');

goog.require('goog.events');


/**
 * @typedef {{
 *      type: sm.lSearch.bFilter.OptionChangeEvent.Type,
 *      data: {
 *          value: string,
 *          label: string,
 *          name: string,
 *          isChecked: boolean
 *      },
 *      position: number
 * }} sm.lSearch.bFilter.OptionChangeEvent.Data
 */


goog.scope(function() {


    /**
     * Event with data on filter option check/uncheck
     * @param {sm.lSearch.bFilter.OptionChangeEvent.Data} data
     * @constructor
     */
    sm.lSearch.bFilter.OptionChangeEvent = function(data) {
        sm.lSearch.bFilter.OptionChangeEvent.base(
            this, 'constructor', data.type
        );

        /**
         * data of filter option
         * @type {sm.lSearch.bFilter.OptionChangeEvent.Data.data}
         */
        this.data = data.data;

        /**
         * position of filter option
         * @type {sm.lSearch.bFilter.OptionChangeEvent.Data.position}
         */
        this.position = data.position;
    };
    goog.inherits(sm.lSearch.bFilter.OptionChangeEvent, goog.events.Event);
    var OptionChangeEvent = sm.lSearch.bFilter.OptionChangeEvent;


    /**
     * Event type
     * @enum {string}
     */
    OptionChangeEvent.Type = {
        CHECK_OPTION: goog.events.getUniqueId('check_on'),
        UNCHECK_OPTION: goog.events.getUniqueId('uncheck_on')
    };
});  // goog.scope
