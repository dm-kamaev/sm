goog.provide('sm.gAuthSocialModal.AuthSocialModalStendhal');

goog.require('cl.gAuthSocialModal.AuthSocialModal');
goog.require('cl.gAuthSocialModal.View');
goog.require('sm.gAuthSocialModal.TemplateStendhal');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Auth-social-modal control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gAuthSocialModal.AuthSocialModal}
 */
sm.gAuthSocialModal.AuthSocialModalStendhal = function(
    view, opt_params, opt_domHelper) {
    sm.gAuthSocialModal.AuthSocialModalStendhal.base(
            this, 'constructor', view, opt_params, opt_domHelper
        );
};
goog.inherits(
    sm.gAuthSocialModal.AuthSocialModalStendhal,
    cl.gAuthSocialModal.AuthSocialModal
);


/**
 * Name of this element in factory
 */
sm.gAuthSocialModal.AuthSocialModalStendhal.NAME =
    sm.gAuthSocialModal.TemplateStendhal.NAME();

sm.iNewFactory.FactoryStendhal.INSTANCE.register(
    sm.gAuthSocialModal.AuthSocialModalStendhal.NAME, {
        control: sm.gAuthSocialModal.AuthSocialModalStendhal,
        view: cl.gAuthSocialModal.View
    });
