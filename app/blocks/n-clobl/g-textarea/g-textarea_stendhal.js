goog.provide('sm.gTextarea.TextareaStendhal');

goog.require('cl.gTextarea.Textarea');
goog.require('sm.gTextarea.TemplateStendhal');
goog.require('sm.gTextarea.ViewStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Stendhal textarea control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gTextarea.Textarea}
 */
sm.gTextarea.TextareaStendhal = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.gTextarea.TextareaStendhal, cl.gTextarea.Textarea);


goog.scope(function() {
    var TextareaStendhal = sm.gTextarea.TextareaStendhal;

    /**
     * Name of this element in factory
     */
    TextareaStendhal.NAME = sm.gTextarea.TemplateStendhal.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        TextareaStendhal.NAME, {
            control: TextareaStendhal,
            view: sm.gTextarea.ViewStendhal
        }
    );


    /**
     * Events
     * @enum {string}
     */
    TextareaStendhal.Event = {
        SIZE_CHANGED: cl.gTextarea.Textarea.Event.SIZE_CHANGED,
        INPUT: cl.gTextarea.Textarea.Event.INPUT,
        SUBMIT: cl.gTextarea.Textarea.Event.SUBMIT,
        FOCUS: sm.gTextarea.ViewStendhal.Event.FOCUS
    };


    /**
     * Check is any value entered in texarea
     * @return {boolean}
     */
    TextareaStendhal.prototype.validate = function() {
        var isValid = !!this.getValue().trim(),
            view = this.getView();

        if (isValid) {
            view.unsetNotValidState();
        } else {
            view.setNotValidState();
        }

        return isValid;
    };


    /**
     * @override
     */
    TextareaStendhal.prototype.enterDocument = function() {
        TextareaStendhal.base(this, 'enterDocument');

        this.autoDispatch(TextareaStendhal.Event.FOCUS);
    };


    /**
     * Get value
     * @return {string}
     * @public
     */
    TextareaStendhal.prototype.getValue = function() {
        return this.getView().getValue();
    };


    /**
     * Get name
     * @return {string}
     * @public
     */
    TextareaStendhal.prototype.getName = function() {
        return this.getView().getName();
    };
});  // goog.scope
