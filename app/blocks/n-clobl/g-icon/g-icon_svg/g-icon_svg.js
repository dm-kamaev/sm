goog.provide('sm.gIcon.IconStendhal');

goog.require('cl.gIcon.Icon');
goog.require('cl.gIcon.View');
goog.require('sm.gIcon.TemplateSvg');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Icon control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gIcon.Icon}
 */
sm.gIcon.IconStendhal = function(view, opt_params, opt_domHelper) {
    sm.gIcon.IconStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gIcon.IconStendhal, cl.gIcon.Icon);


/**
 * Name of this element in factory
 */
sm.gIcon.IconStendhal.NAME = sm.gIcon.TemplateSvg.NAME();

sm.iCloblFactory.FactoryStendhal.getInstance().register(
    sm.gIcon.IconStendhal.NAME, {
        control: sm.gIcon.IconStendhal,
        view: cl.gIcon.View
    });
