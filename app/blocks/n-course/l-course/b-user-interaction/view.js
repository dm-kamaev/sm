goog.provide('sm.lCourse.bUserInteraction.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lCourse.bUserInteraction.View = function(opt_params, opt_type,
    opt_modifier) {

    sm.lCourse.bUserInteraction.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lCourse.bUserInteraction.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.lCourse.bUserInteraction.View;


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLICK: goog.events.getUniqueId('click')
    };


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-user-interaction',
        BUTTON: 'b-user-interaction__button-action'
    };


    /**
     * @param {Element} element
     * @override
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

        this.initDomListeners_();
    };


    /**
     * Initializes listeners for dom elements
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClick_
        );
    };


    /**
     * Root Element click handler
     * @param {goog.events.EventType} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
        this.dispatchEvent(View.Event.CLICK);
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            button: this.getElementByClass(
                View.CssClass.BUTTON
            )
        };
    };
});  // goog.scope
