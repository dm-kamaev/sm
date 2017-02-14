goog.provide('sm.bSmSubscribeBoard.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');



/**
 * Subscribe Board View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmSubscribeBoard.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmSubscribeBoard.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSmSubscribeBoard.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmSubscribeBoard.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-subscribe-board'
    };
});  // goog.scope
