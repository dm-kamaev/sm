goog.provide('sm.lSmInformation.View');

goog.require('sm.iLayout.ViewStendhal');



/**
 * Information View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.iLayout.ViewStendhal}
 */
sm.lSmInformation.View = function(opt_params, opt_type, opt_modifier) {
    sm.lSmInformation.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSmInformation.View, sm.iLayout.ViewStendhal);


goog.scope(function() {
    var View = sm.lSmInformation.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-sm-information'
    };
});  // goog.scope
