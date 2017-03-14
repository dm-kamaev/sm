goog.provide('sm.bSmComment.SmComment');

goog.require('cl.iControl.Control');
goog.require('sm.bSmComment.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmComment.SmComment = function(view, opt_domHelper) {
    sm.bSmComment.SmComment.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.bSmComment.SmComment, cl.iControl.Control);


goog.scope(function() {
    var Comment = sm.bSmComment.SmComment,
        View = sm.bSmComment.View;

    /**
     * Event enum
     * @enum {string}
     * @const
     */
    Comment.Event = {
        CLICK: View.Event.CLICK
    };


    /**
     * Name of this element in factory
     * @const {string}
     */
    Comment.NAME = sm.bSmComment.SmComment.Template.NAME();


    /**
     * @protected
     * @override
     */
    Comment.prototype.decorateInternal = function(element) {
        Comment.base(this, 'decorateInternal', element);
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.smItem.RenderParams}
     */
    Comment.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };
});  // goog.scope
