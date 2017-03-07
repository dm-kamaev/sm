goog.provide('sm.bSmSubscribeBoard.SmSubscribeBoard');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sm.bSmSubscribeBoard.View');
goog.require('sm.gInput.InputStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSubscribeBoard.SmSubscribeBoard = function(view, opt_domHelper) {
    sm.bSmSubscribeBoard.SmSubscribeBoard.base(
        this, 'constructor', view, opt_domHelper
    );

    /**
     * iRequest instance
     * @type {cl.iRequest.Request}
     * @private
     */
    this.request_ = null;


    /**
     * Input instance
     * @type {sm.gInput.InputStendhal}
     * @private
     */
    this.input_ = null;
};
goog.inherits(sm.bSmSubscribeBoard.SmSubscribeBoard, cl.iControl.Control);


goog.scope(function() {
    var SubscribeBoard = sm.bSmSubscribeBoard.SmSubscribeBoard,
        View = sm.bSmSubscribeBoard.View,
        Request = cl.iRequest.Request;


    /**
     * @override
     * @public
     */
    SubscribeBoard.prototype.enterDocument = function() {
        SubscribeBoard.base(this, 'enterDocument');

        this.initInputsListeners_();
    };


    /**
     * @override
     * @protected
     */
    SubscribeBoard.prototype.decorateInternal = function(element) {
        SubscribeBoard.base(this, 'decorateInternal', element);

        this.initInputs_();
        this.initRequest_();
    };


    /**
     * @private
     */
    SubscribeBoard.prototype.initInputs_ = function() {
        this.input_ = this.decorateChild(
            'input',
            this.getView().getDom().emailInput
        );
    };

    /**
     * @private
     */
    SubscribeBoard.prototype.initRequest_ = function() {
        this.request_ = Request.getInstance();
    };


    /**
     * @private
     */
    SubscribeBoard.prototype.initInputsListeners_ = function() {
        this.viewListen(View.Event.SUBMIT, this.onSubmit_);

        this.getHandler().listen(
            this.input_,
            sm.gInput.InputStendhal.Event.ENTER_PRESS,
            this.onSubmit_
        );
    };


    /**
     * Submit handler
     * @private
     */
    SubscribeBoard.prototype.onSubmit_ = function() {
        if (this.isValid_()) {
            this.sendData_();
        }
    };


    /**
     * Is inputs is valid
     * @private
     * @return {boolean}
     */
    SubscribeBoard.prototype.isValid_ = function() {
        return this.input_.validate();
    };


    /**
     * Send data to server
     * @private
     */
    SubscribeBoard.prototype.sendData_ = function() {
        var data = this.buildRequestData_();
        console.log(data);
        this.request_
            .send(data)
            .then(
                this.onSuccess_.bind(this),
                this.onError_.bind(this)
            );
    };


    /**
     * Build and get data for request
     * @return {Object}
     * @private
     */
    SubscribeBoard.prototype.buildRequestData_ = function() {
        return {
            /*'_csrf': window['ctx']['csrf'],*/
            'url': this.buildApiAddress_(),
            'type': 'POST',
            'data': this.buildQueryParams_(),
            'isJSON': true
        };
    };


    /**
     * Build and get Api Address
     * @return {string}
     * @private
     */
    SubscribeBoard.prototype.buildApiAddress_ = function() {
        return '/' + this.params.entityType + '/subscribe';
    };


    /**
     * Build and get data body for request
     * @return {Object}
     * @private
     */
    SubscribeBoard.prototype.buildQueryParams_ = function() {
        return {
            'email': this.input_.getValue(),
            'id': this.params.entityId
        };
    };


    /**
     * Handler of server response success
     * @param {{
     * }} response
     * @private
     */
    SubscribeBoard.prototype.onSuccess_ = function(response) {
        console.log('response', response);
    };


    /**
     * Handler of server response error
     * @param {{
     * }} error
     * @private
     */
    SubscribeBoard.prototype.onError_ = function(error) {
        console.log('error', error);
    };
});  // goog.scope
