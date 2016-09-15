goog.provide('sm.gInput.ViewStendhal');

goog.require('cl.gInput.View');
goog.require('cl.iUtils.Utils');



/**
 * Input View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.gInput.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.gInput.ViewStendhal, cl.gInput.View);


goog.scope(function() {
    var View = sm.gInput.ViewStendhal,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum
     * @type {string}
     */
    View.CssClass = {
        ROOT: 'g-input_stendhal'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ENTER_PRESS: goog.events.getUniqueId('enter-press')
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.input,
            goog.events.EventType.KEYPRESS,
            this.onKeyPress_
        );
    };


    /**
     * Key press handler
     * @param {goog.events.BrowserEvent} event
     * @private
     */
    View.prototype.onKeyPress_ = function(event) {
        if (event.keyCode == goog.events.KeyCodes.ENTER) {
            this.dispatchEvent(View.Event.ENTER_PRESS);
        }
    };
});  // goog.scope
