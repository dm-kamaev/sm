goog.provide('sm.lSearchResult.SearchResult');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.lSearchResult.Template');
goog.require('sm.lSearchResult.bFilters.Filters');
goog.require('sm.lSearchResult.bSchoolList.SchoolList');
goog.require('sm.lSearchResult.bSort.Sort');

/**
 * Search result component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.SearchResult = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Instance
     * @type {sm.lSearchResult.bSort.Sort}
     * @private
     */
    this.sort_ = null;
};
goog.inherits(sm.lSearchResult.SearchResult, goog.ui.Component);

goog.scope(function() {
    var SearchResult = sm.lSearchResult.SearchResult,
        SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        Sort = sm.lSearchResult.bSort.Sort,
        Filters = sm.lSearchResult.bFilters.Filters;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SearchResult.CssClass = {
        ROOT: 'l-search-result'
    };

    /**
     * @override
     */
    SearchResult.prototype.decorate = function(element) {
        goog.base(this, 'decorate', element);

        this.params_ = jQuery(element).data('params') || {};
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    SearchResult.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.Template.base,
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
    SearchResult.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        //school list
        var bSchoolList = goog.dom.getElementByClass(
                SchoolList.CssClass.ROOT,
                element
            ),
            bSchoolListInstance = new SchoolList();

        this.addChild(bSchoolListInstance);
        bSchoolListInstance.decorate(bSchoolList);

        //sort
        var sortElement = goog.dom.getElementByClass(
            Sort.CssClass.ROOT,
            element
        );
        this.sort_ = new Sort();
        this.addChild(this.sort_);
        this.sort_.decorate(sortElement);

        //filters
        var filtersElement = goog.dom.getElementByClass(
                Filters.CssClass.ROOT,
                element
            ),
            filters = new Filters();

        this.addChild(filters);
        filters.decorate(filtersElement);
    };

    /**
     * Set up the Component.
     */
    SearchResult.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.sort_,
            Sort.Event.ITEM_CLICK,
            this.onSortHandler_
        );

    };

    /**
     * Sort item click handler
     * @param {Object} event
     * @private
     */
    SearchResult.prototype.onSortHandler_ = function(event) {
        console.log('Sorting by item: '+ event.itemId);
    }
});

/**
 * creates sm.lSearchResult.SearchResult instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lSearchResult.SearchResult.CssClass.ROOT
        );

    if(root) {
        var searchResult = new sm.lSearchResult.SearchResult();
        searchResult.decorate(root)
    }
});
