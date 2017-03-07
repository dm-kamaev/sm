goog.provide('sm.lUniversity.bCommentList.CommentList');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');
goog.require('sm.lUniversity.bCommentList.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lUniversity.bCommentList.CommentList = function(view, opt_domHelper) {
    sm.lUniversity.bCommentList.CommentList.base(
        this, 'constructor', view, opt_domHelper
    );

    /**
     * Show comments button instance
     * @type {cl.gButton.Button}
     * @private
     */
    this.showCommentsButton_ = null;

    /**
     * Leave comment button instance
     * @type {cl.gButton.Button}
     * @private
     */
    this.leaveCommentButton_ = null;

    /**
     * List of comments instance
     * @type {sm.bSmItemList.SmItemList}
     * @private
     */
    this.list_ = null;
};
goog.inherits(
    sm.lUniversity.bCommentList.CommentList, cl.iControl.Control
);


goog.scope(function() {
    var CommentList = sm.lUniversity.bCommentList.CommentList,
        View = sm.lUniversity.bCommentList.View;


    /**
     * Event enum
     * @enum {string}
     */
    CommentList.Event = {
        LEAVE_COMMENT_CLICK: goog.events.getUniqueId('leave-comment-click')
    };


    /**
     * @protected
     * @override
     */
    CommentList.prototype.decorateInternal = function(element) {
        CommentList.base(this, 'decorateInternal', element);

        this.initControlPanel_();
        this.initItemList_();
    };


    /**
     * @override
     * @protected
     */
    CommentList.prototype.enterDocument = function() {
        CommentList.base(this, 'enterDocument');

        this.viewListen(
            View.Event.SHOW_BUTTON_CLICK,
            this.onShowCommentButtonClick_
        );

        this.initControlPanelListeners_();
    };


    /**
     * Initializes buttons
     * @private
     */
    CommentList.prototype.initControlPanelListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.leaveCommentButton_,
            cl.gButton.Button.Event.CLICK,
            this.onLeaveCommentButtonClick_
        );
    };


    /**
     * Click button to leave comment handler
     * @private
     */
    CommentList.prototype.onLeaveCommentButtonClick_ = function() {
        this.dispatchEvent(CommentList.Event.LEAVE_COMMENT_CLICK);
    };


    /**
     * Click show button handler
     * @private
     */
    CommentList.prototype.onShowCommentButtonClick_ = function() {
        this.list_.showItems(
            this.params.countShownItems,
            this.list_.getCountItems()
        );
    };


    /**
     * Init control panel
     * @private
     */
    CommentList.prototype.initControlPanel_ = function() {
        this.showCommentsButton_ = this.decorateChild(
            'button',
            this.getView().getDom().showCommentsButton
        );

        this.leaveCommentButton_ = this.decorateChild(
            'button',
            this.getView().getDom().leaveCommentButton
        );
    };


    /**
     * Init item list
     * @private
     */
    CommentList.prototype.initItemList_ = function() {
        var list = this.getView().getDom().itemList;
        if (list) {
            this.list_ = this.decorateChild(
                'smItemList',
                this.getView().getDom().itemList
            );
        }
    };
});  // goog.scope
