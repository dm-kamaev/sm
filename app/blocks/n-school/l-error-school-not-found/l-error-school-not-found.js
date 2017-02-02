goog.provide('sm.lErrorSchoolNotFound.ErrorSchoolNotFound');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bPopularSchools.PopularSchools');
goog.require('sm.bSearchPanel.SearchPanel');
goog.require('sm.bSmFooter.SmFooter');
goog.require('sm.bSmHeader.SmHeader');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.gAuthSocial.AuthSocialStendhal');
goog.require('sm.gAuthSocialModal.AuthSocialModalStendhal');
goog.require('sm.gButton.ButtonSocialStendhal');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gModal.ModalSideMenu');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iCarrotquest.Carrotquest');
goog.require('sm.iMetrika.Metrika');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



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
     * Footer instance
     * @type {sm.bSmFooter.SmFooter}
     * @private
     */
    this.footer_ = null;


    /**
     * Header instance
     * @type {sm.bSmHeader.SmHeader}
     * @private
     */
    this.header_ = null;

    /**
     * Sub header instance
     * @type {sm.bSmSubheader.SmSubheader}
     * @private
     */
    this.subHeader_ = null;


    /**
     * Side menu instance
     * @type {sm.gModal.ModalSideMenu}
     * @private
     */
    this.sideMenu_ = null;

};
goog.inherits(sm.lErrorSchoolNotFound.ErrorSchoolNotFound, goog.ui.Component);


goog.scope(function() {
    var ErrorSchoolNotFound = sm.lErrorSchoolNotFound.ErrorSchoolNotFound,
        Factory = sm.iNewFactory.FactoryStendhal.INSTANCE,
        Utils = cl.iUtils.Utils;


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
            .initHeader_()
            .initSubHeader_()
            .initPopularSchools_()
            .initSearchPanel_()
            .initAuthorization_()
            .initFooter_()
            .initSideMenu_();
    };


    /**
     * Set up the Component
     */
    ErrorSchoolNotFound.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.listenSubheader_();
    };


    /**
     * Init side menu listeners
     * @private
     */
    ErrorSchoolNotFound.prototype.listenSubheader_ = function() {
        this.getHandler().listen(
            this.subHeader_,
            sm.bSmSubheader.SmSubheader.Event.HAMBURGER_MENU_CLICK,
            this.onHamburgerMenuClick_
        );
    };


    /**
     * Subheader hamburger icon click handler
     * @private
     */
    ErrorSchoolNotFound.prototype.onHamburgerMenuClick_ = function() {
        this.sideMenu_.show();
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
            }
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
            Factory.decorate(
                sm.bPopularSchools.PopularSchools.NAME,
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
            Factory.decorate(
                sm.bSearchPanel.SearchPanel.NAME,
                bSearchPanel,
                this
            );

        return this;
    };


    /**
     * Init footer
     * @return {sm.lSchool.School}
     * @private
     */
    ErrorSchoolNotFound.prototype.initFooter_ = function() {
        var footer = goog.dom.getElementByClass(
            sm.bSmFooter.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.footer_ = Factory.decorate(
            sm.bSmFooter.SmFooter.NAME,
            footer,
            this
        );

        return this;
    };


    /**
     * Init header
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initHeader_ = function() {
        var header = goog.dom.getElementByClass(
           sm.bSmHeader.View.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.subHeader_ = Factory.decorate(
            sm.bSmHeader.SmHeader.NAME,
            header,
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

        this.subHeader_ = Factory.decorate(
            sm.bSmSubheader.SmSubheader.NAME,
            subHeader,
            this
        );

        return this;
    };


    /**
     * Init side menu
     * @return {sm.lErrorSchoolNotFound.ErrorSchoolNotFound}
     * @private
     */
    ErrorSchoolNotFound.prototype.initSideMenu_ = function() {
        var sideMenu = goog.dom.getElementByClass(
            sm.gModal.ViewSideMenu.CssClass.ROOT,
            goog.dom.getDocument()
        );

        this.sideMenu_ = Factory.decorate(
            sm.gModal.ModalSideMenu.NAME,
            sideMenu,
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
