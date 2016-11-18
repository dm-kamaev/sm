/**
 * @fileoverview Department block control
 */
goog.provide('sm.lCourse.bDepartment.Department');

goog.require('cl.iControl.Control');
goog.require('sm.lCourse.bDepartment.Event.EnrollButtonClick');
goog.require('sm.lCourse.bDepartment.View');


goog.scope(function() {
    var View = sm.lCourse.bDepartment.View,
        Event = sm.lCourse.bDepartment.Event;




    /**
     * Department block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.lCourse.bDepartment.Department = function(view, opt_domHelper) {
        sm.lCourse.bDepartment.Department.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Option instances
         * @type {Array<sm.lCourse.bOption.Option>}
         * @private
         */
        this.options_ = null;


        this.setSupportedState(goog.ui.Component.State.ALL, false);
    };
    goog.inherits(sm.lCourse.bDepartment.Department, cl.iControl.Control);
    var Department = sm.lCourse.bDepartment.Department;


    /**
     * @typedef {sm.lCourse.bDepartment.View.RenderParams}
     */
    sm.lCourse.bDepartment.Department.RenderParams;


    /**
     * List of Department events
     * @enum {string}
     * @const
     */
    Department.Event = {
        CLICK: View.Event.CLICK,
        ENROLL_BUTTON_CLICK: Event.EnrollButtonClick.Type
    };


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    Department.CssClass = {
        ROOT: View.CssClass.ROOT
    };


    /**
     * Transform params to compressed ones
     * @param {Object<string, (string|Array|Object)>} rawParams
     * @return {sm.lCourse.bDepartment.Department.RenderParams}
     */
    Department.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * @override
     * @param {Element} element
     */
    Department.prototype.decorateInternal = function(element) {
        Department.base(this, 'decorateInternal', element);

        this.initOptions_();
    };


    /**
     * @override
     */
    Department.prototype.enterDocument = function() {
        Department.base(this, 'enterDocument');

        this.initOptionsListeners_();
        this.initViewListeners_();
    };


    /**
     * Initializes listeners for button
     * @private
     */
    Department.prototype.initOptionsListeners_ = function() {
        for (var i = 0; i < this.options_.length; i++) {
            this.getHandler().listen(
                this.options_[i],
                sm.lCourse.bOption.Option.Event.ENROLL_BUTTON_CLICK,
                this.onEnrollButtonClick_
            );
        }
    };


    /**
     * Initializes listeners for view
     * @private
     */
    Department.prototype.initViewListeners_ = function() {
        this.autoDispatch(View.Event.CLICK);
    };


    /**
     * Option button handler
     * @param {goog.events.Event} event
     * @private
     */
    Department.prototype.onEnrollButtonClick_ = function(event) {
        var data = {
            name: this.params.name,
            metros: this.params.metros,
            option: event.target.getData()
        };

        var enrollEvent = new Event.EnrollButtonClick(data, this);
        this.dispatchEvent(enrollEvent);
    };


    /**
     * Init options instances
     * @return {sm.lCourse.bDepartment.Department}
     * @private
     */
    Department.prototype.initOptions_ = function() {
        var options = this.getView().getDom().options;

        this.options_ = goog.array.map(options, this.initOption_, this);

        return this;
    };


    /**
     * Init option instance
     * @param {Element} element
     * @return {sm.lCourse.bOption.Option}
     * @private
     */
    Department.prototype.initOption_ = function(element) {
        return this.decorateChild(
            'lCourse-option',
            element
        );
    };
});  // goog.scope
