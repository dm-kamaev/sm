goog.provide('sm.lCourse.Course');

goog.require('cl.iRequest.Request');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.iSmViewport.SmViewport');
goog.require('sm.lCourse.View');


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
         * Instances button
         * @type {Array<cl.gButton.Button>}
         * @private
         */
        this.actionButtons_ = [];


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
    };
    goog.inherits(sm.lCourse.Course, sm.iLayout.LayoutStendhal);
    var Course = sm.lCourse.Course,
        Viewport = sm.iSmViewport.SmViewport,
        Analytics = sm.iAnalytics.Analytics;


    /**
     * Place from which the analyst goes enum
     * @enum {string}
     */
    Course.PLACE_ANALITICS = 'course details';


    /**
     * @param {Element} element
     * @override
     */
    Course.prototype.decorateInternal = function(element) {
        Course.base(this, 'decorateInternal', element);

        this.initScore_();
        this.initFullDescription_();
        this.initMap_();
        this.initActionButtons_();
        this.initDepartmentList_();
        this.initModals_();
        this.initIRequest_();
    };


    /**
     * @override
     */
    Course.prototype.enterDocument = function() {
        Course.base(this, 'enterDocument');

        this.initActionButtonsListeners_();
        this.initDepartmentListListeners_();
        this.initModalsListeners_();

        this.sendAnalyticsPageview_();
    };


    /**
     * Initializes listeners for instances of action buttons
     * @private
     */
    Course.prototype.initActionButtonsListeners_ = function() {
        for (var i = 0; i < this.actionButtons_.length; i++) {
            this.getHandler().listen(
                this.actionButtons_[i],
                cl.gButton.Button.Event.CLICK,
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
     * @private
     */
    Course.prototype.onSendEnrollmentSuccess_ = function() {
        this.modalSuccess_.show();
    };


    /**
     * Send enrollment success handler
     * @private
     */
    Course.prototype.onModalEnrollmentShow_ = function() {
        this.sendAnalyticsCheckoutEnrollment_();
    };


    /**
     * Send analytics about pageview
     * @private
     */
    Course.prototype.sendAnalyticsPageview_ = function() {
        // console.log('sendAnalyticsPageview_');
        var data = this.getEcAnalyticsCourseData_();

        Analytics.getInstance().viewProduct(data);
        Analytics.getInstance().setView();
        Analytics.getInstance().send('pageview');
    };


    /**
     * Send analytics about shown modal enrollment
     * @private
     */
    Course.prototype.sendAnalyticsCheckoutEnrollment_ = function() {
        // console.log('sendAnalyticsCheckoutEnrollment_');
        var courseData = this.getEcAnalyticsCourseData_(),
            enrollmentData = this.getEcAnalyticsEnrollmentData_();

        Analytics.getInstance().checkoutProduct(courseData, enrollmentData);
    };

    /**
     * Send analytics about send Enrollment
     * @param {number} id - id enrollment
     * @private
     */
    Course.prototype.sendAnalyticsSendEnrollment_ = function(id) {
        // console.log('sendAnalyticsSendEnrollment_');
        var courseData = this.getEcAnalyticsCourseData_(),
            enrollmentData = this.getEcAnalyticsEnrollmentData_(id);

        Analytics.getInstance().purchaseProduct(courseData, enrollmentData);
    };


    /**
     * Get course data for ecommerce
     * @return {Object}
     * @private
     */
    Course.prototype.getEcAnalyticsCourseData_ = function() {
        return {
            'id': this.params.id,
            'name': this.params.name,
            'category': this.params.category
        };
        // console.log(data);
    };


    /**
     * Get enrollment data for ecommerce
     * @param {number=} opt_id - id enrollment
     * @return {Object}
     * @private
     */
    Course.prototype.getEcAnalyticsEnrollmentData_ = function(opt_id) {
        var data = {
            'list': 'course details',
            'revenue': this.params.cost.replace(/\D/gi, '')
        };

        if (opt_id) {
            data['id'] = opt_id;
        }
        // console.log(data);
        return data;
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
     * Initializes instances of action buttons
     * @private
     */
    Course.prototype.initActionButtons_ = function() {
        var domElements = this.getView().getDom().actionButtons,
            instance;

        for (var i = 0; i < domElements.length; i++) {
            instance = this.decorateChild(
                'button',
                domElements[i]
            );

            this.actionButtons_.push(instance);
        }
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

    var view = new sm.lCourse.View(null, null, 'stendhal');
    var instance = new sm.lCourse.Course(view);

    instance.decorate(domElement);
});
