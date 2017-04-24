goog.provide('sm.lCourse.bUserInteraction.UserInteraction');

goog.require('cl.iControl.Control');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.iSmViewport.SmViewport');
goog.require('sm.lCourse.bUserInteraction.Template');
goog.require('sm.lCourse.bUserInteraction.View');



goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.lCourse.bUserInteraction.UserInteraction = function(view,
        opt_domHelper) {

        sm.lCourse.bUserInteraction.UserInteraction.base(
            this, 'constructor', view, opt_domHelper
        );

        /**
         * Instance button
         * @type {sm.gButton.ButtonStendhal}
         * @private
         */
        this.button_ = null;
    };
    goog.inherits(
        sm.lCourse.bUserInteraction.UserInteraction,
        cl.iControl.Control
    );
    var UserInteraction = sm.lCourse.bUserInteraction.UserInteraction,
        View = sm.lCourse.bUserInteraction.View;

    var Viewport = sm.iSmViewport.SmViewport;

    /**
     * Name of this element in factory
     */
    UserInteraction.NAME = sm.lCourse.bUserInteraction.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        UserInteraction.NAME, {
            control: UserInteraction,
            view: View
        }
    );

    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    UserInteraction.Event = {
        CLICK: View.Event.CLICK
    };


    /**
     * @param {Element} element
     * @override
     */
    UserInteraction.prototype.decorateInternal = function(element) {
        UserInteraction.base(this, 'decorateInternal', element);

        this.initButton_();
    };


    /**
     * @override
     */
    UserInteraction.prototype.enterDocument = function() {
        UserInteraction.base(this, 'enterDocument');

        this.initViewListeners_();
        this.initButtonListeners_();
    };


    /**
     * Initializes instance of button
     * @private
     */
    UserInteraction.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            sm.gButton.ButtonStendhal.NAME,
            this.getView().getDom().button
        );
    };


    /**
     * Initializes listeners for button
     * @private
     */
    UserInteraction.prototype.initButtonListeners_ = function() {
        this.getHandler().listen(
            this.button_,
            cl.gButton.Button.Event.CLICK,
            this.onButtonClick_
        );
    };


    /**
     * Initializes listeners for view
     * @private
     */
    UserInteraction.prototype.initViewListeners_ = function() {
        this.viewListen(
            View.Event.CLICK,
            this.onClick_
        );
    };


    /**
     * Button Click handler
     * @param {goog.events.EventType} event
     * @private
     */
    UserInteraction.prototype.onButtonClick_ = function(event) {
        this.dispatchEvent(UserInteraction.Event.CLICK);
    };


    /**
     * Click handler
     * @param {goog.events.EventType} event
     * @private
     */
    UserInteraction.prototype.onClick_ = function(event) {
        var viewportSize = Viewport.getInstance().getSize();

        if (viewportSize <= Viewport.Size.S) {
            this.dispatchEvent(UserInteraction.Event.CLICK);
        }
    };
});  // goog.scope
