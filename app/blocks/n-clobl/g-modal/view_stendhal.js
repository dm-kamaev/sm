goog.provide('sm.gModal.ViewStendhal');

goog.require('cl.gModal.View');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.labs.userAgent.device');
goog.require('goog.style');



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

        this.getHandler().listen(
            goog.dom.getWindow(),
            goog.events.EventType.RESIZE,
            this.onViewportResize_
        );
    };


    /**
     * Show modal
     * @override
     * @public
     */
    View.prototype.show = function() {
        View.base(this, 'show');

        this.reduseHeightBody_();
    };


    /**
     * Hide modal
     * @override
     * @public
     */
    View.prototype.hide = function() {
        View.base(this, 'hide');

        this.restoreHeightBody_();
    };


    /**
     * Return true if modal is showed, else return false
     * @return {boolean}
     * @public
     */
    View.prototype.isShowed = function() {
        return !goog.dom.classlist.contains(
            this.getElement(),
            cl.iUtils.Utils.CssClass.HIDDEN
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


    /**
     * Viewport Resize handler
     * @private
     */
    View.prototype.onViewportResize_ = function() {
        if (this.isShowed()) {
            this.reduseHeightBody_();
        }
    };


    /**
     * Reduse height body (used to remove scroll of page)
     * @private
     */
    View.prototype.reduseHeightBody_ = function() {
        var height = goog.dom.getViewportSize().height;
        goog.style.setHeight(goog.dom.getDocument().body, height);
    };


    /**
     * Restore height body
     * @private
     */
    View.prototype.restoreHeightBody_ = function() {
        var height = null;
        goog.style.setHeight(goog.dom.getDocument().body, height);
    };
});  // goog.scope
