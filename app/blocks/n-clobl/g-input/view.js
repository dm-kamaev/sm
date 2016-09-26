goog.provide('sm.gInput.ViewStendhal');

goog.require('cl.gInput.View');



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
    var View = sm.gInput.ViewStendhal;


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
        ENTER_PRESS: goog.events.getUniqueId('enter-press'),
        INPUT: cl.gInput.View.Event.INPUT,
        FOCUS: cl.gInput.View.Event.FOCUS
    };


    /**
     * @typedef {{
     *     validations: Array<string>
     * }}
     */
    sm.gInput.ViewStendhal.DataParams;


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.input,
            goog.events.EventType.KEYPRESS,
            this.onKeyPress
        );
    };


    /**
     * Key press handler
     * @param {goog.events.BrowserEvent} event
     * @protected
     */
    View.prototype.onKeyPress = function(event) {
        if (event.keyCode == goog.events.KeyCodes.ENTER) {
            this.dispatchEvent(View.Event.ENTER_PRESS);
        }
    };
});  // goog.scope
