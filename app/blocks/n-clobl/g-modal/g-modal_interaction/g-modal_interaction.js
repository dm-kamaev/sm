goog.provide('sm.gModal.ModalInteraction');

goog.require('cl.gButton.Button');
goog.require('cl.iRequest.Request');
goog.require('sm.bSmInteractionForm.SmInteractionForm');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.TemplateInteraction');
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
     * Name of this element in factory
     */
    ModalInteraction.NAME = sm.gModal.TemplateInteraction.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        ModalInteraction.NAME,
        {
            control: ModalInteraction,
            view: View
        }
    );


    /**
     * Show error messages
     * @param {Array<string>} messages
     * @public
     */
    ModalInteraction.prototype.showErrors = function(messages) {
        this.getView().showErrors(messages);
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
        if (this.content_.validate()) {
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
        location.reload();
    };


    /**
     * Handler of server response error
     * @param {{
     *     data: Array<{
     *         message: string,
     *         code: string
     *     }>
     * }} errors
     * @private
     */
    ModalInteraction.prototype.onError_ = function(errors) {
        var errorMessages = errors.data.map(function(error) {
            return error.message;
        });

        this.showErrors(errorMessages);
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
     * @return {Object}
     * @private
     */
    ModalInteraction.prototype.buildQueryParams_ = function() {
        var queryParams = {
            '_csrf': window['ctx']['csrf'],
            'id': this.params.id
        };

        goog.object.extend(
            queryParams,
            this.content_.getData()
        );

        return queryParams;
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
