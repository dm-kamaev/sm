goog.provide('sm.lCourse.Course');

goog.require('cl.iRequest.Request');
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
         * Instances button
         * @type {sm.gModal.ModalEnrollment}
         * @private
         */
        this.modalEnrollment_ = null;
    };
    goog.inherits(sm.lCourse.Course, sm.iLayout.LayoutStendhal);
    var Course = sm.lCourse.Course,
        Viewport = sm.iSmViewport.SmViewport;


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
     * Action button handler
     * @private
     */
    Course.prototype.onActionButtonClick_ = function() {
        this.modalEnrollment_.show();
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
