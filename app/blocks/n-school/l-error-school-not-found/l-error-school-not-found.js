goog.provide('sm.lErrorSchoolNotFound.ErrorSchoolNotFound');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSearchPanel.View');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCarrotquest.Carrotquest');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryStendhal');
goog.require('sm.iMetrika.Metrika');



/**
 * ErrorSchoolNotFound result component
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lErrorSchoolNotFound.ErrorSchoolNotFound = function() {
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

    /**
     * Sub header instance
     * @type {sm.bSmSubheader.SmSubheader}
     * @private
     */
    this.subHeader_ = null;

    /**
     * Current factory name
     * @type {string}
     * @private
     */
    this.factory_ = 'stendhal';
};
goog.inherits(sm.lErrorSchoolNotFound.ErrorSchoolNotFound, goog.ui.Component);


goog.scope(function() {
    var ErrorSchoolNotFound = sm.lErrorSchoolNotFound.ErrorSchoolNotFound;


    /**
     * CSS-class enum
     * @enum {string}
     */
    ErrorSchoolNotFound.CssClass = {
        ROOT: 'l-error-school-not-found'
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    ErrorSchoolNotFound.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initParams_()
            .initSubHeader_()
            .initPopularSchools_()
            .initSearchPanel_()
            .initAuthorization_();
    };


    /**
     * Set up the Component
     */
    ErrorSchoolNotFound.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };


    /**
     * Get data params from dom element and put it to corresponding params
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initParams_ = function() {
        var dataParams = JSON.parse(
            goog.dom.dataset.get(this.getElement(), 'params')
        );

        this.authParams_ = {
            isUserAuthorized: dataParams['isUserAuthorized'],
            authSocialLinks: {
                fb: dataParams['authSocialLinks']['fb'],
                vk: dataParams['authSocialLinks']['vk']
            },
            factoryType: this.factory_
        };

        return this;
    };

    /**
     * Init authorization
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initAuthorization_ = function() {
        var authorization = sm.iAuthorization.Authorization.getInstance();
        authorization.init(this.authParams_);
        return this;
    };


    /**
     * Init popular school instance
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initPopularSchools_ = function() {
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
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initSearchPanel_ = function() {
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

    /**
     * Init sub header
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initSubHeader_ = function() {
        var subHeader = goog.dom.getElementByClass(
            sm.bSmSubheader.SmSubheader.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.subHeader_ = cl.iFactory.FactoryManager.getInstance().decorate(
            this.factory_,
            'smSubheader',
            subHeader,
            this
        );

        return this;
    };

});  // goog.scope


/**
 * creates sm.lErrorSchoolNotFound.ErrorSchoolNotFound instance
 */
jQuery(function() {
    var root = goog.dom.getElementByClass(
            sm.lErrorSchoolNotFound.ErrorSchoolNotFound.CssClass.ROOT
        );

    if (root) {
        var search = new sm.lErrorSchoolNotFound.ErrorSchoolNotFound();
        search.decorate(root);
    }
});
