goog.provide('sm.lUniversity.View');

goog.require('sm.bSmCollapsedText.View');
goog.require('sm.bSmRowLinks.View');
goog.require('sm.bSmSketch.View');
goog.require('sm.bSmSubscribeBoard.View');
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
     *     abbreviation: string,
     *     category: string,
     *     subunitName: string,
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
        SUMMARY_BOARD: sm.bSummaryBoard.View.CssClass.ROOT,
        CUT_DESCRIPTION: sm.bSmCollapsedText.View.CssClass.ROOT,
        PROGRAMS: 'l-university__programs',
        COURSES: 'l-university__courses',
        COMMENTS: 'l-university__comments',
        NAVIGATION_PANEL: sm.bSmRowLinks.View.CssClass.ROOT,
        SUBSCRIBE_BOARD: sm.bSmSubscribeBoard.View.CssClass.ROOT
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
                ),
                banner: this.getElementByClass(
                    sm.bSmBanner.View.CssClass.ROOT
                ),
                cutDescription: this.getElementByClass(
                    View.CssClass.CUT_DESCRIPTION
                ),
                programs: this.getElementByClass(
                    View.CssClass.PROGRAMS
                ),
                courses: this.getElementByClass(
                    View.CssClass.COURSES
                ),
                modalComment: this.getElementByClass(
                    sm.gModal.ViewInteraction.CssClass.ROOT
                ),
                comments: this.getElementByClass(
                    View.CssClass.COMMENTS
                ),
                navigationPanel: this.getElementByClass(
                    View.CssClass.NAVIGATION_PANEL
                ),
                subscribeBoard: this.getElementByClass(
                    View.CssClass.SUBSCRIBE_BOARD
                ),
                entityRelation: this.getElementByClass(
                    sm.bEntityRelation.View.CssClass.ROOT
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
            name: rawParams['name'],
            abbreviation: rawParams['abbreviation'],
            category: rawParams['category'],
            subunitName: rawParams['subunitName']
        });

        return params;
    };
});  // goog.scope
