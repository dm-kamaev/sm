goog.provide('sm.gModal.ModalEnrollment');

goog.require('cl.iRequest.Request');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.object');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.ViewEnrollment');


goog.scope(function() {



    /**
     * Modal Enrollment block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {sm.gModal.ModalStendhal}
     */
    sm.gModal.ModalEnrollment = function(view, opt_domHelper) {
        sm.gModal.ModalEnrollment.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Instance input name
         * @type {sm.gInput.InputSthendal}
         * @private
         */
        this.nameField_ = null;


        /**
         * Instance input phone
         * @type {sm.gInput.InputPhone}
         * @private
         */
        this.phoneField_ = null;


        /**
         * Instance textarea comment
         * @type {sm.gTextarea.TextareaStendhal}
         * @private
         */
        this.commentField_ = null;


        /**
         * Selected options data of user
         * @type {sm.lCourse.bDepartment.Event.EnrollButtonClick.Data}
         * @private
         */
        this.optionsData_ = {};


        /**
         * Instance button
         * @type {sm.gButton.ButtonStendhal}
         * @private
         */
        this.button_ = null;
    };
    goog.inherits(sm.gModal.ModalEnrollment, sm.gModal.ModalStendhal);
    var ModalEnrollment = sm.gModal.ModalEnrollment,
        View = sm.gModal.ViewEnrollment,
        Request = cl.iRequest.Request;


    /**
     * Events enum
     * @enum {string}
     * @const
     */
    ModalEnrollment.Event = {
        SUCCESS: goog.events.getUniqueId('success'),
        ERROR: goog.events.getUniqueId('error')
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    ModalEnrollment.prototype.decorateInternal = function(element) {
        ModalEnrollment.base(this, 'decorateInternal', element);

        this.initFields_();
        this.initButton_();
    };


    /**
     * @protected
     * @override
     */
    ModalEnrollment.prototype.enterDocument = function() {
        ModalEnrollment.base(this, 'enterDocument');

        this.initButtonListeners_();
    };


    /**
     * Clear all fields
     * @public
     */
    ModalEnrollment.prototype.clear = function() {
        this.nameField_.clear();
        this.phoneField_.clear();
        this.commentField_.clean();

        this.button_.enable();
    };


    /**
     * Set selected options data of user
     * @param {Object} optionsData
     * @public
     */
    ModalEnrollment.prototype.setOptionsData = function(optionsData) {
        this.optionsData_ = optionsData ? optionsData : {};
    };


    /**
     * Initializes listeners for button
     * @private
     */
    ModalEnrollment.prototype.initButtonListeners_ = function() {
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
    ModalEnrollment.prototype.onButtonClick_ = function() {
        if (this.isValidFields_()) {
            this.button_.disable();
            this.sendRequest_();
        }
    };


    /**
     * Return true if all fields is valid else return false
     * @return {boolean}
     * @private
     */
    ModalEnrollment.prototype.isValidFields_ = function() {
        var isValidName = this.nameField_.validate(),
            isValidPhone = this.phoneField_.validate();

        return isValidName && isValidPhone;
    };


    /**
     * Send data on api
     * @private
     */
    ModalEnrollment.prototype.sendRequest_ = function() {
        var data = this.buildRequestData_();

        Request.getInstance().send(data)
            .then(
                this.onSuccess_.bind(this),
                this.onError_.bind(this)
            );

        this.setOptionsData(null);
    };


    /**
     * Handler of server response success
     * @private
     */
    ModalEnrollment.prototype.onSuccess_ = function() {
        this.hide();

        this.clear();
        this.dispatchEventSuccess_();
    };


    /**
     * Handler of server response error
     * @param {{
     *     data: Array<{
     *         message: {Object}
     *     }>
     * }} error
     * @private
     */
    ModalEnrollment.prototype.onError_ = function(error) {
        var errorData = JSON.parse(error.data),
            messages = this.transformErrorMessages_(errorData);

        this.button_.enable();
        this.getView().showErrors(messages);
        this.dispatchEventError_();
    };


    /**
     * Transform data for getting error messages
     * @param {Array<{
     *     message: {Object}
     * }>} errorData
     * @return {Array<string>}
     * @private
     */
    ModalEnrollment.prototype.transformErrorMessages_ = function(errorData) {
        var errorMessages = [];

        errorData.forEach(function(data) {
            for (field in data.message) {
                errorMessages.push(data.message[field]);
            }
        });
        return errorMessages;
    };


    /**
     * Build and get data for request
     * @return {Object}
     * @private
     */
    ModalEnrollment.prototype.buildRequestData_ = function() {
        return {
            url: this.buildApiAddress_(),
            type: 'POST',
            data: this.buildQueryParams_(),
            isJSON: true
        };
    };


    /**
     * Build and get Api Address
     * @return {string}
     * @private
     */
    ModalEnrollment.prototype.buildApiAddress_ = function() {
        return '/api/' + this.params.entityType + '/enrollment';
    };



    /**
     * Build and get data body for request
     * @return {Object}
     * @private
     */
    ModalEnrollment.prototype.buildQueryParams_ = function() {
        return {
            '_csrf': window['ctx']['csrf'],
            'name': this.nameField_.getValue(),
            'phone': this.phoneField_.getValue(),
            'comment': this.commentField_.getValue(),
            'link': window.location.href,
            'department': this.optionsData_
        };
    };


    /**
     * Dispatch Event of successfull enrollment
     * @private
     */
    ModalEnrollment.prototype.dispatchEventSuccess_ = function() {
        this.dispatchEvent({
            'type': ModalEnrollment.Event.SUCCESS
        });
    };


    /**
     * Dispatch Event of unsuccessfull enrollment
     * @private
     */
    ModalEnrollment.prototype.dispatchEventError_ = function() {
        this.dispatchEvent({
            'type': ModalEnrollment.Event.ERROR
        });
    };


    /**
     * Initializes instance of fields to enter user data
     * @private
     */
    ModalEnrollment.prototype.initFields_ = function() {
        this.nameField_ = this.decorateChild(
            'input',
            this.getView().getDom().nameField
        );

        this.phoneField_ = this.decorateChild(
            'phone-input',
            this.getView().getDom().phoneField
        );

        this.commentField_ = this.decorateChild(
            'textarea',
            this.getView().getDom().commentField
        );
    };


    /**
     * Initializes instance of button
     * @private
     */
    ModalEnrollment.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            'button',
            this.getView().getDom().button
        );
    };
});  // goog.scope
