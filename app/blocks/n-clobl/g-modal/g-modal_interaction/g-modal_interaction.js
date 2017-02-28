goog.provide('sm.gModal.ModalInteraction');

goog.require('cl.gButton.Button');
goog.require('cl.iRequest.Request');
goog.require('sm.bSmInteractionForm.SmInteractionForm');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.ViewInteraction');


goog.scope(function() {



    /**
     * Modal Interaction
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {sm.gModal.ModalStendhal}
     */
    sm.gModal.ModalInteraction = function(view, opt_domHelper) {
        sm.gModal.ModalInteraction.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Instance content
         * @type {sm.bSmInteractionForm.SmInteractionForm}
         * @private
         */
        this.content_ = null;


        /**
         * Instance button
         * @type {cl.gButton.Button}
         * @private
         */
        this.button_ = null;
    };
    goog.inherits(sm.gModal.ModalInteraction, sm.gModal.ModalStendhal);
    var ModalInteraction = sm.gModal.ModalInteraction,
        View = sm.gModal.ViewInteraction,
        Request = cl.iRequest.Request;


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    ModalInteraction.prototype.decorateInternal = function(element) {
        ModalInteraction.base(this, 'decorateInternal', element);

        this.initContent_();
        this.initButton_();
    };


    /**
     * @protected
     * @override
     */
    ModalInteraction.prototype.enterDocument = function() {
        ModalInteraction.base(this, 'enterDocument');

        this.initButtonListeners_();
    };


    /**
     * Show error message
     * @param {string} errorMessage
     * @public
     */
    ModalInteraction.prototype.showError = function(errorMessage) {
        this.getView().showError(errorMessage);
    };


    /**
     * Hide error message
     * @public
     */
    ModalInteraction.prototype.hideError = function() {
        this.getView().hideError();
    };


    /**
     * Initializes listeners for button
     * @private
     */
    ModalInteraction.prototype.initButtonListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.button_,
            cl.gButton.Button.Event.CLICK,
            this.onButtonClick_
        );
    };


    /**
     * Button handler
     * @private
     */
    ModalInteraction.prototype.onButtonClick_ = function() {
        if (this.content_.validate) {
            this.sendRequest_();
        }
    };


    /**
     * Send data on api
     * @private
     */
    ModalInteraction.prototype.sendRequest_ = function() {
        var data = this.buildRequestData_();

        Request.getInstance().send(data).then(
            this.onSuccess_.bind(this),
            this.onError_.bind(this)
        );
    };


    /**
     * Handler of server response success
     * @param {Object} response
     * @private
     */
    ModalInteraction.prototype.onSuccess_ = function(response) {
        this.hide();
        this.content_.clear();
    };


    /**
     * Handler of server response error
     * @param {{
     *     data: {
     *         message: string
     *     }
     * }} error
     * @private
     */
    ModalInteraction.prototype.onError_ = function(error) {
        var errorData = JSON.parse(error.data);

        this.getView().showErrors(message);
    };


    /**
     * Build and get data for request
     * @return {Object}
     * @private
     */
    ModalInteraction.prototype.buildRequestData_ = function() {
        return {
            url: this.params.api,
            type: 'POST',
            data: this.buildQueryParams_(),
            isJSON: true
        };
    };


    /**
     * Build query params
     * @return {string}
     * @private
     */
    ModalInteraction.prototype.buildQueryParams_ = function() {
        var notNullParams = goog.object.filter(
            this.content_.getData(),
            this.isNotEmptyParameter_
        );

        var defaultParams = {
            '_csrf': window['ctx']['csrf']
        };

        goog.object.extend(
            notNullParams,
            defaultParams
        );

        return notNullParams;
    };


    /**
     * Check whether parameter is not empty
     * @param {string|number|Array} parameter
     * @return {boolean}
     * @private
     */
    ModalInteraction.prototype.isNotEmptyParameter_ = function(parameter) {
        return goog.isDefAndNotNull(parameter) && parameter !== '';
    };


    /**
     * Initializes instance of content
     * @private
     */
    ModalInteraction.prototype.initContent_ = function() {
        this.content_ = this.decorateChild(
            this.params.contentName,
            this.getView().getDom().content
        );
    };


    /**
     * Initializes instance of button
     * @private
     */
    ModalInteraction.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            'button',
            this.getView().getDom().button
        );
    };
});  // goog.scope
