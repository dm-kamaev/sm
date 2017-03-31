goog.provide('sm.lCourse.Course');

goog.require('cl.iRequest.Request');
goog.require('sm.bSmCollapsedText.SmCollapsedText');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.bSmMap.SmMap');
goog.require('sm.bSmScore.SmScoreBrief');
goog.require('sm.gModal.ModalEnrollment');
goog.require('sm.gModal.ModalSuccess');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lCourse.Template');
goog.require('sm.lCourse.View');
goog.require('sm.lCourse.bUserInteraction.UserInteraction');
goog.require('sm.lCourse.iAnalyticsSender.AnalyticsSender');

goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lCourse.Course = function(view, opt_domHelper) {
        sm.lCourse.Course.base(this, 'constructor', view, opt_domHelper);


        /**
         * Subheader instance
         * @type {sm.bSmSubheader.SmSubheader}
         * @protected
         */
        this.subheader = null;


        /**
         * Side menu instance
         * @type {sm.gModal.ModalSideMenu}
         * @protected
         */
        this.sideMenu = null;


        /**
         * Instances score
         * @type {Array<sm.bSmScore.SmScoreBrief>}
         * @private
         */
        this.scoreItems_ = [];


        /**
         * Instance collansed text
         * @type {sm.bSmCollapsedText.SmCollapsedText}
         * @private
         */
        this.fullDescription_ = null;


        /**
         * Instance map
         * @type {sm.bSmMap.SmMap}
         * @private
         */
        this.map_ = null;


        /**
         * Instances user Interaction
         * @type {Array<sm.lCourse.bUserInteraction.UserInteraction>}
         * @private
         */
        this.userInteractions_ = [];


        /**
         * Instance list with departments
         * @type {sm.bSmItemList.SmItemList}
         * @private
         */
        this.departmentList_ = null;


        /**
         * Instances modal
         * @type {sm.gModal.ModalEnrollment}
         * @private
         */
        this.modalEnrollment_ = null;


        /**
         * Instances modal
         * @type {sm.gModal.ModalSuccess}
         * @private
         */
        this.modalSuccess_ = null;


        /**
         * Instances analytics sender
         * @type {sm.lCourse.iAnalyticsSender.AnalyticsSender}
         * @private
         */
        this.analyticsSender_ = null;

        /**
         * indicator. it's true, if data has been sent before
         * @type {boolean}
         * @private
         */
        this.enrollmentSend_ = false;

    };
    goog.inherits(sm.lCourse.Course, sm.iLayout.LayoutStendhal);
    var Course = sm.lCourse.Course,
        View = sm.lCourse.View,
        AnalyticsSender = sm.lCourse.iAnalyticsSender.AnalyticsSender,
        Map = sm.bSmMap.SmMap;

    /**
     * Name of this element in factory
     */
    Course.NAME = sm.lCourse.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Course.NAME, {
        control: Course,
        view: View
    });

    /**
     * @param {Element} element
     * @override
     */
    Course.prototype.decorateInternal = function(element) {
        Course.base(this, 'decorateInternal', element);

        this.initScore_();
        this.initFullDescription_();
        this.initMap_();
        this.initUserInteractions_();
        this.initDepartmentList_();
        this.initModals_();
        this.initIRequest_();
        this.initAnalyticsSender_();
    };


    /**
     * @override
     */
    Course.prototype.enterDocument = function() {
        Course.base(this, 'enterDocument');

        this.initViewListeners_();
        this.initUserInteractionsListeners_();
        this.initDepartmentListListeners_();
        this.initModalsListeners_();
        this.initMapListeners_();
        this.initSideMenuListeners_();

        this.analyticsSender_.sendPageview();
    };


    /**
     * Initializes listeners for view
     * @private
     */
    Course.prototype.initViewListeners_ = function() {
        this.viewListen(
            goog.events.EventType.BEFOREUNLOAD,
            this.onBeforeunload_
        );
    };


    /**
     * Before close page
     * @private
     */
    Course.prototype.onBeforeunload_ = function() {
        if ((!this.enrollmentSend_) &&
                this.modalEnrollment_.isPhoneOrEmailValid()) {
            var data = this.modalEnrollment_.buildRequestData();
            cl.iRequest.Request.getInstance().send(data);
        }
    };


    /**
     * Initializes listeners for User Interactions
     * @private
     */
    Course.prototype.initUserInteractionsListeners_ = function() {
        for (var i = 0; i < this.userInteractions_.length; i++) {
            this.getHandler().listen(
                this.userInteractions_[i],
                sm.lCourse.bUserInteraction.UserInteraction.Event.CLICK,
                this.onActionButtonClick_
            );
        }
    };


    /**
     * Initializes listeners for department list
     * @private
     */
    Course.prototype.initDepartmentListListeners_ = function() {
        this.getHandler().listen(
            this.departmentList_,
            sm.lCourse.bDepartment.Department.Event.ENROLL_BUTTON_CLICK,
            this.onActionButtonClick_
        );
    };


    /**
     * Initializes listeners for department list
     * @private
     */
    Course.prototype.initModalsListeners_ = function() {
        this.getHandler().listen(
            this.modalEnrollment_,
            sm.gModal.ModalEnrollment.Event.SEND_REQUEST,
            this.onEnrollmentSend_
        );

        this.getHandler().listen(
            this.modalEnrollment_,
            sm.gModal.ModalEnrollment.Event.SUCCESS,
            this.onSendEnrollmentSuccess_
        );

        this.getHandler().listen(
            this.modalEnrollment_,
            sm.gModal.ModalEnrollment.Event.SHOW,
            this.onModalEnrollmentShow_
        );
    };


    /**
     * Initializes listeners for map
     * @private
     */
    Course.prototype.initMapListeners_ = function() {
        if (this.map_) {
            this.getHandler().listen(
                this.map_,
                Map.Event.BALLOON_OPEN,
                this.onBalloonOpen_
            );
        }
    };


    /**
     * Initializes listeners for side menu
     * @private
     */
    Course.prototype.initSideMenuListeners_ = function() {
        this.getHandler().listen(
            this.sideMenu,
            sm.gModal.ModalSideMenu.Event.SHOW,
            this.onSideMenuShow_
        );

        this.getHandler().listen(
            this.sideMenu,
            sm.gModal.ModalSideMenu.Event.HIDE,
            this.onSideMenuHide_
        );
    };


    /**
     * On side menu show
     * @private
     */
    Course.prototype.onSideMenuShow_ = function() {
        this.getView().hideSectionFixed();
    };


    /**
     * On side menu hide
     * @private
     */
    Course.prototype.onSideMenuHide_ = function() {
        this.getView().showSectionFixed();
    };


    /**
     * Action pin handler
     * @param {sm.bSmBalloon.Event.Open} event
     * @private
     */
    Course.prototype.onBalloonOpen_ = function(event) {
        this.sendMapAnalytics_(event.data);
    };


    /**
     * Action button handler
     * @param {goog.events.Event} event
     * @private
     */
    Course.prototype.onActionButtonClick_ = function(event) {
        this.modalEnrollment_.setOptionsData(event.data);
        this.modalEnrollment_.show();
    };


    /**
     * Send enrollment success handler
     * @param {sm.gModal.Event.EnrollmentSuccess} event
     * @private
     */
    Course.prototype.onSendEnrollmentSuccess_ = function(event) {
        this.enrollmentSend_ = true;
        this.modalSuccess_.show();
        this.sendAnalyticsSuccessEnrollment_(event.data);
    };


    /**
     * Send enrollment handler
     * @private
     */
    Course.prototype.onEnrollmentSend_ = function() {
        this.sendAnalyticsSendEnrollment_();
    };


    /**
     * Send enrollment success handler
     * @param {sm.gModal.Event.EnrollmentSuccess} event
     * @private
     */
    Course.prototype.onModalEnrollmentShow_ = function(event) {
        this.sendAnalyticsCheckoutEnrollment_(event.data);
    };


    /**
     * Send analytics about shown modal enrollment
     * @param {sm.gModal.Event.Show.Data} data
     * @private
     */
    Course.prototype.sendAnalyticsCheckoutEnrollment_ = function(data) {
        var actionData = {
            category: 'checkout',
            action: 'form request'
        };

        this.analyticsSender_.sendCheckout(
            this.getEcAnalyticsEnrollmentData_(data),
            actionData
        );
    };


    /**
     * Send analytics about success sending Enrollment
     * @param {sm.gModal.Event.EnrollmentSuccess.Data} data
     * @private
     */
    Course.prototype.sendAnalyticsSuccessEnrollment_ = function(data) {
        var actionData = {
            category: 'checkout',
            action: 'form success'
        };

        this.analyticsSender_.sendPurchase(
            this.getEcAnalyticsEnrollmentData_(data),
            actionData
        );
    };


    /**
     * Send analytics about send Enrollment
     * @private
     */
    Course.prototype.sendAnalyticsSendEnrollment_ = function() {
        this.analyticsSender_.send({
            category: 'checkout',
            action: 'form submit'
        });
    };


    /**
     * Get enrollment data for ecommerce
     * @param {({
     *     enrollmentId: (string|undefined),
     *     optionCost: (string|undefined)
     * }|undefined)} data
     * @return {Object}
     * @private
     */
    Course.prototype.getEcAnalyticsEnrollmentData_ = function(data) {
        return {
            id: data ? data.enrollmentId : '',
            revenue: (data && data.optionCost) ?
                data.optionCost :
                this.params.cost
        };
    };


    /**
     * Initializes instance of Analytics Sender
     * @private
     */
    Course.prototype.initAnalyticsSender_ = function() {
        this.analyticsSender_ = AnalyticsSender.getInstance('course details');

        this.analyticsSender_.setProductParams({
            id: this.params.id,
            name: this.params.name,
            category: this.params.category,
            price: this.params.cost
        });
    };


    /**
     * Send map analytics
     * @param {sm.bSmBalloon.View.RenderParams} params
     * @private
     */
    Course.prototype.sendMapAnalytics_ = function(params) {
        var data = {
            id: params.id,
            name: params.header.title,
            list: 'map balloon',
            category: params.category,
            position: 1
        };

        this.analyticsSender_.setProductParams(data);

        this.analyticsSender_.sendMapAnalytics({
            category: 'details map',
            action: 'pin details',
            name: params.footer.title
        });
    };


    /**
     * Initializes instance of Request Sender
     * @private
     */
    Course.prototype.initIRequest_ = function() {
        cl.iRequest.Request.getInstance().init();
    };


    /**
     * Initializes instances of score
     * @private
     */
    Course.prototype.initScore_ = function() {
        var domElements = this.getView().getDom().scoreItems,
            instance;

        for (var i = 0; i < domElements.length; i++) {
            instance = this.decorateChild(
                sm.bSmScore.SmScoreBrief.NAME,
                domElements[i]
            );

            this.scoreItems_.push(instance);
        }
    };


    /**
     * Initializes instance of full description
     * @private
     */
    Course.prototype.initFullDescription_ = function() {
        var fullDescription = this.getView().getDom().fullDescription;
        if (fullDescription) {
            this.fullDescription_ = this.decorateChild(
                sm.bSmCollapsedText.SmCollapsedText.NAME,
                fullDescription
            );
        }
    };


    /**
     * Initializes instance of map
     * @private
     */
    Course.prototype.initMap_ = function() {
        if (this.getView().getDom().map) {
            this.map_ = this.decorateChild(
                sm.bSmMap.SmMap.NAME,
                this.getView().getDom().map
            );
        }
    };


    /**
     * Initializes instances of User interactions
     * @private
     */
    Course.prototype.initUserInteractions_ = function() {
        this.userInteractions_ = this.decorateChildren(
            sm.lCourse.bUserInteraction.UserInteraction.NAME,
            this.getView().getDom().userInteractions
        );
    };


    /**
     * Initializes instance of department List
     * @private
     */
    Course.prototype.initDepartmentList_ = function() {
        var domElement = this.getView().getDom().departmentList;

        if (domElement) {
            this.departmentList_ = this.decorateChild(
                sm.bSmItemList.SmItemList.NAME,
                domElement
            );
        }
    };


    /**
     * Initializes instances of modals
     * @private
     */
    Course.prototype.initModals_ = function() {
        this.modalEnrollment_ = this.decorateChild(
            sm.gModal.ModalEnrollment.NAME,
            this.getView().getDom().modalEnrollment
        );

        this.modalSuccess_ = this.decorateChild(
            sm.gModal.ModalSuccess.NAME,
            this.getView().getDom().modalSuccess
        );
    };
});  // goog.scope


/**
 * creates sm.lCourse.Course instance
 */
jQuery(function() {
    sm.iLayout.LayoutStendhal.autoInstance(
        sm.lCourse.Course.NAME,
        sm.lCourse.View.CssClass.ROOT
    );
});
