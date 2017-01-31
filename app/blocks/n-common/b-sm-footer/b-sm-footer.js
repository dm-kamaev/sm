goog.provide('sm.bSmFooter.SmFooter');

goog.require('cl.iControl.Control');
goog.require('sm.bSmFooter.Template');
goog.require('sm.bSmFooter.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmFooter.SmFooter = function(view, opt_domHelper) {
    sm.bSmFooter.SmFooter.base(this, 'constructor', view, opt_domHelper);


    /**
     * Links instances
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.links_ = [];
};
goog.inherits(sm.bSmFooter.SmFooter, cl.iControl.Control);


goog.scope(function() {
    var Footer = sm.bSmFooter.SmFooter,
        View = sm.bSmFooter.View;

    /**
     * Name of this element in factory
     */
    Footer.NAME = sm.bSmFooter.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Footer.NAME, {
        control: Footer,
        view: View
    });

    /**
     * @override
     */
    Footer.prototype.decorateInternal = function(element) {
        Footer.base(this, 'decorateInternal', element);

        this.initLinks_();
    };


    /**
     * Init links instances
     * @private
     */
    Footer.prototype.initLinks_ = function() {
        this.links_ = this.decorateChildren(
            sm.bSmLink.SmLink.NAME,
            this.getView().getDom().links
        );
    };
});  // goog.scope
