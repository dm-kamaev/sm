/**
 * @fileoverview Option control
 * Contains enroll button and expander for features of option
 * Dispatch evenet on enroll button click
 */
goog.provide('sm.lCourse.bOption.Option');

goog.require('cl.iControl.Control');
goog.require('sm.lCourse.bOption.View');


goog.scope(function() {
    var View = sm.lCourse.bOption.View;




    /**
     * Option block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.lCourse.bOption.Option = function(view, opt_domHelper) {
        sm.lCourse.bOption.Option.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Expander instance
         * @type {sm.bSmExpander.SmExpander}
         * @private
         */
        this.expander_ = null;


        /** Disable states of goog.ui.Component */
        this.setSupportedState(goog.ui.Component.State.ALL, false);
    };
    goog.inherits(sm.lCourse.bOption.Option, cl.iControl.Control);
    var Option = sm.lCourse.bOption.Option;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    Option.CssClass = {
        ROOT: View.CssClass.ROOT
    };


    /**
     * List of Option events
     * @enum {string}
     * @const
     */
    Option.Event = {
        ENROLL_BUTTON_CLICK: View.Event.ENROLL_BUTTON_CLICK
    };


    /**
     * @typedef {sm.lCourse.bOption.View.RenderParams}
     */
    sm.lCourse.bOption.Option.RenderParams;


    /**
     * @typedef {sm.lCourse.bOption.View.DataParams}
     */
    sm.lCourse.bOption.Option.DataParams;



    /**
     * Transform params to compressed ones
     * @param {Object<string, (Array|Object|number)>} rawParams
     * @return {sm.lCourse.bOption.View.RenderParams}
     */
    Option.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * Date getter
     * @return {sm.lCourse.bOption.Option.DataParams}
     * @private
     */
    Option.prototype.getData_ = function() {
        return this.params;
    };


    /**
     * @override
     * @param {Element} element
     */
    Option.prototype.decorateInternal = function(element) {
        Option.base(this, 'decorateInternal', element);

        this.expander_ = this.decorateChild(
            'smExpander',
            this.getView().getDom().expander
        );
    };


    /**
     * @override
     */
    Option.prototype.enterDocument = function() {
        Option.base(this, 'enterDocument');

        this.autoDispatch(View.Event.ENROLL_BUTTON_CLICK);
    };

});  // goog.scope
