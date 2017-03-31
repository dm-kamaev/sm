goog.provide('sm.lUniversity.bCommentList.CommentList');

goog.require('cl.iControl.Control');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lUniversity.bCommentList.Template');
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
     * Show comments buttons instance
     * @type {Array<sm.gButton.ButtonStendhal>}
     * @private
     */
    this.showCommentsButtons_ = [];

    /**
     * Leave comment button instance
     * @type {Array<sm.gButton.ButtonStendhal>}
     * @private
     */
    this.leaveCommentButtons_ = [];

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
     * Name of this element in factory
     */
    CommentList.NAME = sm.lUniversity.bCommentList.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(CommentList.NAME, {
        control: CommentList,
        view: View
    });


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

        if (dom.leaveCommentButton) {
            this.leaveCommentButton_ = this.decorateChildren(
                sm.gButton.ButtonStendhal.NAME,
                dom.leaveCommentButton
            );
        }

        if (dom.showCommentsButton) {
            this.showCommentsButtons_ = this.decorateChildren(
                sm.gButton.ButtonStendhal.NAME,
                dom.showCommentsButton
            );
        }
    };


    /**
     * Init control panel
     * @private
     */
    CommentList.prototype.initButtonsListeners_ = function() {
        if (this.leaveCommentButton_.length > 0) {
            this.getHandler().listen(
                this.leaveCommentButton_[0],
                cl.gButton.Button.Event.CLICK,
                this.onLeaveCommentButtonClick_
            );

            this.getHandler().listen(
                this.leaveCommentButton_[1],
                cl.gButton.Button.Event.CLICK,
                this.onLeaveCommentButtonClick_
            );
        }

        if (this.showCommentsButtons_.length > 0) {
            this.getHandler().listen(
                this.showCommentsButtons_[0],
                cl.gButton.Button.Event.CLICK,
                this.onShowCommentButtonClick_
            );

            this.getHandler().listen(
                this.showCommentsButtons_[1],
                cl.gButton.Button.Event.CLICK,
                this.onShowCommentButtonClick_
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


    /**
     * Click leave comment button handler
     * @private
     */
    CommentList.prototype.onLeaveCommentButtonClick_ = function() {
        this.dispatchEvent(CommentList.Event.LEAVE_COMMENT_CLICK);
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
});  // goog.scope
