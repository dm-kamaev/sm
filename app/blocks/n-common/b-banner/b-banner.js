goog.provide('sm.bBanner.Banner');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bBanner.Template');
goog.require('sm.bBanner.View');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Banner
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bBanner.Banner = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


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
     * Name of this element in factory
     */
    Banner.NAME = sm.bBanner.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Banner.NAME, {
        control: Banner,
        view: View
    });


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
