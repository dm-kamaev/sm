goog.provide('sm.lSmSearch.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Search View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSmSearch.View = function(opt_params, opt_type, opt_modifier) {
    sm.lSmSearch.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSmSearch.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.lSmSearch.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-sm-search'
    };
});  // goog.scope
