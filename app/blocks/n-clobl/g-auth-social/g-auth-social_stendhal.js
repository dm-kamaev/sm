goog.provide('sm.gAuthSocial.AuthSocialStendhal');

goog.require('cl.gAuthSocial.AuthSocial');
goog.require('sm.gAuthSocial.TemplateStendhal');
goog.require('sm.gAuthSocial.ViewStendhal');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Auth-social control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gAuthSocial.AuthSocial}
 */
sm.gAuthSocial.AuthSocialStendhal = function(view, opt_params, opt_domHelper) {
    sm.gAuthSocial.AuthSocialStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gAuthSocial.AuthSocialStendhal, cl.gAuthSocial.AuthSocial);


/**
 * Name of this element in factory
 */
sm.gAuthSocial.AuthSocialStendhal.NAME = sm.gAuthSocial.TemplateStendhal.NAME();

sm.iNewFactory.FactoryStendhal.INSTANCE.register(
    sm.gAuthSocial.AuthSocialStendhal.NAME, {
        control: cl.gAuthSocial.AuthSocial,
        view: sm.gAuthSocial.ViewStendhal
});
