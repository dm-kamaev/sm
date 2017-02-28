goog.provide('sm.gTextarea.TextareaStendhal');

goog.require('cl.gTextarea.Textarea');



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
