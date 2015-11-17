goog.provide('sm.lSearchResult.SearchResult');

goog.require('sm.lSearchResult.Template');
goog.require('sm.lSearchResult.bSchoolList.SchoolList');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * School list component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.SearchResult = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type{Object}
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSearchResult.SearchResult, goog.ui.Component);

goog.scope(function() {
    var SearchResult = sm.lSearchResult.SearchResult,
        SchoolList = sm.lSearchResult.bSchoolList.SchoolList;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SearchResult.CssClass = {
        ROOT: 'l-search-result__body',
        SCHOOL_LIST: SchoolList.CssClass.ROOT
    };

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
        var bSchoolList = goog.dom.getElementByClass(
            SearchResult.CssClass.SCHOOL_LIST,
            element
        );
        var bSchoolListInstance = new SchoolList();
        this.addChild(bSchoolListInstance);
        bSchoolListInstance.decorate(bSchoolList);
    };

    /**
     * Set up the Component.
     */
    SearchResult.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
     * Clean up the Component.
     */
    SearchResult.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };
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
