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
goog.require('sm.iMetrika.Metrika');



/**
 * ErrorNotFound result component
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lErrorNotFound.ErrorNotFound = function() {
    goog.base(this);


    /**
     * Parameters
     * @private
     * @type {sm.iAuthorization.Authorization.InitParams}
     */
    this.authParams_ = {};


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
     * Internal decorates the DOM element
     * @param {Element} element
     */
    ErrorNotFound.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_()
            .initPopularSchools_()
            .initSearchPanel_()
            .initAuthorization_();
    };


    /**
     * Set up the Component
     */
    ErrorNotFound.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };


    /**
     * Get data params from dom element and put it to corresponding params
     * @return {sm.lErrorNotFound.ErrorNotFound}
     * @private
     */
    ErrorNotFound.prototype.initParams_ = function() {
        var dataParams = JSON.parse(
            goog.dom.dataset.get(this.getElement(), 'params')
        );

        this.authParams_ = {
            isUserAuthorized: dataParams['isUserAuthorized'],
            authSocialLinks: {
                fb: dataParams['authSocialLinks']['fb'],
                vk: dataParams['authSocialLinks']['vk']
            },
            factoryType: 'stendhal'
        };

        return this;
    };

    /**
     * Init authorization
     * @return {sm.lErrorNotFound.ErrorNotFound}
     * @private
     */
    ErrorNotFound.prototype.initAuthorization_ = function() {
        var authorization = sm.iAuthorization.Authorization.getInstance();
        authorization.init(this.authParams_);
        return this;
    };


    /**
     * Init popular school instance
     * @return {sm.lErrorNotFound.ErrorNotFound}
     * @private
     */
    ErrorNotFound.prototype.initPopularSchools_ = function() {
        var bPopularSchools = goog.dom.getElementByClass(
            sm.bPopularSchools.View.CssClass.ROOT,
            this.getElement()
        );

        this.popularSchools_ =
            sm.iFactory.FactoryStendhal.getInstance().decorate(
                'popular-schools',
                bPopularSchools,
                this
            );

        return this;
    };


    /**
     * Init search panel instance
     * @return {sm.lErrorNotFound.ErrorNotFound}
     * @private
     */
    ErrorNotFound.prototype.initSearchPanel_ = function() {
        var bSearchPanel = goog.dom.getElementByClass(
            sm.bSearchPanel.View.CssClass.ROOT,
            this.getElement()
        );

        this.searchPanel_ =
            sm.iFactory.FactoryStendhal.getInstance().decorate(
                'search-panel',
                bSearchPanel,
                this
            );

        return this;
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
