goog.provide('sm.lSearchResult.bFilterSearch.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('gorod.gSuggest.Suggest');



/**
 * FilterSearch View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSearchResult.bFilterSearch.View = function(opt_params, opt_type,
    opt_modifier) {

    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.lSearchResult.bFilterSearch.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lSearchResult.bFilterSearch.View,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-filter-search'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            suggest: this.getElementByClass(
                gorod.gSuggest.Suggest.Css.ROOT,
                element
            ),
            search: this.getElementByClass(
               sm.bSearch.Search.CssClass.ROOT,
                element
            ),
            filter: this.getElementByClass(
                sm.lSearchResult.bFilter.Filter.CssClass.ROOT,
                element
            ),
            selected: this.getElementByClass(
                sm.lSearchResult.bFilter.FilterLabels.CssClass.ROOT,
                element
            ),
            button: this.getElementByClass(
                cl.gButton.View.CssClass.ROOT,
                element
            )
        };
    };
});  // goog.scope
