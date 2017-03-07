goog.provide('sm.lUniversity.University');

goog.require('sm.bSmSubscribeBoard.SmSubscribeBoard');
goog.require('sm.gModal.ModalInteraction');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lUniversity.View');
goog.require('sm.lUniversity.bCommentList.CommentList');


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
        this.sketch_ = this.decorateChild(
            'smSketch',
            this.getView().getDom().sketch
        );
    };


    /**
     * @private
     */
    University.prototype.initSummaryBoard_ = function() {
        this.decorateChild(
            'summary-board',
            this.getView().getDom().summaryBoard
        );
    };


    /**
     * @private
     */
    University.prototype.initDescriptionList_ = function() {
        this.decorateChild(
            'lUniversity-descriptionList',
            this.getView().getDom().descriptionList
        );
    };


    /**
     * Initializes instance of cut description
     * @private
     */
    University.prototype.initCutDescription_ = function() {
        this.decorateChild(
            'smCollapsedText',
            this.getView().getDom().cutDescription
        );
    };


    /**
     * Initializes instance programs item list
     * @private
     */
    University.prototype.initPrograms_ = function() {
        this.decorateChild(
            'smItemList',
            this.getView().getDom().programs
        );
    };


    /**
     * Initializes instance courses item list
     * @private
     */
    University.prototype.initCourses_ = function() {
        this.decorateChild(
            'smItemList',
            this.getView().getDom().courses
        );
    };


    /**
     * Initializes instance of modals
     * @private
     */
    University.prototype.initModals_ = function() {
        this.modalComment_ = this.decorateChild(
            'modal-interaction',
            this.getView().getDom().modalComment
        );
    };


    /**
     * Initializes instance comment item list
     * @private
     */
    University.prototype.initComments_ = function() {
        this.commentList_ = this.decorateChild(
            'lUniversity-commentList',
            this.getView().getDom().comments
        );
    };


    /**
     * Initializes instance of navigation panel
     * @private
     */
    University.prototype.initNavigationPanel_ = function() {
        this.decorateChild(
            'smRowLinks',
            this.getView().getDom().navigationPanel
        );
    };


    /**
     * Init subscribe board
     * @private
     */
    University.prototype.initSubscribeBoard_ = function() {
        this.decorateChild(
            'smSubscribeBoard',
            this.getView().getDom().subscribeBoard
        );
    };
});  // goog.scope


/**
 * creates sm.lUniversity.University instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lUniversity.View.CssClass.ROOT
    );

    var view = new sm.lUniversity.View();
    var instance = new sm.lUniversity.University(view);

    instance.decorate(domElement);
});
