goog.provide('sm.bBanner.Banner');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bBanner.View');



/**
 * Banner
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bBanner.Banner = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);


    /**
     * ModalFeedback instance
     * @type {sm.gModal.ModalFeedback}
     * @private
     */
    this.modalFeedback_ = null;
};
goog.inherits(sm.bBanner.Banner, cl.iControl.Control);


goog.scope(function() {
    var Banner = sm.bBanner.Banner,
        View = sm.bBanner.View;


    /**
     * @param {Element} element
     * @override
     */
    Banner.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_();
    };


    /**
     * Init containing elements
     * @private
     */
    Banner.prototype.initElements_ = function() {
        var domElements = this.getView().getDom();

        this.modalFeedback_ = this.decorateChild(
            'feedback-modal',
            domElements.modalFeedback
        );
    };


    /**
     * @override
     */
    Banner.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.CLICK_BANNER,
            this.onClickBanner_
        );
    };


    /**
     * Show modal
     * @private
     */
    Banner.prototype.onClickBanner_ = function() {
        this.modalFeedback_.show();
    };
});  // goog.scope
