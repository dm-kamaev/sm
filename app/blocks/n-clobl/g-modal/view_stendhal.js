goog.provide('sm.gModal.ViewStendhal');

goog.require('cl.gModal.View');
goog.require('goog.events');


/**
 * Modal View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gModal.View}
 */
sm.gModal.ViewStendhal = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.gModal.ViewStendhal, cl.gModal.View);


goog.scope(function() {
    var View = sm.gModal.ViewStendhal;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        CLOSER: 'g-modal__close-button'
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

        goog.events.listen(
            this.dom.closer,
            goog.events.EventType.TOUCHSTART,
            this.onCloserClick_,
            false,
            this
        );
    };

    /**
     * @override
     */
    View.prototype.exitDocument = function() {
        oog.base(this, 'exitDocument');

        goog.events.unlisten(
            this.dom.closer,
            goog.events.EventType.CLICK,
            this.onCloserClick_,
            false,
            this
        );

        goog.events.unlisten(
            this.dom.closer,
            goog.events.EventType.TOUCHEND,
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
});
