goog.provide('sm.lUniversity.University');

goog.require('sm.bEntityRelation.EntityRelation');
goog.require('sm.bSmBanner.SmBanner');
goog.require('sm.bSmButtonLink.SmButtonLink');
goog.require('sm.bSmCollapsedText.SmCollapsedText');
goog.require('sm.bSmInteractionForm.SmInteractionForm');
goog.require('sm.bSmInteractionForm.SmInteractionFormComment');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.bSmRowLinks.SmRowLinks');
goog.require('sm.bSmSketch.SmSketch');
goog.require('sm.bSmSubscribeBoard.SmSubscribeBoard');
goog.require('sm.bSummaryBoard.SummaryBoard');
goog.require('sm.gModal.ModalInteraction');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lUniversity.Template');
goog.require('sm.lUniversity.View');
goog.require('sm.lUniversity.bCommentList.CommentList');
goog.require('sm.lUniversity.bCommentList.CommentList');
goog.require('sm.lUniversity.bDescriptionList.DescriptionList');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lUniversity.University = function(view, opt_domHelper) {
        sm.lUniversity.University.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Instance sketch
         * @type {sm.bSmSketch.SmSketch}
         * @private
         */
        this.sketch_ = null;


        /**
         * Instance comment List
         * @type {sm.lUniversity.bCommentList.CommentList}
         * @private
         */
        this.commentList_ = null;


        /**
         * Instance modal comment
         * @type {sm.gModal.ModalInteraction}
         * @private
         */
        this.modalComment_ = null;
    };
    goog.inherits(sm.lUniversity.University, sm.iLayout.LayoutStendhal);
    var University = sm.lUniversity.University,
        View = sm.lUniversity.View;

    var Authorization = sm.iAuthorization.Authorization;


    /**
     * Name of this element in factory
     */
    University.NAME = sm.lUniversity.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(University.NAME, {
        control: University,
        view: View
    });


    /**
     * @param {Element} element
     * @override
     */
    University.prototype.decorateInternal = function(element) {
        University.base(this, 'decorateInternal', element);

        this.initAuthorization_();
        this.initSketch_();
        this.initDescriptionList_();
        this.initSummaryBoard_();
        this.initCutDescription_();
        this.initPrograms_();
        this.initCourses_();
        this.initModals_();
        this.initComments_();
        this.initNavigationPanel_();
        this.initSubscribeBoard_();
    };


    /**
     * @override
     */
    University.prototype.enterDocument = function() {
        University.base(this, 'enterDocument');

        this.initSketchListeners_();
        this.initCommentsListeners_();
    };


    /**
     * Initializes listeners for sketch
     * @private
     */
    University.prototype.initSketchListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.sketch_,
            sm.bSmSketch.SmSketch.Event.BUTTON_CLICK,
            this.onLeaveCommentClick_
        );
    };


    /**
     * Initializes listeners for comments
     * @private
     */
    University.prototype.initCommentsListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.commentList_,
            sm.lUniversity.bCommentList.CommentList.Event.LEAVE_COMMENT_CLICK,
            this.onLeaveCommentClick_
        );
    };


    /**
     * Button sketch handler
     * @private
     */
    University.prototype.onLeaveCommentClick_ = function() {
        var authorization = Authorization.getInstance();

        authorization.isUserAuthorized() ?
            this.modalComment_.show() :
            authorization.authorize();
    };


    /**
     * Init authorization
     * @private
     */
    University.prototype.initAuthorization_ = function() {
        var authParams = {
            isUserAuthorized: this.params.isUserAuthorized,
            authSocialLinks: this.params.authSocialLinks,
            factoryType: this.getView().getStylization()
        };

        Authorization.getInstance().init(authParams);
    };


    /**
     * @private
     */
    University.prototype.initSketch_ = function() {
        var dom = this.getView().getDom();

        this.sketch_ = this.decorateChild(
            sm.bSmSketch.SmSketch.NAME,
            dom.sketch
        );

        this.decorateChild(
            sm.bEntityRelation.EntityRelation.NAME,
            dom.entityRelation
        );
    };


    /**
     * @private
     */
    University.prototype.initSummaryBoard_ = function() {
        this.decorateChild(
            sm.bSummaryBoard.SummaryBoard.NAME,
            this.getView().getDom().summaryBoard
        );
    };


    /**
     * @private
     */
    University.prototype.initDescriptionList_ = function() {
        this.decorateChild(
            sm.lUniversity.bDescriptionList.DescriptionList.NAME,
            this.getView().getDom().descriptionList
        );
    };


    /**
     * Initializes instance of cut description
     * @private
     */
    University.prototype.initCutDescription_ = function() {
        this.decorateChild(
            sm.bSmCollapsedText.SmCollapsedText.NAME,
            this.getView().getDom().cutDescription
        );
    };


    /**
     * Initializes instance programs item list
     * @private
     */
    University.prototype.initPrograms_ = function() {
        this.decorateChild(
            sm.bSmItemList.SmItemList.NAME,
            this.getView().getDom().programs
        );
    };


    /**
     * Initializes instance courses item list
     * @private
     */
    University.prototype.initCourses_ = function() {
        this.decorateChild(
            sm.bSmItemList.SmItemList.NAME,
            this.getView().getDom().courses
        );
    };


    /**
     * Initializes instance of modals
     * @private
     */
    University.prototype.initModals_ = function() {
        this.modalComment_ = this.decorateChild(
            sm.gModal.ModalInteraction.NAME,
            this.getView().getDom().modalComment
        );
    };


    /**
     * Initializes instance comment item list
     * @private
     */
    University.prototype.initComments_ = function() {
        this.commentList_ = this.decorateChild(
            sm.lUniversity.bCommentList.CommentList.NAME,
            this.getView().getDom().comments
        );
    };


    /**
     * Initializes instance of navigation panel
     * @private
     */
    University.prototype.initNavigationPanel_ = function() {
        this.decorateChild(
            sm.bSmRowLinks.SmRowLinks.NAME,
            this.getView().getDom().navigationPanel
        );
    };


    /**
     * Init subscribe board
     * @private
     */
    University.prototype.initSubscribeBoard_ = function() {
        this.decorateChild(
            sm.bSmSubscribeBoard.SmSubscribeBoard.NAME,
            this.getView().getDom().subscribeBoard
        );
    };
});  // goog.scope


/**
 * creates sm.lUniversity.University instance
 */
jQuery(function() {
    sm.iLayout.LayoutStendhal.autoInstance(
        sm.lUniversity.University.NAME,
        sm.lUniversity.View.CssClass.ROOT
    );
});
