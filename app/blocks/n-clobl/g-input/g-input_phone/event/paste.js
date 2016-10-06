/**
 * @fileoverview PAste to input event.
 * In payload have pasted text
 */
goog.provide('sm.gInput.Event.PasteEvent');

goog.require('goog.events.Event');

goog.scope(function() {



    /**
     * Keypress event
     * @param {string} pastedText
     * @param {goog.events.EventTarget=} opt_target
     * @constructor
     * @extends {goog.events.Event}
     */
    sm.gInput.Event.PasteEvent = function(pastedText, opt_target) {
        sm.gInput.Event.PasteEvent.base(
            this,
            'constructor',
            sm.gInput.Event.PasteEvent.Type,
            opt_target
        );


        /**
         * Pasted text
         * @type {string}
         * @private
         */
        this.text_ = pastedText;
    };
    goog.inherits(sm.gInput.Event.PasteEvent, goog.events.Event);
    var PasteEvent = sm.gInput.Event.PasteEvent;


    /**
     * Event type
     * @const {string}
     */
    PasteEvent.Type = goog.events.getUniqueId('inputPaste');


    /**
     * Entered key handler
     * @return {string}
     * @public
     */
    PasteEvent.prototype.getText = function() {
        return this.text_;
    };
});  // goog.scope
