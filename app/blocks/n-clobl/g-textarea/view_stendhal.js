goog.provide('sm.gTextarea.ViewStendhal');

goog.require('cl.gTextarea.View');
goog.require('cl.iUtils.Utils');

/**
 * Textarea check View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gTextarea.View}
 */
sm.gTextarea.ViewStendhal =
    function(opt_params, opt_template, opt_domHelper) {
    goog.base(this, opt_params, opt_template, opt_domHelper);
};
goog.inherits(sm.gTextarea.ViewStendhal, cl.gTextarea.View);

goog.scope(function() {
    var View = sm.gTextarea.ViewStendhal,
        Utils = cl.iUtils.Utils;

    /**
     * Css class enum
     * @enum
     * @type {string}
     */
    View.CssClass = {
        NOT_VALID: 'g-textarea_not-valid',
        COUNTER_CUSTOM_TEXT_SYMBOLS: 'g-textarea__counter-custom-text-symbols',
        COUNTER_CUSTOM_TEXT_LEFT: 'g-textarea__counter-custom-text-left'
    };

    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.counterCustomTextSymbols = this.getElementByClass(
            View.CssClass.COUNTER_CUSTOM_TEXT_SYMBOLS
        );

        this.dom.counterCustomTextLeft = this.getElementByClass(
            View.CssClass.COUNTER_CUSTOM_TEXT_LEFT
        );
    };

    View.prototype.updateCounter = function (count) {
        goog.base(this, 'updateCounter', count);

        this.dom.counterCustomTextSymbols.innerHTML = Utils.declensionPrint({
            params: {
                num: count,
                nom: 'символ',
                gen: 'символа',
                plu: 'символов'
            }
        });

        this.dom.counterCustomTextLeft.innerHTML = Utils.declensionPrint({
            params: {
                num: count,
                nom: 'Остался',
                gen: 'Осталось',
                plu: 'Осталось'
            }
        });
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
