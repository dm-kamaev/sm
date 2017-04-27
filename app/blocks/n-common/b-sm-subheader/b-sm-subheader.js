goog.provide('sm.bSmSubheader.SmSubheader');

goog.require('cl.iControl.Control');
goog.require('cl.iFactory.FactoryManager');
goog.require('goog.dom');
goog.require('sm.bSearch.Search');
goog.require('sm.bSmFavorite.SmFavorite');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmRowLinks.SmRowLinks');
goog.require('sm.bSmSubheader.SearchSubmitEvent');
goog.require('sm.bSmSubheader.Template');
goog.require('sm.bSmSubheader.View');
goog.require('sm.gDropdown.DropdownListLinks');
goog.require('sm.iCloblFactory.FactoryStendhal');



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
     * favorite instance
     * @type {sm.bFavorite.Favorite}
     * @private
     */
    this.favorite_ = null;


    /**
     * links instances
     * @type {?Array<sm.bSmLink.SmLink>}
     * @private
     */
    this.iconLinks_ = null;


    /**
     * Row link instance
     * @type {sm.bSmRowLink.SmRowLink}
     * @private
     */
    this.rowLinks_ = null;


    /**
     * Dropdown List Links instance
     * @type {?sm.gDropdown.DropdownListLinks}
     * @private
     */
    this.dropdownLinks_ = null;
};
goog.inherits(sm.bSmSubheader.SmSubheader, cl.iControl.Control);


goog.scope(function() {
    var Subheader = sm.bSmSubheader.SmSubheader,
        View = sm.bSmSubheader.View,
        Search = sm.bSearch.Search;

    var SearchSubmitEvent = sm.bSmSubheader.SearchSubmitEvent;

    /**
     * Name of this element in factory
     */
    Subheader.NAME = sm.bSmSubheader.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Subheader.NAME, {
        control: Subheader,
        view: View
    });

    /**
     * Subheader modes
     * @enum {string}
     */
    Subheader.Mode = {
        'DEFAULT': 'default',
        'SEARCH': 'search'
    };


    /**
     * Css class enum
     * @enum {string}
     */
    Subheader.CssClass = {
        ROOT: View.CssClass.ROOT
    };


    /**
     * Event enum
     * @enum {string}
     */
    Subheader.Event = {
        'SEARCH_SUBMIT': SearchSubmitEvent.Type,
        'HAMBURGER_MENU_CLICK': goog.events.getUniqueId('hamburger_click')
    };


    /**
     * @override
     * @public
     */
    Subheader.prototype.enterDocument = function() {
        Subheader.base(this, 'enterDocument');

        this.initMinifiedSearchListeners_();
        this.initSearchListeners_();
        this.initHamburgerMenuListener_();
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
     * @override
     * @protected
     */
    Subheader.prototype.decorateInternal = function(element) {
        Subheader.base(this, 'decorateInternal', element);

        this.initSearch_();
        this.initFavorite_();
        this.initLinks_();
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
     * Hamburger icon click handler
     * @private
     */
    Subheader.prototype.onHamburgerMenuClick_ = function() {
        this.dispatchEvent(Subheader.Event.HAMBURGER_MENU_CLICK);
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
     * Search submit event handler
     * @param {goog.events.Event} event
     * @private
     */
    Subheader.prototype.onSubmit_ = function(event) {
        var searchInstance = event.target,
            searchSubmitEvent = new SearchSubmitEvent(searchInstance.getData());
        this.dispatchEvent(searchSubmitEvent);

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
     * Initializes favorite instance
     * @private
     */
    Subheader.prototype.initFavorite_ = function() {
        this.favorite_ = this.decorateChild(
            sm.bSmFavorite.SmFavorite.NAME,
            this.getView().getDom().favorite
        );
    };


    /**
     * Initializes links instance
     * @private
     */
    Subheader.prototype.initLinks_ = function() {
        var dom = this.getView().getDom();

        if (dom.iconLinks) {
            this.iconLinks_ = this.decorateChildren(
                sm.bSmLink.SmLink.NAME,
                dom.iconLinks
            );
        }

        if (dom.dropdownLinks) {
            this.dropdownLinks_ = this.decorateChild(
                sm.gDropdown.DropdownListLinks.NAME,
                dom.dropdownLinks
            );
        }

        if (dom.rowLinks) {
            this.rowLinks_ = this.decorateChild(
                sm.bSmRowLinks.SmRowLinks.NAME,
                dom.rowLinks
            );
        }
    };
});  // goog.scope
