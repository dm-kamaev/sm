goog.provide('sm.bSmBanner.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');



/**
 * SummaryBoard View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmBanner.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmBanner.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSmBanner.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmBanner.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-banner'
    };
});  // goog.scope
