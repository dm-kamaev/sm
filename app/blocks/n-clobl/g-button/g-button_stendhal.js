goog.provide('sm.gButton.ButtonStendhal');

goog.require('cl.gButton.Button');
goog.require('sm.gButton.TemplateStendhal');
goog.require('sm.gButton.ViewStendhal');
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


goog.scope(function() {
    var Button = sm.gButton.ButtonStendhal;

    /**
     * Name of this element in factory
     */
    Button.NAME = sm.gButton.TemplateStendhal.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        Button.NAME, {
            control: Button,
            view: sm.gButton.ViewStendhal
        });


    /**
     * Event enum
     * @enum {string}
     */
    Button.Event = {
        CLICK: cl.gButton.Button.Event.CLICK
    };


    /**
     * Set text
     * @param {string} text
     * @public
     */
    Button.prototype.setText = function(text) {
        this.getView().setText(text);
    };

});  // goog.scope
