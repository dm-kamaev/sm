goog.provide('sm.bSmCollapsedText.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



goog.scope(function() {
    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmCollapsedText.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmCollapsedText.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmCollapsedText.View, cl.iControl.View);
    var View = sm.bSmCollapsedText.View;


    /**
    * List of CSS classes
    * @enum {string}
    * @const
    */
    View.CssClass = {
        ROOT: 'b-sm-collapsed-text',
        CUT_TEXT: 'b-sm-collapsed-text__text_cut',
        FULL_TEXT: 'b-sm-collapsed-text__text_full',
        BUTTON_EXPAND: 'b-sm-collapsed-text__button_expand',
        BUTTON_COLLAPSE: 'b-sm-collapsed-text__button_collapse'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initButtonsListeners_();
    };


    /**
     * Show full text and hide cut text
     */
    View.prototype.showFullText = function() {
        this.setCutTextVisibility_(false);
        this.setFullTextVisibility_(true);
    };


    /**
     * Show cut text and hide full text
     */
    View.prototype.showCutText = function() {
        this.setCutTextVisibility_(true);
        this.setFullTextVisibility_(false);
    };


    /**
     * Show button collapse and hide button expand
     */
    View.prototype.showButtonCollapse = function() {
        this.setButtonExpandVisibility_(false);
        this.setButtonCollapseVisibility_(true);
    };


    /**
     * Show button expand and hide button collapse
     */
    View.prototype.showButtonExpand = function() {
        this.setButtonExpandVisibility_(true);
        this.setButtonCollapseVisibility_(false);
    };


    /**
     * Initializes Buttons Listeners
     * @private
     */
    View.prototype.initButtonsListeners_ = function() {
        var handler = this.getHandler();

        if (this.dom.buttonExpand) {
            handler.listen(
                this.dom.buttonExpand,
                goog.events.EventType.CLICK,
                this.onButtonExpandClick_
            );
        }

        if (this.dom.buttonCollapse) {
            handler.listen(
                this.dom.buttonCollapse,
                goog.events.EventType.CLICK,
                this.onButtonCollapseClick_
            );
        }
    };


    /**
     * Button expand handler
     * @private
     */
    View.prototype.onButtonExpandClick_ = function() {
        this.showFullText();
        this.showButtonCollapse();
    };


    /**
     * Button collapse handler
     * @private
     */
    View.prototype.onButtonCollapseClick_ = function() {
        this.showCutText();
        this.showButtonExpand();
    };


    /**
     * Adds or deletes class to cut text
     * @param {bool} visible
     * @private
     */
    View.prototype.setCutTextVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.cutText,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.cutText,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Adds or deletes class to full text
     * @param {bool} visible
     * @private
     */
    View.prototype.setFullTextVisibility_ = function(visible) {
        if (this.dom.fullText) {
            visible ?
                goog.dom.classlist.remove(
                    this.dom.fullText,
                    cl.iUtils.Utils.CssClass.HIDDEN
                ) :
                goog.dom.classlist.add(
                    this.dom.fullText,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
        }
    };


    /**
     * Adds or deletes class to button expand
     * @param {bool} visible
     * @private
     */
    View.prototype.setButtonExpandVisibility_ = function(visible) {
        if (this.dom.buttonExpand) {
            visible ?
                goog.dom.classlist.remove(
                    this.dom.buttonExpand,
                    cl.iUtils.Utils.CssClass.HIDDEN
                ) :
                goog.dom.classlist.add(
                    this.dom.buttonExpand,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
        }
    };


    /**
     * Adds or deletes class to button collapse
     * @param {bool} visible
     * @private
     */
    View.prototype.setButtonCollapseVisibility_ = function(visible) {
        if (this.dom.buttonCollapse) {
            visible ?
                goog.dom.classlist.remove(
                    this.dom.buttonCollapse,
                    cl.iUtils.Utils.CssClass.HIDDEN
                ) :
                goog.dom.classlist.add(
                    this.dom.buttonCollapse,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
        }
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            cutText: this.getElementByClass(
                View.CssClass.CUT_TEXT
            ),
            fullText: this.getElementByClass(
                View.CssClass.FULL_TEXT
            ),
            buttonExpand: this.getElementByClass(
                View.CssClass.BUTTON_EXPAND
            ),
            buttonCollapse: this.getElementByClass(
                View.CssClass.BUTTON_COLLAPSE
            )
        };
    };
});  // goog.scope
