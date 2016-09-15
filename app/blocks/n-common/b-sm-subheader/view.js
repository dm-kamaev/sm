goog.provide('sm.bSmSubheader.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('sm.iAnimate.Animate');



/**
 * Subheader View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmSubheader.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmSubheader.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmSubheader.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmSubheader.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-subheader',
        MINIFIED_SEARCH: 'b-sm-subheader__search_visible_s',
        SEARCH: 'b-sm-subheader__search_visible_l',
        SEARCH_MODE: 'b-sm-subheader_mode_search',
        DEFAULT_MODE: 'b-sm-subheader_mode_default',
        ANIMATION_ON: 'b-sm-subheader_animation_on',
        ANIMATION_OFF: 'b-sm-subheader_animation_off'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initSearch_(element);
        this.initAuthorizationLink_(element);
        this.initFavorite_(element);
        this.initLinks_(element);
        this.detectAnimationSupportion_();
    };


    /**
     * Switch view to default mode
     */
    View.prototype.switchToDefaultMode = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.SEARCH_MODE
        );
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.DEFAULT_MODE
        );
    };


    /**
     * Switch view to search mode
     */
    View.prototype.switchToSearchMode = function() {
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.SEARCH_MODE
        );
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.DEFAULT_MODE
        );
    };


    /**
     * Turn on animation if it is supported
     * @private
     */
    View.prototype.detectAnimationSupportion_ = function() {
        this.addCssClass(
            sm.iAnimate.Animate.isSupported() ?
                View.CssClass.ANIMATION_ON :
                View.CssClass.ANIMATION_OFF
        );
    };


    /**
     * Find search dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initSearch_ = function(element) {
        this.dom.minifiedSearch = this.getElementByClass(
            View.CssClass.MINIFIED_SEARCH,
            element
        );

        this.dom.search = this.getElementByClass(
            View.CssClass.SEARCH,
            element
        );
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initAuthorizationLink_ = function(element) {
        this.dom.authorizationLink = this.getElementByClass(
            sm.bAuthorizationLink.View.CssClass.ROOT,
            element
        );
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initFavorite_ = function(element) {
        this.dom.favorite = this.getElementByClass(
            sm.bFavorite.View.CssClass.ROOT,
            element
        );
    };


    /**
     * Initializes links (dom elements)
     * @param {Element} element
     * @private
     */
    View.prototype.initLinks_ = function(element) {
        this.dom.links = this.getElementsByClass(
            sm.bSmLink.View.CssClass.ROOT,
            element
        );
    };
});  // goog.scope
