goog.provide('sm.gTextarea.ViewStendhal');

goog.require('cl.gTextarea.View');
goog.require('cl.iUtils.Utils');



/**
 * Textarea check View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.gTextarea.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.gTextarea.ViewStendhal, cl.gTextarea.View);


goog.scope(function() {
    var View = sm.gTextarea.ViewStendhal,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-textarea_standhal',
        TEXTAREA: 'g-textarea__textarea',
        NOT_VALID: 'g-textarea_not-valid',
        COUNTER_CUSTOM_TEXT_SYMBOLS: 'g-textarea__counter-custom-text-symbols',
        COUNTER_CUSTOM_TEXT_LEFT: 'g-textarea__counter-custom-text-left'
    };


    /**
     * CustomText enum
     * @enum {string}
     */
    View.CustomText = {
        MAX_LENGTH: 'Максимальная длина комментария —',
        SYMBOLS: 'символов'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.counterCustomTextSymbols = this.getElementByClass(
            View.CssClass.COUNTER_CUSTOM_TEXT_SYMBOLS
        );

        this.dom.counterCustomTextLeft = this.getElementByClass(
            View.CssClass.COUNTER_CUSTOM_TEXT_LEFT
        );

        this.dom.field = this.getElementByClass(
            View.CssClass.TEXTAREA
        );
    };


    /**
     * Get name
     * @return {string}
     * @public
     */
    View.prototype.getValue = function() {
        return this.dom.field.value || null;
    };


    /**
     * Get name
     * @return {string}
     * @public
     */
    View.prototype.getName = function() {
        return this.dom.field.name || null;
    };


    /**
     * @override
     * @param {number} count
     */
    View.prototype.updateCounter = function(count) {
        goog.base(this, 'updateCounter', count);

        if (count > 0) {
            this.dom.counterCustomTextSymbols.innerHTML =
                Utils.declensionPrint({
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
        } else {
            this.dom.counterCustomTextLeft.innerHTML =
                View.CustomText.MAX_LENGTH;

            this.dom.counterCustomTextSymbols.innerHTML =
                View.CustomText.SYMBOLS;

            this.dom.count.innerHTML = this.params.maxLength;
        }
    };


    /**
     * Add not valid modifier
     * @public
     */
    View.prototype.setNotValidState = function() {
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.NOT_VALID
        );
    };


    /**
     * Remove not valid modifier
     * @public
     */
    View.prototype.unsetNotValidState = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.NOT_VALID
        );
    };
});  // goog.scope
