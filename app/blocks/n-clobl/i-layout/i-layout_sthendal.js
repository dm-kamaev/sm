goog.provide('sm.iLayout.LayoutStendhal');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.json');
goog.require('sm.bSmFooter.SmFooter');
goog.require('sm.bSmHeader.SmHeader');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.gAuthSocial.AuthSocialStendhal');
goog.require('sm.gAuthSocialModal.AuthSocialModalStendhal');
goog.require('sm.gButton.ButtonSocialStendhal');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gModal.ModalSideMenu');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iCloblFactory.FactoryExperimental');
goog.require('sm.iLayout.ViewStendhal');
goog.require('sm.iMetrika.Metrika');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.iLayout.LayoutStendhal = function(view, opt_domHelper) {
    sm.iLayout.LayoutStendhal.base(this, 'constructor', view, opt_domHelper);

    /**
     * Main header instance
     * @type {sm.bSmHeader.SmHeader}
     * @protected
     */
    this.mainHeader = null;

    /**
     * Subheader instance
     * @type {sm.bSmSubheader.SmSubheader}
     * @protected
     */
    this.subheader = null;


    /**
     * Footer instance
     * @type {sm.bSmFooter.SmFooter}
     * @protected
     */
    this.footer = null;


    /**
     * Side menu instance
     * @type {sm.gModal.ModalSideMenu}
     * @protected
     */
    this.sideMenu = null;
};
goog.inherits(sm.iLayout.LayoutStendhal, cl.iControl.Control);


goog.scope(function() {
    var Layout = sm.iLayout.LayoutStendhal;

    /**
     * Parameter name in config in data params which corresponds
     * to current factory name
     * @const {string}
     */
    Layout.FactoryNameParameter = 'modifier';

    /**
     * @override
     * @protected
     */
    Layout.prototype.decorateInternal = function(element) {
        Layout.base(this, 'decorateInternal', element);

        this.initAuthorization();
        this.initMainHeader();
        this.initSubheader();
        this.initFooter();
        this.initSideMenu();
    };

    /**
     * Side menu initialization
     * @protected
     */
    Layout.prototype.initSideMenu = function() {
        this.sideMenu = this.decorateChild(
            sm.gModal.ModalSideMenu.NAME,
            this.getView().getDom().sideMenu
        );
    };

    /**
     * Initializes the main header of the page
     * @protected
     */
    Layout.prototype.initMainHeader = function() {
        this.mainHeader = this.decorateChild(
            sm.bSmHeader.SmHeader.NAME,
            this.getView().getDom().mainHeader
        );
    };

    /**
     * Init authorization
     * @protected
     */
    Layout.prototype.initAuthorization = function() {
        var authorization = sm.iAuthorization.Authorization.getInstance(),
            params = this.getView().getAuthParams();

        authorization.init(params);
    };

    /**
     * Init subheader instance
     * @protected
     */
    Layout.prototype.initSubheader = function() {
        this.subheader = this.decorateChild(
            sm.bSmSubheader.SmSubheader.NAME,
            this.getView().getDom().subheader
        );
    };

    /**
     * Init footer instance
     * @protected
     */
    Layout.prototype.initFooter = function() {
        this.footer = this.decorateChild(
            sm.bSmFooter.SmFooter.NAME,
            this.getView().getDom().footer
        );
    };

    /**
     * Enter document
     * @override
     * @public
     */
    Layout.prototype.enterDocument = function() {
        Layout.base(this, 'enterDocument');

        this.listen(
            sm.bSmSubheader.SmSubheader.Event.HAMBURGER_MENU_CLICK,
            this.onHamburgerMenuClick_
        );
    };


    /**
     * On hamburger menu click
     * @private
     */
    Layout.prototype.onHamburgerMenuClick_ = function() {
        this.sideMenu.show();
    };


    /**
     * Init layout instance
     * @param {string} LayoutName layout name in factory
     * @param {string} RootCssClass layout root css class
     * @public
     */
    Layout.autoInstance = function(LayoutName, RootCssClass) {
        var domElement = goog.dom.getElementByClass(RootCssClass);

        if (domElement) {
            var params = goog.dom.dataset.get(domElement, 'params');
            var factoryName =
                goog.json.parse(params)[Layout.FactoryNameParameter];

            var factory = factoryName == 'stendhal' ?
                sm.iCloblFactory.FactoryStendhal :
                sm.iCloblFactory.FactoryExperimental;

            factory.getInstance().decorate(LayoutName, domElement);
        }
    };

});  // goog.scope
