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
};
goog.inherits(sm.bSmBadge.SmBadge, cl.iControl.Control);


goog.scope(function() {
    var Badge = sm.bSmBadge.SmBadge,
        View = sm.bSmBadge.View;


    /**
     * Search address for different entity types
     * @enum {string}
     */
    Badge.SearchAddress = {
        SCHOOL: 'school',
        COURSE: 'courseSearch'
    };


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

        this.viewListen(
            View.Event.HINT_LINK_CLICK,
            this.onHintLinkClick_
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
     * On hint link click
     * @private
     */
    Badge.prototype.onHintLinkClick_ = function() {
        this.openPageRanking_();
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
        return this.buildSearchAddress_() + '?' +
            goog.uri.utils.buildQueryDataFromMap(data);
    };


    /**
     * Build search page address
     * @return {string}
     * @private
     */
    Badge.prototype.buildSearchAddress_ = function() {
        var result = '/';

        switch (this.params.entityType) {
            case Badge.EntityType.COURSE:
                result += Badge.SearchAddress.COURSE;
                break;
            case Badge.EntityType.SCHOOL:
                result += Badge.SearchAddress.SCHOOL;
                break;
        }

        return result;
    };


    /**
     * Open the page ranking
     * @private
     */
    Badge.prototype.openPageRanking_ = function() {
        window.open('http://dogm.mos.ru/rating/');
    };
});  // goog.scope
