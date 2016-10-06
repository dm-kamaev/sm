/**
 * @fileoverview Department block view
 */
goog.provide('sm.lCourse.bDepartment.View');

goog.require('cl.iControl.View');
goog.require('sm.lCourse.bOption.Option');



goog.scope(function() {



    /**
     * View for Address block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.lCourse.bDepartment.View = function(opt_params, opt_type, opt_modifier) {
        sm.lCourse.bDepartment.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.lCourse.bDepartment.View, cl.iControl.View);
    var View = sm.lCourse.bDepartment.View;


    /**
     * @typedef {{
     *     data: {
     *         name: string,
     *         metros: Array<string>,
     *         options: Array<sm.lCourse.bOption.Option.RenderParams>
     *     }
     * }}
     */
    sm.lCourse.bDepartment.View.RenderParams;


    /**
     * @typedef {{
     *     name: string,
     *     metros: Array<string>
     * }}
     */
    sm.lCourse.bDepartment.View.DataParams;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLICK: goog.events.getUniqueId('click')
    };


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-department'
    };


    /**
     * Transform params to compressed ones
     * @param {Object<string, (string|Array|Object)>} rawParams
     * @return {sm.lCourse.bDepartment.View.RenderParams}
     * @public
     */
    View.getRenderParams = function(rawParams) {
        return {
            data: {
                name: rawParams['name'],
                metros: rawParams['metros'],
                options: rawParams['options']
            }
        };
    };


    /**
     * Getter for params
     * @return {sm.lCourse.bDepartment.View.DataParams}
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
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initElementListeners_();
    };


    /**
     * Initializes listeners for root Element
     * @private
     */
    View.prototype.initElementListeners_ = function() {
        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClick_
        );
    };


    /**
     * Handler click on root Element
     * @param {Object} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
        this.dispatchEvent(View.Event.CLICK);
    };


    /**
     * Transform params to compressed ones
     * @param {Object<string, (Array|Object|number)>} rawParams
     * @return {sm.lCourse.bDepartment.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            name: rawParams['name'],
            metros: rawParams['metros']
        };
    };


    /**
     * Init dom elements
     * @return {sm.lCourse.bDepartment.View}
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            options: this.getElementsByClass(
                sm.lCourse.bOption.Option.CssClass.ROOT
            )
        };

        return this;
    };
});  // goog.scope
