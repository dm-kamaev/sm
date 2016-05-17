goog.provide('sm.lErrorNotFound.ErrorNotFound');

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
 * ErrorNotFound result component
 * @param {Object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lErrorNotFound.ErrorNotFound = function(opt_params) {
    goog.base(this);


    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};


    /**
     * Search Panel instance
     * @type {sm.bSearchPanel.SearchPanel}
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
goog.inherits(sm.lErrorNotFound.ErrorNotFound, goog.ui.Component);


goog.scope(function() {
    var ErrorNotFound = sm.lErrorNotFound.ErrorNotFound,
        PopularSchools = sm.bPopularSchools.PopularSchools;


    /**
     * CSS-class enum
     * @enum {string}
     */
    ErrorNotFound.CssClass = {
        ROOT: 'l-error-not-found'
    };


    /**
     * Template-based dom element creation.
     * @public
     */
    ErrorNotFound.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lErrorNotFound.Template.base,
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
    ErrorNotFound.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

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
    };


    /**
     * Set up the Component
     */
    ErrorNotFound.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

});  // goog.scope


/**
 * creates sm.lErrorNotFound.ErrorNotFound instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lErrorNotFound.ErrorNotFound.CssClass.ROOT
        );

    if (root) {
        var search = new sm.lErrorNotFound.ErrorNotFound();
        search.decorate(root);
    }
});
