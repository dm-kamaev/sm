goog.provide('sm.bSummaryBoard.View');

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
sm.bSummaryBoard.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSummaryBoard.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {{
     *     link: Element
     * }}
     */
    this.dom = {};
};
goog.inherits(sm.bSummaryBoard.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSummaryBoard.View;


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
        ROOT: 'b-summary-board',
        LINK: 'b-summary-board__link'
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
            this.dom.link,
            goog.events.EventType.CLICK,
            this.onLinkClick_
        );
    };


    /**
     * Button link click handler
     * @private
     */
    View.prototype.onLinkClick_ = function() {
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
            link: this.getElementByClass(
                View.CssClass.LINK
            )
        };
    };
});  // goog.scope
