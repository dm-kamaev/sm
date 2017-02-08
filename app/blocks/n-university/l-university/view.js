goog.provide('sm.lUniversity.View');

goog.require('sm.bSmSketch.View');
goog.require('sm.bSummaryBoard.View');
goog.require('sm.iLayout.ViewStendhal');
goog.require('sm.lUniversity.bDescriptionList.View');



goog.scope(function() {



    /**
     * University View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lUniversity.View = function(opt_params, opt_type, opt_modifier) {
        sm.lUniversity.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.lUniversity.View, sm.iLayout.ViewStendhal);
    var View = sm.lUniversity.View;


    /**
     * Data parameters from dom element.
     * @typedef {{
     *     id: number,
     *     name: string,
     *     isCommented: boolean,
     *     isUserAuthorzed: boolean,
     *     authSocialLinks:  {
     *             vk: (string|undefined),
     *             fb: (string|undefined)
     *     },
     *     type: string
     * }}
     */
    sm.lUniversity.View.Params;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-university',
        SKETCH: sm.bSmSketch.View.CssClass.ROOT,
        DESCRIPTION_LIST: sm.lUniversity.bDescriptionList.View.CssClass.ROOT,
        SUMMARY_BOARD: sm.bSummaryBoard.View.CssClass.ROOT
    };


    /**
     * @param {Element} element
     * @override
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
                sketch: this.getElementByClass(
                    View.CssClass.SKETCH
                ),
                descriptionList: this.getElementByClass(
                    View.CssClass.DESCRIPTION_LIST
                ),
                summaryBoard: this.getElementByClass(
                    View.CssClass.SUMMARY_BOARD
                )
            }
        );
    };


    /**
     * Transform raw params from dom element to sm.lUniversity.View.Params
     * @param  {Object} rawParams
     * @return {sm.lUniversity.View.Params}
     * @protected
     * @override
     */
    View.prototype.transformParams = function(rawParams) {
        var params = View.base(this, 'transformParams', rawParams);

        goog.object.extend(params, {
            id: rawParams['id'],
            name: rawParams['name']
        });

        return params;
    };
});  // goog.scope
