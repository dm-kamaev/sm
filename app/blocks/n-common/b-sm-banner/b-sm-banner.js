goog.provide('sm.bSmBanner.SmBanner');

goog.require('cl.iControl.Control');
goog.require('sm.bSmBanner.Template');
goog.require('sm.bSmBanner.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmBanner.SmBanner = function(view, opt_domHelper) {
    sm.bSmBanner.SmBanner.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSmBanner.SmBanner, cl.iControl.Control);


goog.scope(function() {
    var SmBanner = sm.bSmBanner.SmBanner,
        View = sm.bSmBanner.View;

    /**
     * Name of this element in factory
     */
    SmBanner.NAME = sm.bSmBanner.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        SmBanner.NAME,
        {
            control: SmBanner,
            view: View
        }
    );
});  // goog.scope