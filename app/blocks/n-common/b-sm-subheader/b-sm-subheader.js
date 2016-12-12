goog.provide('sm.bSmSubheader.SmSubheader');

goog.require('cl.iControl.Control');
goog.require('cl.iFactory.FactoryManager');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('sm.bAuthorizationLink.AuthorizationLink');
goog.require('sm.bSearch.Search');
goog.require('sm.bSmSubheader.View');



/**
 * Subheader
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSubheader.SmSubheader = function(view, opt_domHelper) {
    sm.bSmSubheader.SmSubheader.base(this, 'constructor', view, opt_domHelper);


    this.setSupportedState(goog.ui.Component.State.FOCUSED, false);


    /**
     * Current mode
     * @type {Subheader.Mode|string}
     * @private
     */
    this.mode_ = sm.bSmSubheader.SmSubheader.Mode.DEFAULT;


    /**
     * Minified search instance
     * @type {sm.bSearch.Search}
     * @private
     */
    this.minifiedSearch_ = null;


    /**
     * Search instance
     * @type {sm.bSearch.Search}
     * @private
     */
    this.search_ = null;


    /**
     * Authorization Link instance
     * @type {sm.bAuthorizationLink.AuthorizationLink}
     * @private
     */
    this.authorizationLink_ = null;


    /**
     * favorite instance
     * @type {sm.bFavorite.Favorite}
     * @private
     */
    this.favorite_ = null;


    /**
     * links instance
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.links_ = [];
};
goog.inherits(sm.bSmSubheader.SmSubheader, cl.iControl.Control);


goog.scope(function() {
    var Subheader = sm.bSmSubheader.SmSubheader,
        View = sm.bSmSubheader.View,
        Search = sm.bSearch.Search,
        AuthorizationLink = sm.bAuthorizationLink.AuthorizationLink,
        FactoryManager = cl.iFactory.FactoryManager;


    /**
     * Subheader modes
     * @enum {string}
     */
    Subheader.Mode = {
        'DEFAULT': 'default',
        'SEARCH': 'search'
    };


    /**
     * Event enum
     * @enum {string}
     */
    Subheader.Event = {
        'SEARCH_SUBMIT': goog.events.getUniqueId('search_submit'),
        'HAMBURGER_MENU_CLICK': goog.events.getUniqueId('hamburger_click')
    };


    /**
     * @override
     * @protected
     */
    Subheader.prototype.decorateInternal = function(element) {
        Subheader.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initAuthorizationLink_();
        this.initFavorite_();
        this.initLinks_();
        this.initListLinks_();
    };


    /**
     * @override
     * @protected
     */
    Subheader.prototype.enterDocument = function() {
        Subheader.base(this, 'enterDocument');

        this.initMinifiedSearchListeners_();
        this.initSearchListeners_();
        this.initHamburgerMenuListener_();
        this.initSearchModeListener_();
    };

    /**
     * Initializes search mode listener
     * @private
     */
    Subheader.prototype.initSearchModeListener_ = function() {
        this.listen(
            sm.bSearch.Search.Event.SEARCH_MODE_INITED,
            this.searchModeInitedHandler_
        );
        this.listen(
            sm.bSearch.Search.Event.DEFAULT_MODE_INITED,
            this.defaultModeInitedHandler_
        );
    };

    /**
     * @private
     */
    Subheader.prototype.searchModeInitedHandler_ = function() {
        goog.dom.classes.add(
            this.getView().getDom().searchSection,
            View.CssClass.SEARCH_SECTION_ON_TOP
        );
    };

    /**
     * @private
     */
    Subheader.prototype.defaultModeInitedHandler_ = function() {
        goog.dom.classes.remove(
            this.getView().getDom().searchSection,
            View.CssClass.SEARCH_SECTION_ON_TOP
        );
    };

    /**
     * Add given item to favorites
     * @param {sm.bSchoolListItem.SchoolListItem.Params} favoriteItem
     * @public
     */
    Subheader.prototype.addFavorite = function(favoriteItem) {
        this.favorite_.addItem(favoriteItem);
    };


     /**
     * Initializes listeners for view
     * @private
     */
    Subheader.prototype.initHamburgerMenuListener_ = function() {
        this.viewListen(
            View.Event.HAMBURGER_MENU_CLICK,
            this.onHamburgerMenuClick_
        );
    };

    /**
     * [onHamburgerMenuClick_ handler]
     * @private
     */
    Subheader.prototype.onHamburgerMenuClick_ = function() {
        this.dispatchEvent(Subheader.Event.HAMBURGER_MENU_CLICK);
    };

    /**
     * Remove item with given id from favorites
     * @param {number} itemId
     * @public
     */
    Subheader.prototype.removeFavorite = function(itemId) {
        this.favorite_.removeItem(itemId);
    };


    /**
     * Set header mode
     * @param {sm.bSmSubheader.SmSubheader.Mode} mode
     * @return {boolean}
     * @public
     */
    Subheader.prototype.setMode = function(mode) {
        var res = (this.isCorrectMode_(mode) && !this.isCurrentMode_(mode));

        if (res) {
            this.mode_ = mode;
            this.switchMode_(mode);
        }

        return res;
    };


    /**
     * @return {{
     *     text: ?string,
     *     areaId: ?number,
     *     metroId: ?number
     * }}
     * @public
     */
    Subheader.prototype.getSearchData = function() {
        return this.search_.getData();
    };


    /**
     * Init listeners for Minified search field
     * @private
     */
    Subheader.prototype.initMinifiedSearchListeners_ = function() {
        this.getHandler().listen(
            this.minifiedSearch_,
            Search.Event.DEFAULT_MODE_INITED,
            this.onDefaultModeInited_
        ).listen(
            this.minifiedSearch_,
            Search.Event.SEARCH_MODE_INITED,
            this.onSearchModeInited_
        ).listen(
            this.minifiedSearch_,
            Search.Event.TEXT_CHANGE,
            this.onMinifiedSearchTextChange_
        ).listen(
            this.minifiedSearch_,
            Search.Event.SUBMIT,
            this.onSubmit_
        ).listen(
            this.minifiedSearch_,
            Search.Event.ITEM_SELECT,
            this.onSubmit_
        );
    };


    /**
     * Init listeners for search field
     * @private
     */
    Subheader.prototype.initSearchListeners_ = function() {
        this.getHandler().listen(
            this.search_,
            Search.Event.TEXT_CHANGE,
            this.onSearchTextChange_
        ).listen(
            this.search_,
            Search.Event.SUBMIT,
            this.onSubmit_
        ).listen(
            this.search_,
            Search.Event.ITEM_SELECT,
            this.onSubmit_
        );
    };


    /**
     * @private
     */
    Subheader.prototype.onSubmit_ = function() {
        this.dispatchEvent(Subheader.Event.SEARCH_SUBMIT);

        this.minifiedSearch_.reset();
        this.search_.reset();
    };


    /**
     * Set search value in according to minified search value
     * @private
     */
    Subheader.prototype.onMinifiedSearchTextChange_ = function() {
        this.search_.setData(
            this.minifiedSearch_.getData()
        );
    };


    /**
     * Set minified search value in according to search value
     * @private
     */
    Subheader.prototype.onSearchTextChange_ = function() {
        this.minifiedSearch_.setData(
            this.search_.getData()
        );
    };


    /**
     * Is mode already selected
     * @param {sm.bSmSubheader.SmSubheader.Mode} mode
     * @return {boolean}
     * @private
     */
    Subheader.prototype.isCurrentMode_ = function(mode) {
        return this.mode_ == mode;
    };


    /**
     * Is mode correct
     * @param {sm.bSmSubheader.SmSubheader.Mode} mode
     * @return {boolean}
     * @private
     */
    Subheader.prototype.isCorrectMode_ = function(mode) {
        return mode == Subheader.Mode.DEFAULT ||
               mode == Subheader.Mode.SEARCH;
    };


    /**
     * Switch mode of view of header and search
     * @param {sm.bSmSubheader.SmSubheader.Mode} mode
     * @private
     */
    Subheader.prototype.switchMode_ = function(mode) {
        switch (mode) {
            case Subheader.Mode.DEFAULT:
                this.getView().switchToDefaultMode();
                if (this.minifiedSearch_) {
                    this.minifiedSearch_.setMode(Search.Mode.DEFAULT);
                }
                break;

            case Subheader.Mode.SEARCH:
                this.getView().switchToSearchMode();
                if (this.minifiedSearch_) {
                    this.minifiedSearch_.setMode(Search.Mode.SEARCH);
                }
                break;
        }
    };


    /**
     * Default mode inition handler
     * @param {Object} event
     * @private
     */
    Subheader.prototype.onDefaultModeInited_ = function(event) {
        this.setMode(Subheader.Mode.DEFAULT);
    };


    /**
     * Search mode inition handler
     * @param {Object} event
     * @private
     */
    Subheader.prototype.onSearchModeInited_ = function(event) {
        this.setMode(Subheader.Mode.SEARCH);
    };


    /**
     * Initializes search instance
     * @private
     */
    Subheader.prototype.initSearch_ = function() {
        var domElements = this.getView().getDom();

        if (domElements.minifiedSearch) {
            this.minifiedSearch_ = new Search();
            this.addChild(this.minifiedSearch_);
            this.minifiedSearch_.decorate(domElements.minifiedSearch);
        }

        if (domElements.search) {
            this.search_ = new Search();
            this.addChild(this.search_);
            this.search_.decorate(domElements.search);
        }
    };


    /**
     * Initializes authorization Link instance
     * @private
     */
    Subheader.prototype.initAuthorizationLink_ = function() {
        this.authorizationLink_ = this.decorateChild(
            'authorization-link',
            this.getView().getDom().authorizationLink
        );
    };


    /**
     * Initializes favorite instance
     * @private
     */
    Subheader.prototype.initFavorite_ = function() {
        this.favorite_ = this.decorateChild(
            'smFavorite',
            this.getView().getDom().favorite
        );
    };


    /**
     * Initializes links instance
     * @private
     */
    Subheader.prototype.initLinks_ = function() {
        var links = this.getView().getDom().links,
            instance;

        for (var i = 0; i < links.length; i++) {
            instance = this.decorateChild(
                'smLink',
                links[i]
            );

            this.links_.push(instance);
        }
    };


    /**
     * Initializes list of links instance
     * @private
     */
    Subheader.prototype.initListLinks_ = function() {
        var listLinks = this.getView().getDom().listLinks;

        if (listLinks) {
            this.listLinks_ = this.decorateChild(
                'dropdown-list-links',
                listLinks
            );
        }
    };
});  // goog.scope
