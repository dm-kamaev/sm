/**
 * @fileoverview Custom event with data included
 * Use if need transfer some information via event
 */

goog.provide('sm.iEvent.EventPayload');

goog.require('goog.events.Event');

goog.scope(function() {

    /**
     * Custom event with payload
     * @param {Data} data
     * @param {string} type
     * @param {goog.events.EventTarget=} opt_target
     * @template Data
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.iEvent.EventPayload = function(data, type, opt_target) {
        sm.iEvent.EventPayload.base(this, 'constructor', type, opt_target);


        /**
         * Payload of event
         * @type {Data}
         * @private
         */
        this.payload_ = data;
    };
    goog.inherits(sm.iEvent.EventPayload, goog.events.Event);
    var EventPayload = sm.iEvent.EventPayload;


    /**
     * Return payload of event
     * @return {Data}
     */
    EventPayload.prototype.getData = function() {
        return this.payload_;
    };
});  // goog.scope
