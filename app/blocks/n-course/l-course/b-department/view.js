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
     *         metro: Array<string>
     *         options: Array<sm.bOption.Template.Params.Data>
     *     }
     * }}
     */
    sm.lCourse.bDepartment.View.RenderParams;


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
     * @return {sm.bDepartment.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            name: rawParams['name'],
            metro: rawParams['metro'],
            options: rawParams['options']
        };
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
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
