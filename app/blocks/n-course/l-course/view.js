goog.provide('sm.lCourse.View');

goog.require('sm.bSmCollapsedText.View');
goog.require('sm.bSmMap.View');
goog.require('sm.bSmScore.ViewBrief');
goog.require('sm.iLayout.ViewStendhal');



goog.scope(function() {



    /**
     * Course View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lCourse.View = function(opt_params, opt_type, opt_modifier) {
        sm.lCourse.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.lCourse.View, sm.iLayout.ViewStendhal);
    var View = sm.lCourse.View;


    /**
     * Data parameters from dom element.
     * @typedef {{
     *     id: number,
     *     name: string,
     *     category: string,
     *     cost: string,
     *     isCommented: boolean,
     *     isUserAuthorzed: boolean,
     *     authSocialLinks:  {
     *             vk: (string|undefined),
     *             fb: (string|undefined)
     *     },
     *     type: string
     * }}
     */
    sm.lCourse.View.Params;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-course',
        DEPARTMENT_LIST: 'l-course__department-list'
    };


    /**
     *
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Init dom elements
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(
            this.dom,
            {
                scoreItems: this.getElementsByClass(
                    sm.bSmScore.ViewBrief.CssClass.ROOT
                ),
                fullDescription: this.getElementByClass(
                    sm.bSmCollapsedText.View.CssClass.ROOT
                ),
                map: this.getElementByClass(
                    sm.bSmMap.View.CssClass.ROOT
                ),
                userInteractions: this.getElementsByClass(
                    sm.lCourse.bUserInteraction.View.CssClass.ROOT
                ),
                modalEnrollment: this.getElementByClass(
                    sm.gModal.ViewEnrollment.CssClass.ROOT
                ),
                modalSuccess: this.getElementByClass(
                    sm.gModal.ViewSuccess.CssClass.ROOT
                ),
                departmentList: this.getElementByClass(
                    View.CssClass.DEPARTMENT_LIST
                )
            }
        );
    };


    /**
     * Transform raw params from dom element to sm.lCourse.View.Params
     * @param  {Object} rawParams
     * @return {sm.lCourse.View.Params}
     * @protected
     * @override
     */
    View.prototype.transformParams = function(rawParams) {
        var params = View.base(this, 'transformParams', rawParams);

        goog.object.extend(params, {
            id: rawParams['id'],
            name: rawParams['name'],
            category: rawParams['category'],
            cost: rawParams['cost']
        });

        return params;
    };
});  // goog.scope
