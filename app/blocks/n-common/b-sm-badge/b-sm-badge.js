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
     * Possible antity types
     * @enum {string}
     */
    Badge.EntityType = {
        SCHOOL: 'school',
        COURSE: 'course'
    };


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

        this.initLinkHint_();
    };


    /**
     * @override
     */
    Badge.prototype.enterDocument = function() {
        Badge.base(this, 'enterDocument');

        this.viewListen(
            View.Event.ITEM_CLICK,
            this.onItemClick_
        );
    };


    /**
     * On item click
     * @param {Object} event
     * @private
     */
    Badge.prototype.onItemClick_ = function(event) {
        if (!goog.isNull(event.data)) {
            this.redirectSearch_(event.data);
        }
    };


    /**
     * Redirect on page Search
     * @param {{
     *     id: number,
     *     name: string
     * }} data
     * @private
     */
    Badge.prototype.redirectSearch_ = function(data) {
        document.location.href = this.buildRedirectHref_(data);
    };


    /**
     * Build redirect href for search redirect
     * @param {{
     *     id: number,
     *     name: string
     * }} data
     * @return {string}
     * @private
     */
    Badge.prototype.buildRedirectHref_ = function(data) {
        return document.location.pathname + '?' +
            goog.uri.utils.buildQueryDataFromMap(data);
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
