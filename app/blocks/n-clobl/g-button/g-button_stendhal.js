goog.provide('sm.gButton.ButtonStendhal');

goog.require('cl.gButton.Button');
goog.require('cl.gButton.View');
goog.require('sm.gButton.TemplateStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Button control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gButton.Button}
 */
sm.gButton.ButtonStendhal = function(view, opt_params, opt_domHelper) {
    sm.gButton.ButtonStendhal.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gButton.ButtonStendhal, cl.gButton.Button);


/**
 * Name of this element in factory
 */
sm.gButton.ButtonStendhal.NAME = sm.gButton.TemplateStendhal.NAME();

sm.iCloblFactory.FactoryStendhal.getInstance().register(
    sm.gButton.ButtonStendhal.NAME, {
        control: sm.gButton.ButtonStendhal,
        view: cl.gButton.View
});


/**
 * Event enum
 * @enum {string}
 */
sm.gButton.ButtonStendhal.Event = {
    CLICK: cl.gButton.Button.Event.CLICK
};
