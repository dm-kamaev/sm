goog.provide('sm.gModal.ViewStendhal');

goog.require('cl.gModal.View');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.labs.userAgent.device');



/**
 * Modal View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.gModal.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.gModal.ViewStendhal, cl.gModal.View);


goog.scope(function() {
    var View = sm.gModal.ViewStendhal;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        CLOSER: 'g-modal__close-button',
        CLOSER_HOVER_ENABLE: 'g-modal__close-button_hover_enable'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLOSE: 'close'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.closer = this.getElementByClass(View.CssClass.CLOSER);

        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classes.add(
                this.dom.closer,
                View.CssClass.CLOSER_HOVER_ENABLE
            );
        }
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        goog.events.listen(
            this.dom.closer,
            goog.events.EventType.CLICK,
            this.onCloserClick_,
            false,
            this
        );
    };


    /**
     * @override
     */
    View.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        goog.events.unlisten(
            this.dom.closer,
            goog.events.EventType.CLICK,
            this.onCloserClick_,
            false,
            this
        );
    };


    /**
     * Closer click handler
     * @private
     */
    View.prototype.onCloserClick_ = function() {
        this.dispatchEvent(View.Event.CLOSE);
    };
});  // goog.scope
