goog.provide('sm.lCourse.Course');

goog.require('cl.iRequest.Request');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.iSmViewport.SmViewport');
goog.require('sm.lCourse.View');
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
    };
    goog.inherits(sm.lCourse.Course, sm.iLayout.LayoutStendhal);
    var Course = sm.lCourse.Course,
        View = sm.lCourse.View,
        Viewport = sm.iSmViewport.SmViewport,
        AnalyticsSender = sm.lCourse.iAnalyticsSender.AnalyticsSender,
        Analytics = sm.iAnalytics.Analytics;


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

        this.initUserInteractionsListeners_();
        this.initDepartmentListListeners_();
        this.initModalsListeners_();

        this.analyticsSender_.sendPageview();
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
        this.analyticsSender_ = new AnalyticsSender('course details');

        this.analyticsSender_.setProductParams({
            id: this.params.id,
            name: this.params.name,
            category: this.params.category,
            price: this.params.cost
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
                'smScoreBrief',
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
                'smCollapsedText',
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
                'smMap',
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
            'lCourse-userInteraction',
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
                'smItemList',
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
            'modal-enrollment',
            this.getView().getDom().modalEnrollment
        );

        this.modalSuccess_ = this.decorateChild(
            'modal-success',
            this.getView().getDom().modalSuccess
        );
    };
});  // goog.scope


/**
 * creates sm.lCourse.Course instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lCourse.View.CssClass.ROOT
    );

    var view = new sm.lCourse.View();
    var instance = new sm.lCourse.Course(view);

    instance.decorate(domElement);
});
