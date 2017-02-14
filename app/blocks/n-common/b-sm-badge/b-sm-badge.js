goog.provide('sm.bSmBadge.SmBadge');

goog.require('cl.iControl.Control');
goog.require('sm.bSmBadge.View');



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
            'smLink',
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
                'smLink',
                link
            );
        }
    };
});  // goog.scope
