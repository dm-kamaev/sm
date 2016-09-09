goog.provide('sm.lCourse.Course');

goog.require('sm.iLayout.LayoutStendhal');
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
         * Instances button
         * @type {Array<cl.gButton.Button>}
         * @private
         */
        this.actionButtons_ = [];
    };
    goog.inherits(sm.lCourse.Course, sm.iLayout.LayoutStendhal);
    var Course = sm.lCourse.Course;


    /**
     * @param {Element} element
     * @override
     */
    Course.prototype.decorateInternal = function(element) {
        Course.base(this, 'decorateInternal', element);

        this.initScore_();
        this.initFullDescription_();
        this.initActionButtons_();
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
        console.log('onActionButtonClick_');
    };


    /**
     * Initializes instance of full description
     * @private
     */
    Course.prototype.initFullDescription_ = function() {
        this.fullDescription_ = this.decorateChild(
            'smCollapsedText',
            this.getView().getDom().fullDescription
        );
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
