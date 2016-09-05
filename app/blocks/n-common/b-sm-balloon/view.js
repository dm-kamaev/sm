goog.provide('sm.bSmBalloon.View');

goog.require('cl.iControl.View');



goog.scope(function() {



    /**
     * View for Ymaps ballon content template block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
     sm.bSmBalloon.View = function(opt_params, opt_type, opt_modifier) {
         sm.bSmBalloon.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmBalloon.View, cl.iControl.View);
    var View = sm.bSmBalloon.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-balloon',
        CLOSE_BUTTON: 'b-sm-balloon__close',
        TITLE_LINK: 'b-sm-balloon__title-link'
    };


    /**
     * Possible events enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLOSE_BUTTON_CLICK: goog.events.getUniqueId('close-button-click'),
        TITLE_LINK_CLICK: goog.events.getUniqueId('title-link-click')
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
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initListeners_();
    };


    /**
     * Init listeners for dom elements
     * @private
     */
    View.prototype.initListeners_ = function() {
        var handler = this.getHandler();
        var dom = this.getDom();

        handler.listen(
            dom.closeButton,
            goog.events.EventType.CLICK,
            this.onCloseButtonClick_
        );
        if (dom.titleLink) {
            handler.listen(
                dom.titleLink,
                goog.events.EventType.CLICK,
                this.onTitleLinkClick_
            );
        }
    };


    /**
     * Close button click handler
     * @private
     */
    View.prototype.onCloseButtonClick_ = function() {
        this.dispatchEvent(View.Event.CLOSE_BUTTON_CLICK);
    };


    /**
     * Title click handler
     * @private
     */
    View.prototype.onTitleLinkClick_ = function() {
        this.dispatchEvent(View.Event.TITLE_LINK_CLICK);
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            closeButton: this.getElementByClass(
                View.CssClass.CLOSE_BUTTON
            ),
            titleLink: this.getElementByClass(
                View.CssClass.TITLE_LINK
            )
        };
    };
});  // goog.scope
