goog.provide('sm.bSmSubheader.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
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

    /**
     * Dom elements collection
     * @type {Object}
     */
    this.dom = {};
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
        ANIMATION_OFF: 'b-sm-subheader_animation_off',
        HEADER_LINK: 'b-sm-subheader__link',
        HAMBURGER_MENU: 'b-sm-subheader__hamburger-menu',
        SEARCH_SECTION: 'b-sm-subheader__section_search',
        SEARCH_SECTION_ON_TOP: 'b-sm-subheader__section_search_top'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        HAMBURGER_MENU_CLICK: goog.events.getUniqueId('menu-click')
    };


    /**
     * Switch view to default mode
     * @public
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
        goog.dom.classlist.remove(
            this.dom.searchSection,
            View.CssClass.SEARCH_SECTION_ON_TOP
        );
    };


    /**
     * Switch view to search mode
     * @public
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
        goog.dom.classlist.add(
            this.dom.searchSection,
            View.CssClass.SEARCH_SECTION_ON_TOP
        );
    };


    /**
     * @override
     * @public
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initHamburgerMenuListener_();
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initAuthorizationLink_();
        this.initFavorite_();
        this.initLinks_();
        this.initListLinks_();
        this.detectAnimationSupportion_();
        this.initHamburgerMenu_();
        this.initSearchSection_();
    };

    /**
     * Initializes search section element
     * @private
     */
    View.prototype.initSearchSection_ = function() {
        this.dom.searchSection = this.getElementByClass(
            View.CssClass.SEARCH_SECTION
        );
    };

    /**
     * Initializes listeners for root Element
     * @private
     */
    View.prototype.initHamburgerMenuListener_ = function() {
        this.getHandler().listen(
            this.dom.hamburgerMenu,
            goog.events.EventType.CLICK,
            this.onHamburgerMenuClick_
        );
    };


    /**
     * Handler click on root Element
     * @private
     */
    View.prototype.onHamburgerMenuClick_ = function() {
        this.dispatchEvent(View.Event.HAMBURGER_MENU_CLICK);
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
     * Finds hamburger menu element on the page
     * @private
     */
    View.prototype.initHamburgerMenu_ = function() {
        this.dom.hamburgerMenu = this.getElementByClass(
            View.CssClass.HAMBURGER_MENU
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
     * Initializes dom elements
     * @private
     */
    View.prototype.initAuthorizationLink_ = function() {
        this.dom.authorizationLink = this.getElementByClass(
            sm.bAuthorizationLink.View.CssClass.ROOT
        );
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initFavorite_ = function() {
        this.dom.favorite = this.getElementByClass(
            sm.bSmFavorite.View.CssClass.ROOT
        );
    };


    /**
     * Initializes links (dom elements)
     * @private
     */
    View.prototype.initLinks_ = function() {
        this.dom.links = this.getElementsByClass(
            sm.bSmLink.View.CssClass.ROOT
        );
    };


    /**
     * Initializes list of links (dom elements)
     * @private
     */
    View.prototype.initListLinks_ = function() {
        this.dom.listLinks = this.getElementByClass(
            sm.gDropdown.ViewListLinks.CssClass.ROOT
        );
    };
});  // goog.scope
