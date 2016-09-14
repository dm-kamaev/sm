goog.provide('sm.lInformation.bFeedbackBoard.View');

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
sm.lInformation.bFeedbackBoard.View = function(opt_params,
    opt_type, opt_modifier) {

    sm.lInformation.bFeedbackBoard.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lInformation.bFeedbackBoard.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lInformation.bFeedbackBoard.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-feedback-board'
    };
});  // goog.scope
