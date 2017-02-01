goog.provide('sm.gHint.HintStendhal');

goog.require('cl.gHint.View');
goog.require('cl.iControl.Control');
goog.require('sm.gHint.TemplateStendhal');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Dropdown control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gAuthSocial.AuthSocial}
 */
sm.gHint.HintStendhal = function(view, opt_params, opt_domHelper) {
    sm.gHint.HintStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gHint.HintStendhal, cl.iControl.Control);


/**
 * Name of this element in factory
 */
sm.gHint.HintStendhal.NAME = sm.gHint.TemplateStendhal.NAME();

sm.iNewFactory.FactoryStendhal.INSTANCE.register(
    sm.gHint.HintStendhal.NAME, {
        control: sm.gHint.HintStendhal,
        view: cl.gHint.View
    });
