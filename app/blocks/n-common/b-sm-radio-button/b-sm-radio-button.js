goog.provide('sm.bSmRadioButton.SmRadioButton');

goog.require('cl.iControl.Control');
goog.require('sm.bSmRadioButton.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmRadioButton.SmRadioButton = function(view, opt_domHelper) {
    sm.bSmRadioButton.SmRadioButton.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * Parameters
     * @type {sm.bSmRadioButton.SmRadioButton.Params}
     * @override
     **/
    this.params = view.getParams() || {};
};
goog.inherits(sm.bSmRadioButton.SmRadioButton, cl.iControl.Control);


goog.scope(function() {
    var RadioButton = sm.bSmRadioButton.SmRadioButton,
        View = sm.bSmRadioButton.View;


    /**
     * Event enum
     * @enum {string}
     */
    RadioButton.Event = {
        'CHECK': goog.events.getUniqueId('check'),
        'UNCHECK': goog.events.getUniqueId('uncheck')
    };


    /**
     * @typedef {sm.bSmRadioButton.View.Params}
     */
    sm.bSmRadioButton.SmRadioButton.Params;


    /**
     * @param {Element} element
     * @override
     */
    RadioButton.prototype.decorateInternal = function(element) {
        RadioButton.base(this, 'decorateInternal', element);
    };


    /**
     * @override
     */
    RadioButton.prototype.enterDocument = function() {
        RadioButton.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Set checked true
     */
    RadioButton.prototype.check = function() {
        this.getView().check();
    };


    /**
     * Set checked false
     */
    RadioButton.prototype.uncheck = function() {
        this.getView().uncheck();
    };


    /**
     * Check marked Radio button
     * @return {boolean}
     */
    RadioButton.prototype.isChecked = function() {
        return this.getView().isChecked();
    };


    /**
     * Get data
     * @return {sm.bSmRadioButton.SmRadioButton.Params}
     */
    RadioButton.prototype.getData = function() {
        var data = this.params;
        this.params.isChecked = this.isChecked();

        return data;
    };


    /**
     * Initializes listeners for view
     * @private
     */
    RadioButton.prototype.initViewListeners_ = function() {
        this.viewListen(
            View.Event.INPUT_CLICK,
            this.onInputClick_
        );
    };


    /**
     * Input handler
     * @private
     */
    RadioButton.prototype.onInputClick_ = function() {
        var type = this.isChecked() ?
            RadioButton.Event.CHECK :
            RadioButton.Event.UNCHECK;

        this.dispatchEvent({
            'type': type
        });
    };
});  // goog.scope
