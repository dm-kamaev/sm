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
 * @extends {cl.gModal.View}
 */
sm.gModal.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
    sm.gModal.ViewStendhal.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);
};
goog.inherits(sm.gModal.ViewStendhal, cl.gModal.View);


goog.scope(function() {
    var View = sm.gModal.ViewStendhal;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        CONTENT: cl.gModal.View.CssClass.CONTENT,
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
        View.base(this, 'decorateInternal', element);

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
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.closer,
            goog.events.EventType.CLICK,
            this.onCloserClick_,
            false,
            this
        );
    };


    /**
     * Return data-params from dom element
     * @return {Object}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var dataParams = View.base(this, 'getParams');
        return this.transformParams(dataParams);
    };


    /**
     * Modal onclick
     * @param {Object} event
     * @override
     */
    View.prototype.onModalClick = function(event) {
        var ancestor = goog.dom.getAncestorByClass(
            event.target,
            View.CssClass.CONTENT
        );

        if (ancestor !== this.dom.content && document.contains(event.target)) {
            this.dispatchEvent(View.Event.CLOSE);
        }
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {};
    };


    /**
     * Closer click handler
     * @private
     */
    View.prototype.onCloserClick_ = function() {
        this.dispatchEvent(View.Event.CLOSE);
    };
});  // goog.scope
