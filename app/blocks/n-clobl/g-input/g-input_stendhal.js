goog.provide('sm.gInput.InputStendhal');

goog.require('cl.gInput.Input');
goog.require('sm.gInput.TemplateStendhal');
goog.require('sm.gInput.ViewStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Stendhal Input control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gInput.Input}
 */
sm.gInput.InputStendhal = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.gInput.InputStendhal, cl.gInput.Input);


goog.scope(function() {
    var Input = sm.gInput.InputStendhal,
        View = sm.gInput.ViewStendhal;


    /**
     * Name of this element in factory
     */
    Input.NAME = sm.gInput.TemplateStendhal.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Input.NAME, {
        control: Input,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    Input.Event = {
        NOT_VALID: cl.gInput.Input.Event.NOT_VALID,
        BLUR: cl.gInput.Input.Event.BLUR,
        INPUT: cl.gInput.Input.Event.INPUT,
        CHANGE: cl.gInput.Input.Event.CHANGE,
        FOCUS: cl.gInput.Input.Event.FOCUS,
        ENTER_PRESS: View.Event.ENTER_PRESS
    };


    /**
     * @override
     */
    Input.prototype.enterDocument = function() {
        Input.base(this, 'enterDocument');

        this.autoDispatch(View.Event.ENTER_PRESS);
    };


    /**
     * Get input name
     * @return {?string
     * }
     * @public
     */
    Input.prototype.getName = function() {
        return this.getView().getName();
    };


    /**
     * Set not valid state
     */
    Input.prototype.setNotValidState = function() {
        this.getView().setNotValidState();
    };


    /**
     * Set valid state
     */
    Input.prototype.setValidState = function() {
        this.getView().setValidState();
    };
});  // goog.scope
