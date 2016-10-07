goog.provide('sm.gModal.Event.Show');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Show modal event
     * @param {Object} data
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.gModal.Event.Show = function(data, opt_target) {
        goog.base(
            this, sm.gModal.Event.Show.Type, opt_target
        );


        /**
         * @typedef {{
         *     optionCost: (string|undefined)
         * }}
         */
        sm.gModal.Event.Show.Data;


        /**
         * Enrollment data
         * @type {sm.gModal.Event.Show.Data}
         */
        this.data = data;
    };
    goog.inherits(sm.gModal.Event.Show, goog.events.Event);
    var Show = sm.gModal.Event.Show;


    /**
     * Type of event
     * @type {string}
     */
    Show.Type = goog.events.getUniqueId('show');
});  // goog.scope
