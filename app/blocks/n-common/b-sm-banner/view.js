goog.provide('sm.bSmBanner.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');



/**
 * SummaryBoard View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmBanner.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmBanner.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {{
     *     buttonLink: Element
     * }}
     */
    this.dom = {};
};
goog.inherits(sm.bSmBanner.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmBanner.View;


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        LINK_CLICK: goog.events.getUniqueId('link-click')
    };


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-banner',
        BUTTON_LINK: 'b-sm-banner__button-link'
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDomListeners_();
    };


    /**
     * Initializes listeners for dom element
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        this.getHandler().listen(
            this.dom.buttonLink,
            goog.events.EventType.CLICK,
            this.onButtonLinkClick_
        );
    };


    /**
     * Button link click handler
     * @private
     */
    View.prototype.onButtonLinkClick_ = function() {
        this.dispatchEvent(View.Event.LINK_CLICK);
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            buttonLink: this.getElementByClass(
                View.CssClass.BUTTON_LINK
            )
        };
    };
});  // goog.scope
