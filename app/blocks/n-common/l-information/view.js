goog.provide('sm.lInformation.View');

goog.require('sm.iLayout.ViewStendhal');



/**
 * Information View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.iLayout.ViewStendhal}
 */
sm.lInformation.View = function(opt_params, opt_type, opt_modifier) {
    sm.lInformation.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lInformation.View, sm.iLayout.ViewStendhal);


goog.scope(function() {
    var View = sm.lInformation.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-information'
    };
});  // goog.scope
