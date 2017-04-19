goog.provide('sm.bSmButtonLink.View');

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
sm.bSmButtonLink.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmButtonLink.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSmButtonLink.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmButtonLink.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-button-link'
    };
});  // goog.scope
