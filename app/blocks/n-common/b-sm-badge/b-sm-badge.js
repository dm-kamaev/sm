goog.provide('sm.bSmBadge.SmBadge');

goog.require('cl.iControl.Control');
goog.require('sm.bSmBadge.Template');
goog.require('sm.bSmBadge.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmBadge.SmBadge = function(view, opt_domHelper) {
    sm.bSmBadge.SmBadge.base(this, 'constructor', view, opt_domHelper);


    /**
     * Items - links instance
     * @type {Array<sm.bSmLink.SmLink>}
     * @private
     */
    this.items_ = [];


    /**
     * Link hint
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.linkHint_ = null;
};
goog.inherits(sm.bSmBadge.SmBadge, cl.iControl.Control);


goog.scope(function() {
    var Badge = sm.bSmBadge.SmBadge,
        View = sm.bSmBadge.View;

    /**
     * Name of this element in factory
     */
    Badge.NAME = sm.bSmBadge.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Badge.NAME, {
        control: Badge,
        view: View
    });


    /**
     * @typedef {sm.bSmBadge.View.RenderParams}
     */
    sm.bSmBadge.SmBadge.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Array<Object<string, (number|string)>>} rawParams
     * @return {sm.bSmBadge.View.RenderParams}
     */
    Badge.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * @override
     * @param {Element} element
     */
    Badge.prototype.decorateInternal = function(element) {
        Badge.base(this, 'decorateInternal', element);

        this.initItems_();
        this.initLinkHint_();
    };


    /**
     * Init items
     * @private
     */
    Badge.prototype.initItems_ = function() {
        this.items_ = this.decorateChildren(
            sm.bSmLink.SmLink.NAME,
            this.getView().getDom().items
        );
    };


    /**
     * @override
     */
    Badge.prototype.enterDocument = function() {
        Badge.base(this, 'enterDocument');
    };


    /**
     * Init link hint
     * @private
     */
    Badge.prototype.initLinkHint_ = function() {
        var link = this.getView().getDom().linkHint;

        if (link) {
            this.linkHint_ = this.decorateChild(
                sm.bSmLink.SmLink.NAME,
                link
            );
        }
    };
});  // goog.scope
