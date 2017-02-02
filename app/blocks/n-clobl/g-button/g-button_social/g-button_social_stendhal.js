goog.provide('sm.gButton.ButtonSocialStendhal');

goog.require('cl.gButton.ButtonSocial');
goog.require('cl.gButton.ViewSocial');
goog.require('sm.gButton.TemplateSocialStendhal');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * ButtonSocial control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gButton.ButtonSocial}
 */
sm.gButton.ButtonSocialStendhal = function(view, opt_params, opt_domHelper) {
    sm.gButton.ButtonSocialStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gButton.ButtonSocialStendhal, cl.gButton.ButtonSocial);


/**
 * Name of this element in factory
 */
sm.gButton.ButtonSocialStendhal.NAME = sm.gButton.TemplateSocialStendhal.NAME();

sm.iNewFactory.FactoryStendhal.INSTANCE.register(
    sm.gButton.ButtonSocialStendhal.NAME, {
        control: sm.gButton.ButtonSocialStendhal,
        view: cl.gButton.ViewSocial
});
