goog.provide('sm.lUniversity.bCommentList.CommentList');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');
goog.require('sm.bSmItemList.SmItemList');
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

        this.initButtonsListeners_();
    };


    /**
     * Init control panel
     * @private
     */
    CommentList.prototype.initControlPanel_ = function() {
        var dom = this.getView().getDom();

        if (dom.showCommentsButton) {
            this.showCommentsButton_ = this.decorateChild(
                'button',
                this.getView().getDom().showCommentsButton
            );
        }

        if (dom.leaveCommentButton) {
            this.leaveCommentButton_ = this.decorateChild(
                'button',
                this.getView().getDom().leaveCommentButton
            );
        }
    };


    /**
     * Init control panel
     * @private
     */
    CommentList.prototype.initButtonsListeners_ = function() {
        if (this.showCommentsButton_) {
            this.getHandler().listen(
                this.showCommentsButton_,
                cl.gButton.Button.Event.CLICK,
                this.onShowCommentButtonClick_
            );
        }
    };


    /**
     * Init item list
     * @private
     */
    CommentList.prototype.initItemList_ = function() {
        var dom = this.getView().getDom();

        if (dom.itemList) {
            this.list_ = this.decorateChild(
                'smItemList',
                this.getView().getDom().itemList
            );
        }
    };


    /**
     * Click show button handler
     * @private
     */
    CommentList.prototype.onShowCommentButtonClick_ = function() {
        this.getView().hideShowCommentsButton();

        this.list_.showItems(
            this.params.countShownItems,
            this.list_.getCountItems()
        );
    };
});  // goog.scope
