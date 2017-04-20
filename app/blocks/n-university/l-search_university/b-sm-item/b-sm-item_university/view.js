goog.provide('sm.bSmItem.ViewUniversity');

goog.require('sm.bSmItem.View');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItem.ViewUniversity = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.ViewUniversity.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmItem.ViewUniversity, sm.bSmItem.View);


goog.scope(function() {
    var View = sm.bSmItem.ViewUniversity;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-item_university',
        STARS: 'b-sm-item__stars'
    };


    /**
     * Initializes dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');
        this.dom.stars = this.getElementByClass(View.CssClass.STARS);
    };
});  // goog.scope
