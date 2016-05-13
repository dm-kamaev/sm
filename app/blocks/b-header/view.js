goog.provide('sm.bHeader.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('sm.bBanner.Banner');
goog.require('sm.bSearch.Search');
goog.require('sm.iAnimate.Animate');


/**
 * Button View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.bHeader.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bHeader.View,
        Search = sm.bSearch.Search;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        MINIFIED_SEARCH: 'b-header__search_visible_s',
        SEARCH: 'b-header__search_visible_l',
        SEARCH_MODE: 'b-header_mode_search',
        DEFAULT_MODE: 'b-header_mode_default',
        ANIMATION_ON: 'b-header_animation_on',
        ANIMATION_OFF: 'b-header_animation_off',
        AUTHORIZATION_LINK: 'b-header__authorization-link-content'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initBanner_();
        this.initDom_();
        this.detectAnimationSupportion_();
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.authorizationLink,
            goog.events.EventType.CLICK,
            this.onAuthorizationLinkClick_
        );
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
     * Authorization Link Click
     * @private
     */
    View.prototype.onAuthorizationLinkClick_ = function() {
       this.toggleActiveAuthorizationLink_();
    };


    /**
     * makes Link to active and inactive
     * @private
     */
    View.prototype.toggleActiveAuthorizationLink_ = function() {
        goog.dom.classlist.toggle(
            this.dom.authorizationLink,
            cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
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
     * @private
     */
    View.prototype.initSearch_ = function() {
        this.dom.minifiedSearch = this.getElementByClass(
            View.CssClass.MINIFIED_SEARCH
        );

        this.dom.search = this.getElementByClass(
            View.CssClass.SEARCH
        );
    };

    /**
     * Find banner dom elements
     * @private
     */
    View.prototype.initBanner_ = function() {
        this.dom.banner = this.getElementByClass(
            sm.bBanner.View.CssClass.ROOT
        );
    };

    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.authorizationLink = this.getElementByClass(
            View.CssClass.AUTHORIZATION_LINK
        );
    };
});
