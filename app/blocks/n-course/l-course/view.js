goog.provide('sm.lCourse.View');

goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('sm.bSmCollapsedText.View');
goog.require('sm.bSmMap.View');
goog.require('sm.bSmScore.ViewBrief');
goog.require('sm.iLayout.ViewStendhal');
goog.require('sm.iSmViewport.SmViewport');



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

        /**
         * From coord and height, stickyData
         * coordToY not save, because it is dynamic variable
         * @type {{
         *     height: number,
         *     fromCoordY: number
         * }}
         * @private
         */
        this.stickyDataParams_ = {};
    };
    goog.inherits(sm.lCourse.View, sm.iLayout.ViewStendhal);
    var View = sm.lCourse.View;

    var Viewport = sm.iSmViewport.SmViewport;


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
     * State enum of sticky data
     * @enum {string}
     */
    View.StateStickyData = {
        DEFAULT: 'default',
        ABSOLUTE: 'absolute',
        FIXED: 'fixed'
    };


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-course',
        SECTION_DATA: 'l-course__section_data',
        STICKY_DATA: 'l-course__data_sticky',
        DATA_FIXED: 'l-course__data_position_fixed',
        DATA_ABSOLUTE: 'l-course__data_position_absolute',
        DEPARTMENT_LIST: 'l-course__department-list'
    };


    /**
     *
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initStickyDataParams_();
        this.onScrollPage_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDocumentListeners_();
    };


    /**
     * Init listeners for document
     * @private
     */
    View.prototype.initDocumentListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getDocument(),
            goog.events.EventType.SCROLL,
            this.onScrollPage_
        );
    };


    /**
     * Scroll page listeners
     * @private
     */
    View.prototype.onScrollPage_ = function() {
        var viewportSize = Viewport.getInstance().getSize();

        if (viewportSize >= Viewport.Size.M) {
            this.changeStickyDataState_();
        }
    };


    /**
     * Change stickyData state (change css property - position)
     * if it not not fit in coords range
     * @private
     */
    View.prototype.changeStickyDataState_ = function() {
        var stickyDataBottomCoordY = goog.dom.getPageScroll().y +
            this.stickyDataParams_.height;

        var toCoordY = this.stickyDataParams_.fromCoordY +
            goog.style.getSize(this.dom.sectionData).height;

        if (goog.dom.getPageScroll().y < this.stickyDataParams_.fromCoordY) {
            this.setStickyDataState_(View.StateStickyData.DEFAULT);
        }
        else if (stickyDataBottomCoordY >= toCoordY) {
            this.setStickyDataState_(View.StateStickyData.ABSOLUTE);
        }
        else {
            this.setStickyDataState_(View.StateStickyData.FIXED);
        }
    };


    /**
     * Set css position of sticky data
     * @param {string} state
     * @private
     */
    View.prototype.setStickyDataState_ = function(state) {
        if (state == View.StateStickyData.ABSOLUTE) {
            goog.dom.classlist.addRemove(
                this.dom.stickyData,
                View.CssClass.DATA_FIXED,
                View.CssClass.DATA_ABSOLUTE
            );
        }
        else if (state == View.StateStickyData.FIXED) {
            goog.dom.classlist.addRemove(
                this.dom.stickyData,
                View.CssClass.DATA_ABSOLUTE,
                View.CssClass.DATA_FIXED
            );
        }
        else if (state == View.StateStickyData.DEFAULT) {
            goog.dom.classlist.removeAll(
                this.dom.stickyData, [
                    View.CssClass.DATA_ABSOLUTE,
                    View.CssClass.DATA_FIXED
                ]
            );
        }
    };


    /**
     * Init params StickyData - coords range and height
     * @private
     */
    View.prototype.initStickyDataParams_ = function() {
        this.stickyDataParams_ = {
            height: goog.style.getSize(this.dom.stickyData).height,
            fromCoordY: goog.style.getPageOffsetTop(this.dom.sectionData)
        };
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
                sectionData: this.getElementByClass(
                    View.CssClass.SECTION_DATA
                ),
                stickyData: this.getElementByClass(
                    View.CssClass.STICKY_DATA
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
