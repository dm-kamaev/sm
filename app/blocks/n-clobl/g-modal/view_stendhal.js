goog.provide('sm.gModal.ViewStendhal');

goog.require('cl.gModal.View');


/**
 * Modal View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gModal.View}
 */
sm.gModal.ViewStendhal = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.gModal.ViewStendhal, cl.gModal.View);


goog.scope(function() {
    var View = sm.gModal.ViewStendhal;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        CLOSER: 'g-modal__close-button'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.closer = this.getElementByClass(View.CssClass.CLOSER);
    };
});
