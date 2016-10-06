/**
 * @fileoverview Keypress input event.
 * In payload have pressed char
 */
goog.provide('sm.gInput.Event.KeypressEvent');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Keypress event
     * @param {string} char
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.gInput.Event.KeypressEvent = function(char, opt_target) {
        sm.gInput.Event.KeypressEvent.base(
            this,
            'constructor',
            sm.gInput.Event.KeypressEvent.Type,
            opt_target
        );


        /**
         * Entered char
         * @type {string}
         * @private
         */
        this.char_ = char;
    };
    goog.inherits(sm.gInput.Event.KeypressEvent, goog.events.Event);
    var KeypressEvent = sm.gInput.Event.KeypressEvent;


    /**
     * Event type
     * @type {string}
     * @const
     */
    KeypressEvent.Type = goog.events.getUniqueId('inputKeypress');


    /**
     * Entered key handler
     * @return {string}
     * @public
     */
    KeypressEvent.prototype.getChar = function() {
        return this.char_;
    };
});  // goog.scope
