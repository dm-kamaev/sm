goog.provide('sm.lCatalog.Catalog');

goog.require('sm.gTab.TabStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lCatalog.Template');
goog.require('sm.lCatalog.View');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lCatalog.Catalog = function(view, opt_domHelper) {
        sm.lCatalog.Catalog.base(this, 'constructor', view, opt_domHelper);


        /**
         * Tab instance
         * @type {cl.gTab.Tab}
         * @private
         */
        this.tabsCatalog_ = null;
    };
    goog.inherits(sm.lCatalog.Catalog, sm.iLayout.LayoutStendhal);

    var Catalog = sm.lCatalog.Catalog,
        View = sm.lCatalog.View;

    /**
     * Name of this element in factory
     */
    Catalog.NAME = sm.lCatalog.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Catalog.NAME, {
        control: Catalog,
        view: View
    });
    /**
     * @param {Element} element
     * @override
     */
    Catalog.prototype.decorateInternal = function(element) {
        Catalog.base(this, 'decorateInternal', element);

        this.initTabsCatalog_();
    };


    /**
     * Initializes tabs-catalog instance
     * @private
     */
    Catalog.prototype.initTabsCatalog_ = function() {
        this.tabsCatalog_ = this.decorateChild(
            sm.gTab.TabStendhal.NAME,
            this.getView().getDom().tabsCatalog
        );
    };
});  // goog.scope


/**
 * creates sm.lCatalog.Catalog instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lCatalog.View.CssClass.ROOT
    );

    sm.iCloblFactory.FactoryStendhal.getInstance().decorate(
        sm.lCatalog.Catalog.NAME,
        domElement
    );
});
