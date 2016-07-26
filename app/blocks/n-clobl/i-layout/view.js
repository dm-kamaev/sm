goog.provide('sm.iLayout.ViewStendhal');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Layout View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.iLayout.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
    sm.iLayout.ViewStendhal.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.iLayout.ViewStendhal, cl.iControl.View);


goog.scope(function() {
    var View = sm.iLayout.ViewStendhal;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'i-layout'
    };
});  // goog.scope
