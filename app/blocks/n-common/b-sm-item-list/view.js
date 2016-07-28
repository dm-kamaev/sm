goog.provide('sm.bSmItemList.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * Items List View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItemList.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItemList.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmItemList.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmItemList.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-item-list',
    };
});  // goog.scope
