goog.provide('sm.bHeader.Header');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bAuthorizationLink.AuthorizationLink');
goog.require('sm.bHeader.View');
goog.require('sm.bSearch.Search');


/**
 * Header
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bHeader.Header = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    this.setSupportedState(goog.ui.Component.State.FOCUSED, false);

    /**
     * Current mode
     * @type {Header.Mode|string}
     * @private
     */
    this.mode_ = sm.bHeader.Header.Mode.DEFAULT;

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
     * Banner instance
     * @type {sm.bBanner.Banner}
     * @private
     */
    this.banner_ = null;

    /**
     * Authorization Link instance
     * @type {sm.bAuthorizationLink.AuthorizationLink}
     * @private
     */
    this.authorizationLink_ = null;
};
goog.inherits(sm.bHeader.Header, cl.iControl.Control);


goog.scope(function() {
    var Header = sm.bHeader.Header,
        View = sm.bHeader.View,
        Search = sm.bSearch.Search,
        AuthorizationLink = sm.bAuthorizationLink.AuthorizationLink,
        FactoryManager = cl.iFactory.FactoryManager;


    /**
     * Header modes
     * @enum {string}
     */
    Header.Mode = {
        'DEFAULT': 'default',
        'SEARCH': 'search'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Header.Event = {
        'SUBMIT': Search.Event.SUBMIT,
        'ITEM_SELECT': Search.Event.ITEM_SELECT
    };

    /**
     * Singleton getter
     * @return {sm.bHeader.Header}
     */
    Header.getInstance = function() {
        if (!Header.instance_) {
            Header.instance_ = FactoryManager.getInstance().decorate(
                'stendhal',
                'header',
                goog.dom.getElementByClass(View.CssClass.ROOT)
            );
        }

        return Header.instance_;
    };

    /**
     * @override
     */
    Header.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

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

        this.banner_ = this.decorateChild('banner', domElements.banner);

        this.authorizationLink_ = this.decorateChild(
            'authorization-link',
            domElements.authorizationLink
        );
    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        this.initMinifiedSearchListeners_();
        this.initSearchListeners_();
    };


    /**
     * @private
     */
    Header.prototype.initMinifiedSearchListeners_ = function() {
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
     * @private
     */
    Header.prototype.initSearchListeners_ = function() {
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
    Header.prototype.onSubmit_ = function() {
        this.minifiedSearch_.reset();
        this.search_.reset();
    };

    /**
     * Set header mode
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     */
    Header.prototype.setMode = function(mode) {
        var res = (this.isCorrectMode_(mode) && !this.isCurrentMode_(mode));

        if (res) {
            this.mode_ = mode;
            this.switchMode_(mode);
        }

        return res;
    };

    /**
     * @public
     * @return {{
     *     text: ?string,
     *     areaId: ?number,
     *     metroId: ?number
     * }}
     */
    Header.prototype.getSearchData = function() {
        return this.search_.getData();
    };

    /**
     * Set search value in according to minified search value
     * @private
     */
    Header.prototype.onMinifiedSearchTextChange_ = function() {
        this.search_.setData(
            this.minifiedSearch_.getData()
        );
    };

    /**
     * Set minified search value in according to search value
     * @private
     */
    Header.prototype.onSearchTextChange_ = function() {
        this.minifiedSearch_.setData(
            this.search_.getData()
        );
    };

    /**
     * Is mode already selected
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     * @private
     */
    Header.prototype.isCurrentMode_ = function(mode) {
        return this.mode_ == mode;
    };


    /**
     * Is mode correct
     * @param {sm.bHeader.Header.Mode} mode
     * @return {boolean}
     * @private
     */
    Header.prototype.isCorrectMode_ = function(mode) {
        return mode == Header.Mode.DEFAULT ||
               mode == Header.Mode.SEARCH;
    };


    /**
     * Switch mode of view of header and search
     * @param {sm.bHeader.Header.Mode} mode
     * @private
     */
    Header.prototype.switchMode_ = function(mode) {
        switch (mode) {
            case Header.Mode.DEFAULT:
                this.getView().switchToDefaultMode();
                if (this.minifiedSearch_) {
                    this.minifiedSearch_.setMode(Search.Mode.DEFAULT);
                }
                break;

            case Header.Mode.SEARCH:
                this.getView().switchToSearchMode();
                if (this.minifiedSearch_) {
                    this.minifiedSearch_.setMode(Search.Mode.SEARCH);
                }
                break;
        }
    };

    /**
     * Default mode inition handler
     * @param {object} event
     * @private
     */
    Header.prototype.onDefaultModeInited_ = function(event) {
        this.setMode(Header.Mode.DEFAULT);
    };


    /**
     * Search mode inition handler
     * @param {object} event
     * @private
     */
    Header.prototype.onSearchModeInited_ = function(event) {
        this.setMode(Header.Mode.SEARCH);
    };


    jQuery(function() {
        Header.getInstance();
    });
});
