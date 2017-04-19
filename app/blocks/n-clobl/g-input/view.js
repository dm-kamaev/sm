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
     * @enum {string}
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
        FOCUS: cl.gInput.View.Event.FOCUS,
        OUTSIDE_CLICK: goog.events.getUniqueId('outside-click')
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
        ).listen(
            goog.dom.getDocument(),
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );
    };


    /**
     * Get name
     * @return {?string}
     * @public
     */
    View.prototype.getName = function() {
        return this.dom.input.name || null;
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


    /**
     * Document click handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onDocumentClick_ = function(event) {
        var isContaints = goog.dom.contains(
            this.getElement(),
            event.target
        );

        if (!isContaints) {
            this.dispatchEvent(View.Event.OUTSIDE_CLICK);
            this.blur();
        }
    };
});  // goog.scope
