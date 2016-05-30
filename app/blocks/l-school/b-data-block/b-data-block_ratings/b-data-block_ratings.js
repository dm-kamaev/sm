goog.provide('sm.lSchool.bDataBlock.DataBlockRatings');

goog.require('cl.gHint.View');
goog.require('goog.ui.Component');
goog.require('sm.lSchool.bDataBlock.TemplateRatings');



/**
 * sm.lSchool.bDataBlock.DataBlockRatings component
 * @param {Object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bDataBlock.DataBlockRatings = function(opt_params) {
    goog.base(this);


    /**
     * Elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};


    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};
};
goog.inherits(sm.lSchool.bDataBlock.DataBlockRatings, goog.ui.Component);


goog.scope(function() {
    var DataBlock = sm.lSchool.bDataBlock.DataBlockRatings,
        HintView = cl.gHint.View;


    /**
     * Css class enum
     * @enum {string}
     */
    DataBlock.CssClass = {
        ROOT: 'b-data-block_ratings',
        CONTENT_WRAP: 'b-data-block__content-wrap',
        HINT_HREF: 'b-data-block__hint-href'
    };


    /**
     * @override
     */
    DataBlock.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSchool.bDataBlock.TemplateRatings.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };


    /**
     * @override
     * @param {Element} element
     */
    DataBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.elements_.contentWrap =
            this.getElementByClass(DataBlock.CssClass.CONTENT_WRAP);
        this.elements_.hintHref =
            this.getElementByClass(DataBlock.CssClass.HINT_HREF);
    };


    /**
     * @override
     */
    DataBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
                this.elements_.contentWrap,
                goog.events.EventType.CLICK,
                this.onContentWrapClick_
            )
            .listen(
                this.elements_.hintHref,
                goog.events.EventType.CLICK,
                this.onHintHrefClick_
            );
    };


    /**
     * @override
     */
    DataBlock.prototype.disposeInternal = function() {
        goog.base(this, 'disposeInternal');

        this.params_ = null;
        this.elements_ = null;
    };


    /**
     * On hint href click
     * @private
     */
    DataBlock.prototype.onHintHrefClick_ = function() {
        window.open('http://dogm.mos.ru/rating/');
    };


    /**
     * On content wrap click
     * @private
     */
    DataBlock.prototype.onContentWrapClick_ = function() {
        this.toggleHintInlude_();

        this.getHandler().listen(
            document,
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );
    };


    /**
     * On document click actions
     * @param  {Object} event
     * @private
     */
    DataBlock.prototype.onDocumentClick_ = function(event) {
        var ancestor = goog.dom.getAncestorByClass(
            event.target,
            DataBlock.CssClass.CONTENT_WRAP
        );

        if (ancestor !== this.elements_.contentWrap) {
            this.removeHintInlude_();

            this.getHandler().unlisten(
                document,
                goog.events.EventType.CLICK,
                this.onDocumentClick_
            );
        }
    };


    /**
     * Toggle hint include css class
     * @private
     */
    DataBlock.prototype.toggleHintInlude_ = function() {
        console.log(HintView.CssClass.INCLUDE_CLICK_MODE);
        goog.dom.classlist.toggle(
            this.elements_.contentWrap,
            HintView.CssClass.INCLUDE_CLICK_MODE
        );
    };


    /**
     * Remove hint include css class
     * @private
     */
    DataBlock.prototype.removeHintInlude_ = function() {
        goog.dom.classlist.remove(
            this.elements_.contentWrap,
            HintView.CssClass.INCLUDE_CLICK_MODE
        );
    };
});  // goog.scope
