goog.provide('sm.bSmSubscribeBoard.View');

goog.require('cl.iControl.View');
goog.require('goog.events.EventType');
goog.require('sm.bSmLink.View');



/**
 * Subscribe Board View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmSubscribeBoard.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmSubscribeBoard.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {{
     *     emailInput: sm.gInput.InputStendhal
     * }}
     */
    this.dom = null;
};
goog.inherits(sm.bSmSubscribeBoard.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmSubscribeBoard.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-subscribe-board',
        EMAIL_INPUT: 'b-sm-subscribe-board__email-input',
        SUBMIT_BUTTON: 'b-sm-subscribe-board__input-icon'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        SUBMIT: goog.events.getUniqueId('submit')
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initSubmitListeners_();
    };


    /**
     * Dom initialization
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom = {
            emailInput: this.getElementByClass(
                View.CssClass.EMAIL_INPUT
            ),
            submitButton: this.getElementByClass(
                View.CssClass.SUBMIT_BUTTON
            )
        };
    };


    /**
     * Return data-params from dom element
     * @return {Object}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var dataParams = View.base(this, 'getParams');
        return this.transformParams(dataParams);
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            entityId: rawParams['entityId'],
            entityType: rawParams['entityType']
        };
    };


    /**
     * Init submit listeners
     * @private
     */
    View.prototype.initSubmitListeners_ = function() {
        this.getHandler().listen(
            this.dom.submitButton,
            goog.events.EventType.CLICK,
            this.onSubmit_
        );
    };


    /**
     * Submit
     * @private
     */
    View.prototype.onSubmit_ = function() {
        this.dispatchEvent(View.Event.SUBMIT);
    };
});  // goog.scope
