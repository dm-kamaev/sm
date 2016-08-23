goog.provide('sm.lSearch.bLabel.Label');

goog.require('cl.iControl.Control');
goog.require('sm.lSearch.bLabel.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearch.bLabel.Label = function(view, opt_domHelper) {
    sm.lSearch.bLabel.Label.base(this, 'constructor',
        view, opt_domHelper);


    /**
     * Instance checkbox
     * @type {sm.bSmCheckbox.SmCheckbox}
     * @private
     */
    this.checkbox_ = null;
};
goog.inherits(sm.lSearch.bLabel.Label, cl.iControl.Control);


goog.scope(function() {
    var Label = sm.lSearch.bLabel.Label,
        View = sm.lSearch.bLabel.View;


    /**
     * Event enum
     * @enum {string}
     */
    Label.Event = {
        REMOVE_CLICK: View.Event.REMOVE_CLICK
    };


    /**
     * @param {Element} element
     * @override
     */
    Label.prototype.decorateInternal = function(element) {
        Label.base(this, 'decorateInternal', element);

        this.initCheckbox_();
    };


    /**
     * @override
     */
    Label.prototype.enterDocument = function() {
        Label.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Get data
     * @return {sm.bSmCheckbox.SmCheckbox.Params}
     */
    Label.prototype.getData = function() {
        return this.checkbox_.getData();
    };


    /**
     * Initializes listeners for view
     * @private
     */
    Label.prototype.initViewListeners_ = function() {
        this.autoDispatch(
            View.Event.REMOVE_CLICK
        );
    };


    /**
     * Initializes checkbox
     * @private
     */
    Label.prototype.initCheckbox_ = function() {
        this.checkbox_ = this.decorateChild(
            'smCheckbox',
            this.getView().getDom().checkbox
        );
    };
});  // goog.scope
