goog.provide('sm.lSearch.Search');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearchPanel.View');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryStendhal');

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
     * Search Panel instance
     * @type {sm.bSearchPanel.PanelSearch}
     * @private
     */
    this.searchPanel_ = null;

    /**
     * instance popular Schools
     * @type {sm.bPopularSchools.PopularSchools}
     * @private
     */
    this.popularSchools_ = null;
};
goog.inherits(sm.lSearch.Search, goog.ui.Component);

goog.scope(function() {
    var Search = sm.lSearch.Search,
        PopularSchools = sm.bPopularSchools.PopularSchools;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Search.CssClass = {
        ROOT: 'l-search'
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

        var bSearchPanel = goog.dom.getElementByClass(
            sm.bSearchPanel.View.CssClass.ROOT,
            element
        );

        this.searchPanel_ =
            sm.iFactory.FactoryStendhal.getInstance().decorate(
                'search-panel',
                bSearchPanel,
                this
            );

        var bPopularSchools = goog.dom.getElementByClass(
            sm.bPopularSchools.View.CssClass.ROOT,
            element
        );

        this.popularSchools_ =
            sm.iFactory.FactoryStendhal.getInstance().decorate(
                'popular-schools',
                bPopularSchools,
                this
            );
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
