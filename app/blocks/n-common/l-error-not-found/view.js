goog.provide('sm.lErrorNotFound.View');

goog.require('sm.iLayout.ViewStendhal');



/**
 * Error not found View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.iLayout.ViewStendhal}
 */
sm.lErrorNotFound.View = function(opt_params, opt_type, opt_modifier) {
    sm.lErrorNotFound.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lErrorNotFound.View, sm.iLayout.ViewStendhal);


goog.scope(function() {
    var View = sm.lErrorNotFound.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-error-not-found',
        POPULAR: 'l-error-not-found__popular-list',
        CATALOG: 'l-error-not-found__catalog-item'
    };


    /**
     * Init dom elements
     * @protected
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(
            this.dom,
            {
                popular: this.getElementByClass(
                    View.CssClass.POPULAR
                ),
                catalog: this.getElementByClass(
                    View.CssClass.CATALOG
                )
            }
        );
    };
});  // goog.scope
