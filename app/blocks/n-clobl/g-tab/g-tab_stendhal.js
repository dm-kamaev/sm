goog.provide('sm.gTab.TabStendhal');

goog.require('cl.gTab.Tab');
goog.require('cl.gTab.View');
goog.require('sm.gTab.TemplateStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Tab control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gTab.Tab}
 */
sm.gTab.TabStendhal = function(view, opt_params, opt_domHelper) {
    sm.gTab.TabStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gTab.TabStendhal, cl.gTab.Tab);


/**
 * Name of this element in factory
 */
sm.gTab.TabStendhal.NAME = sm.gTab.TemplateStendhal.NAME();

sm.iCloblFactory.FactoryStendhal.getInstance().register(
    sm.gTab.TabStendhal.NAME, {
        control: sm.gTab.TabStendhal,
        view: cl.gTab.View
    });
