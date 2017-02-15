goog.provide('sm.gIcon.IconSvg');

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
sm.gIcon.IconSvg = function(view, opt_params, opt_domHelper) {
    sm.gIcon.IconSvg.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gIcon.IconSvg, cl.gIcon.Icon);


/**
 * Name of this element in factory
 */
sm.gIcon.IconSvg.NAME = sm.gIcon.TemplateSvg.NAME();

sm.iCloblFactory.FactoryStendhal.getInstance().register(
    sm.gIcon.IconSvg.NAME, {
        control: sm.gIcon.IconSvg,
        view: cl.gIcon.View
    });
