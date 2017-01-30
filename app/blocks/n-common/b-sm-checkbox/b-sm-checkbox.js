goog.provide('sm.bSmCheckbox.SmCheckbox');

goog.require('cl.iControl.Control');
goog.require('sm.bSmCheckbox.Template');
goog.require('sm.bSmCheckbox.View');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmCheckbox.SmCheckbox = function(view, opt_domHelper) {
    sm.bSmCheckbox.SmCheckbox.base(this, 'constructor',
        view, opt_domHelper);

    /**
     * Parameters
     * @type {sm.bSmCheckbox.SmCheckbox.Params}
     * @override
     **/
    this.params = view.getParams() || {};
};
goog.inherits(sm.bSmCheckbox.SmCheckbox, cl.iControl.Control);


goog.scope(function() {
    var Checkbox = sm.bSmCheckbox.SmCheckbox,
        View = sm.bSmCheckbox.View;

    /**
     * Name of this element in factory
     */
    Checkbox.NAME = sm.bSmCheckbox.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Checkbox.NAME, {
        control: Checkbox,
        view: View
    });


    /**
     * Event enum
     * @enum {string}
     */
    Checkbox.Event = {
        'CHECK': goog.events.getUniqueId('check'),
        'UNCHECK': goog.events.getUniqueId('uncheck')
    };


    /**
     * @typedef {sm.bSmCheckbox.View.Params}
     */
    sm.bSmCheckbox.SmCheckbox.Params;


    /**
     * @param {Element} element
     * @override
     */
    Checkbox.prototype.decorateInternal = function(element) {
        Checkbox.base(this, 'decorateInternal', element);
    };


    /**
     * @override
     */
    Checkbox.prototype.enterDocument = function() {
        Checkbox.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Set checked true
     */
    Checkbox.prototype.check = function() {
        this.getView().check();
    };


    /**
     * Set checked false
     */
    Checkbox.prototype.uncheck = function() {
        this.getView().uncheck();
    };


    /**
     * Check marked checkbox
     * @return {boolean}
     */
    Checkbox.prototype.isChecked = function() {
        return this.getView().isChecked();
    };


    /**
     * Get data
     * @return {sm.bSmCheckbox.SmCheckbox.Params}
     */
    Checkbox.prototype.getData = function() {
        var data = this.params;
        this.params.isChecked = this.isChecked();

        return data;
    };


    /**
     * Initializes listeners for view
     * @private
     */
    Checkbox.prototype.initViewListeners_ = function() {
        this.viewListen(
            View.Event.INPUT_CLICK,
            this.onInputClick_
        );
    };


    /**
     * Input handler
     * @private
     */
    Checkbox.prototype.onInputClick_ = function() {
        var type = this.isChecked() ?
            Checkbox.Event.CHECK :
            Checkbox.Event.UNCHECK;

        this.dispatchEvent({
            'type': type
        });
    };
});  // goog.scope
