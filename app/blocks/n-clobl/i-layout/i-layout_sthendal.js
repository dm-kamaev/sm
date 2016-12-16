goog.provide('sm.iLayout.LayoutStendhal');

goog.require('cl.iControl.Control');
goog.require('cl.iFactory.FactoryManager');
goog.require('goog.dom');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iCarrotquest.Carrotquest');
goog.require('sm.iFactory.FactoryExperimental');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.iFactory.TemplateFactoryExperimental');
goog.require('sm.iFactory.TemplateFactoryStendhal');
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
};
goog.inherits(sm.iLayout.LayoutStendhal, cl.iControl.Control);


goog.scope(function() {
    var Layout = sm.iLayout.LayoutStendhal,
        View = sm.iLayout.ViewStendhal;

    /**
     * @override
     */
    Layout.prototype.decorateInternal = function(element) {
        Layout.base(this, 'decorateInternal', element);

        this.initAuthorization();
        this.initSubheader();
        this.initFooter();
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
        var that = this;
        this.subheader = this.decorateChild(
            'smSubheader',
            this.getView().getDom().subheader
        );
    };


    /**
     * Init footer instance
     * @protected
     */
    Layout.prototype.initFooter = function() {
        var that = this;
        this.footer = this.decorateChild(
            'smFooter',
            this.getView().getDom().footer
        );
    };
});  // goog.scope
