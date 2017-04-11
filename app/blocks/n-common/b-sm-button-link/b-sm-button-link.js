goog.provide('sm.bSmButtonLink.SmButtonLink');

goog.require('cl.iControl.Control');
goog.require('sm.bSmButtonLink.Template');
goog.require('sm.bSmButtonLink.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmButtonLink.SmButtonLink = function(view, opt_domHelper) {
    sm.bSmButtonLink.SmButtonLink.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSmButtonLink.SmButtonLink, cl.iControl.Control);


goog.scope(function() {
    var SmButtonLink = sm.bSmButtonLink.SmButtonLink,
        View = sm.bSmButtonLink.View;

    /**
     * Name of this element in factory
     */
    SmButtonLink.NAME = sm.bSmButtonLink.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        SmButtonLink.NAME,
        {
            control: SmButtonLink,
            view: View
        }
    );
});  // goog.scope
