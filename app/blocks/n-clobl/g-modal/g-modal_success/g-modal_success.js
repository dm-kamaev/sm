goog.provide('sm.gModal.ModalSuccess');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.object');
goog.require('sm.gButton.ButtonStendhal');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.TemplateSuccess');
goog.require('sm.gModal.ViewSuccess');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');


goog.scope(function() {



    /**
     * Modal Success block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {sm.gModal.ModalStendhal}
     */
    sm.gModal.ModalSuccess = function(view, opt_domHelper) {
        sm.gModal.ModalSuccess.base(
            this, 'constructor', view, opt_domHelper
        );


        /**
         * Instance button
         * @type {sm.gButton.ButtonStendhal}
         * @private
         */
        this.button_ = null;
    };
    goog.inherits(sm.gModal.ModalSuccess, sm.gModal.ModalStendhal);
    var ModalSuccess = sm.gModal.ModalSuccess,
        View = sm.gModal.ViewSuccess;

    /**
     * Name of this element in factory
     */
    ModalSuccess.NAME = sm.gModal.TemplateSuccess.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(ModalSuccess.NAME, {
        control: ModalSuccess,
        view: View
    });

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    ModalSuccess.prototype.decorateInternal = function(element) {
        ModalSuccess.base(this, 'decorateInternal', element);

        this.initButton_();
    };


    /**
     * @protected
     * @override
     */
    ModalSuccess.prototype.enterDocument = function() {
        ModalSuccess.base(this, 'enterDocument');

        this.initButtonListeners_();
    };


    /**
     * Initializes listeners for button
     * @private
     */
    ModalSuccess.prototype.initButtonListeners_ = function() {
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
    ModalSuccess.prototype.onButtonClick_ = function() {
        this.hide();
    };


    /**
     * Initializes instance of button
     * @private
     */
    ModalSuccess.prototype.initButton_ = function() {
        this.button_ = this.decorateChild(
            sm.gButton.ButtonStendhal.NAME,
            this.getView().getDom().button
        );
    };
});  // goog.scope
