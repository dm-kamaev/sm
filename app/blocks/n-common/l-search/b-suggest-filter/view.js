goog.provide('sm.lSearch.bSuggestFilter.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('gorod.gSuggest.Suggest');



/**
 * Suggest Filter View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSearch.bSuggestFilter.View = function(opt_params, opt_type,
    opt_modifier) {

    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bSuggestFilter.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lSearch.bSuggestFilter.View,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-suggest-filter',
        FILTER_SECTION: 'b-suggest-filter__section_filter',
        PLACEHOLDER_SECTION: 'b-suggest-filter__section_placeholder'
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
     * adds or deletes class to show placeholder
     * @param {bool} visible
     */
    View.prototype.setPlaceholderVisibility = function(visible) {
        var isContains = goog.dom.classlist.contains(
            this.dom.placeholderSection,
            Utils.CssClass.HIDDEN
        );

        if (visible && isContains) {
            goog.dom.classlist.remove(
                this.dom.placeholderSection,
                Utils.CssClass.HIDDEN
            );
        }
        else if (!visible && !isContains) {
            goog.dom.classlist.add(
                this.dom.placeholderSection,
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * adds or deletes class to show filters
     * @param {bool} visible
     */
    View.prototype.setFilterVisibility = function(visible) {
        var isContains = goog.dom.classlist.contains(
            this.dom.filterSection,
            Utils.CssClass.HIDDEN
        );

        if (visible && isContains) {
            goog.dom.classlist.remove(
                this.dom.filterSection,
                Utils.CssClass.HIDDEN
            );
        }
        else if (!visible && !isContains) {
            goog.dom.classlist.add(
                this.dom.filterSection,
                Utils.CssClass.HIDDEN
            );
        }
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
            suggestInput: this.getElementByClass(
                gorod.gSuggest.Suggest.Css.INPUT,
                element
            ),
            suggestList: this.getElementByClass(
                gorod.gSuggest.Suggest.Css.LIST,
                element
            ),
            placeholderSection: this.getElementByClass(
                View.CssClass.PLACEHOLDER_SECTION,
                element
            ),
            filterSection: this.getElementByClass(
                View.CssClass.FILTER_SECTION,
                element
            ),
            filter: this.getElementByClass(
                sm.lSearch.bFilter.View.CssClass.ROOT,
                element
            ),
            selected: this.getElementByClass(
                sm.lSearch.bFilter.ViewLabels.CssClass.ROOT,
                element
            ),
            button: this.getElementByClass(
                cl.gButton.View.CssClass.ROOT,
                element
            )
        };
    };
});  // goog.scope
