goog.provide('sm.lUniversity.bCommentList.View');

goog.require('cl.iControl.View');



/**
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lUniversity.bCommentList.View = function(
    opt_params, opt_type, opt_modifier
) {
    sm.lUniversity.bCommentList.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     *     showCommentsButton: Element,
     *     leaveCommentButton: Element
     * }
     */
    this.dom = {};
};
goog.inherits(sm.lUniversity.bCommentList.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.lUniversity.bCommentList.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-comment-list',
        SHOW_COMMENTS_BUTTON: 'b-comment-list__show-comments-button',
        LEAVE_COMMENT_BUTTON: 'b-comment-list__leave-comment-button'
    };


    /**
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom = {
            showCommentsButton: this.getElementByClass(
                View.CssClass.SHOW_COMMENTS_BUTTON
            ),
            leaveCommentButton: this.getElementByClass(
                View.CssClass.LEAVE_COMMENT_BUTTON
            )
        };
    };
});  // goog.scope
