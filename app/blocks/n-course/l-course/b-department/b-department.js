goog.provide('sm.lCourse.bDepartment.Department');

goog.require('cl.iControl.Control');


goog.scope(function() {
    var View = sm.lCourse.bDepartment.View;




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
        CLICK: goog.events.getUniqueId('click')
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
     * @return {sm.bDepartment.Department.RenderParams}
     */
    Department.getRenderParams = function(rawParams) {
        return View.transformParams(rawParams);
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
