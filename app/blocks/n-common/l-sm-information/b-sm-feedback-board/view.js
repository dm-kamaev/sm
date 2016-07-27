goog.provide('sm.bSmFeedbackBoard.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Feedback Board View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmFeedbackBoard.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmFeedbackBoard.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);
};
goog.inherits(sm.bSmFeedbackBoard.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSmFeedbackBoard.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-sm-feedback-board'
    };
});  // goog.scope
