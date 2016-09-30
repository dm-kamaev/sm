/**
 * @fileoverview Option view
 */
goog.provide('sm.lCourse.bOption.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmExpander.SmExpander');



goog.scope(function() {
    /**
     * View for Option block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.lCourse.bOption.View = function(opt_params, opt_type, opt_modifier) {
        sm.lCourse.bOption.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.lCourse.bOption.View, cl.iControl.View);
    var View = sm.lCourse.bOption.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-option',
        ENROLL_BUTTON: 'b-option__enroll-button'
    };


    /**
     * List of possible events
     * @enum {string}
     * @const
     */
    View.Event = {
        ENROLL_BUTTON_CLICK: goog.events.getUniqueId('enrollButtonClick')
    };


    /**
     * @typedef {{
     *     features: Array<{
     *         type: number,
     *         value: string
     *     }>,
     *     cost: number
     * }}
     */
    sm.lCourse.bOption.View.RenderParams;


    /**
     * @typedef {{
     *     features: Array<{
     *         type: number,
     *         value: string
     *     }>,
     *     cost: number
     * }}
     */
    sm.lCourse.bOption.View.DataParams;


    /**
     * Transform params to compressed ones
     * @param {Object<string, (Array|Object|number)>} rawParams
     * @return {sm.lCourse.bOption.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            features: goog.array.map(rawParams['features'], function(feature) {
                return {
                    type: feature['type'],
                    value: feature['value']
                };
            }),
            cost: rawParams['cost'],
            buttonText: rawParams['buttonText']
        };
    };


    /**
     * Getter for params
     * @return {sm.lCourse.bOption.View.DataParams}
     * @public
     * @override
     */
    View.prototype.getParams = function() {
        if (!this.params || goog.object.isEmpty(this.params)) {
            var elem = this.getElement(),
                data = elem && elem.getAttribute('data-params');
            if (data) {
                this.params = this.transformParams(JSON.parse(data));
            }
        }

        return this.params;
    };

        /**
     * Transform params to compressed ones
     * @param {Object<string, (Array|Object|number)>} rawParams
     * @return {sm.lCourse.bOption.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            features: goog.array.map(rawParams['features'], function(feature) {
                return {
                    type: feature['type'],
                    value: feature['value']
                };
            }),
            cost: rawParams['cost']
        };
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @protected
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.enrollButton,
            goog.events.EventType.CLICK,
            this.onEnrollButtonClick_
        );
    };


    /**
     * Enroll button click handler
     * @private
     */
    View.prototype.onEnrollButtonClick_ = function() {
        this.dispatchEvent(View.Event.ENROLL_BUTTON_CLICK);
    };


    /**
     * Init dom elements
     * @return {sm.bOption.View}
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            expander: this.getElementByClass(
                sm.bSmExpander.SmExpander.CssClass.ROOT
            ),
            enrollButton: this.getElementByClass(View.CssClass.ENROLL_BUTTON)
        };

        return this;
    };
});  // goog.scope
