goog.provide('sm.bSmBalloon.Event.Open');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Open balloon
     * @param {Object} params
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.bSmBalloon.Event.Open = function(params, opt_target) {
        sm.bSmBalloon.Event.Open.base(this, 'constructor',
            sm.bSmBalloon.Event.Open.Type, opt_target);


        /**
         * Added item parameters
         * @type {sm.bSmBalloon.View.RenderParams}
         */
        this.data = params;
    };
    goog.inherits(sm.bSmBalloon.Event.Open, goog.events.Event);
    var Open = sm.bSmBalloon.Event.Open;


    /**
     * Type of event
     * @type {string}
     */
    Open.Type = goog.events.getUniqueId('open');
});  // goog.scope
