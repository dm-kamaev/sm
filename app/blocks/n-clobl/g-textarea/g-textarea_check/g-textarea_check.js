goog.provide('sm.gTextarea.TextareaCheckView');

goog.require('cl.gTextarea.View');

/**
 * Textarea check View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gTextarea.View}
 */
sm.gTextarea.TextareaCheckView =
    function(opt_params, opt_template, opt_domHelper) {
    goog.base(this, opt_params, opt_template, opt_domHelper);
};
goog.inherits(sm.gTextarea.TextareaCheckView, cl.gTextarea.View);

goog.scope(function() {
    var View = sm.gTextarea.TextareaCheckView;
    /**
     * Css class enum
     * @enum
     * @type {string}
     */
    View.CssClass = {
        'NOT_VALID': 'g-textarea_not-valid'
    };

    /**
     * Add not valid modifier
     * @public
     */
    View.prototype.addNotValidModifier = function() {
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.NOT_VALID
        );
    };

    /**
     * Remove not valid modifier
     * @public
     */
    View.prototype.removeNotValidModifier = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.NOT_VALID
        );
    };
});
