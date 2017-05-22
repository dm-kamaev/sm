goog.provide('sm.lInformation.Information');

goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lInformation.Template');
goog.require('sm.lInformation.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.iLayout.LayoutStendhal}
 */
sm.lInformation.Information = function(view, opt_domHelper) {
    sm.lInformation.Information.base(this, 'constructor', view,
        opt_domHelper);
};
goog.inherits(sm.lInformation.Information, sm.iLayout.LayoutStendhal);


goog.scope(function() {
    var Information = sm.lInformation.Information,
        View = sm.lInformation.View;

    /**
     * Name of this element in factory
     */
    Information.NAME = sm.lInformation.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Information.NAME, {
        control: Information,
        view: View
    });
});  // goog.scope
