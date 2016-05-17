goog.provide('sm.bBanner.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * Banner View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bBanner.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.bBanner.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bBanner.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-banner'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
       CLICK_BANNER: 'click-banner'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.modalFeedback = this.getElementByClass(
            sm.gModal.ViewFeedback.CssClass.ROOT
        );
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClickBanner_
        );
    };


    /**
     * Click banner
     * @private
     */
    View.prototype.onClickBanner_ = function() {
        this.dispatchEvent({
            'type': View.Event.CLICK_BANNER
        });
    };
});  // goog.scope
