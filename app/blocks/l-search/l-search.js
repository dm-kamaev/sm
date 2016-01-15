goog.provide('sm.lSearch.Search');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearch.Search');

/**
 * Search result component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearch.Search = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Search instance
     * @type {?sm.bSearch.Search}
     * @private
     */
    this.search_ = null;

};
goog.inherits(sm.lSearch.Search, goog.ui.Component);

goog.scope(function() {
    var Search = sm.lSearch.Search,
        BlockSearch = sm.bSearch.Search;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'l-search__body',
        SEARCH_BUTTON: 'l-search__button_search'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Search.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearch.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Search.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_(element);

        var bSearch = goog.dom.getElementByClass(
            BlockSearch.CssClass.INPUT,
            element
        );

        this.search_ = new BlockSearch();
        this.addChild(this.search_);
        this.search_.decorate(bSearch);
    };

    /**
     * Set up the Component
     */
    Search.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.search_,
            BlockSearch.Event.SUBMIT,
            this.onSubmit_
        );

        this.getHandler().listen(
            this.elements_.searchButton,
            goog.events.EventType.CLICK,
            this.onButtonClick_
        );

        this.getHandler().listen(
            this.search_,
            BlockSearch.Event.ITEM_SELECT,
            this.onNotSchoolSelect_
        );
    };

    /**
     * gets DOM elements
     * @param {Element} root
     * @private
     */
    Search.prototype.initElements_ = function(root) {
        this.elements_ = {
            searchButton: goog.dom.getElementByClass(
                Search.CssClass.SEARCH_BUTTON
            )
        };
    };

    /**
     * Area/metro redirect handler
     * @param {Object} event
     * @private
     */
    Search.prototype.onNotSchoolSelect_ = function(event) {
        var url = '/school' +
            '?id=' + event.data.id + '&type=' + event.data.type +
                '&name=' + this.search_.getValue();
        document.location.href = url;
    };

    /**
     * Input submit handler
     * @param {Object} event
     * @private
     */
    Search.prototype.onSubmit_ = function(event) {
        this.searchRequest_(event.text);
    };

    /**
     * Button click handler
     * @private
     */
    Search.prototype.onButtonClick_ = function() {
        this.searchRequest_(this.search_.getValue());
    };

    /**
     * Search redirect
     * @param {string} searchString
     * @private
     */
    Search.prototype.searchRequest_ = function(searchString) {
        var url = '/school';
        if (searchString) {
            url += '?name=' + encodeURIComponent(searchString);
        }
        document.location.href = url;
    };
});

/**
 * creates sm.lSearch.Search instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lSearch.Search.CssClass.ROOT
        );

    if (root) {
        var search = new sm.lSearch.Search();
        search.decorate(root);
    }
});
