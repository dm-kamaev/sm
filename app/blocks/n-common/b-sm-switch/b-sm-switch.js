goog.provide('sm.bSmSwitch.SmSwitch');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmSwitch.Template');
goog.require('sm.bSmSwitch.View');



/**
 *
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSwitch.SmSwitch = function(view, opt_params, opt_domHelper) {
    sm.bSmSwitch.SmSwitch.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * Instance list
     * @type {Array<sm.bSmLink.SmLink>}
     * @protected
     */
    this.items = [];

};
goog.inherits(sm.bSmSwitch.SmSwitch, cl.iControl.Control);


goog.scope(function() {
    var Switch = sm.bSmSwitch.SmSwitch,
        View = sm.bSmSwitch.View;

    /**
     * Event enum
     * @enum {string}
     */
    Switch.Event = {
        ITEM_SELECT: View.Event.ITEM_SELECT
    };


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Switch.prototype.decorateInternal = function(element) {
        Switch.base(this, 'decorateInternal', element);

        var links = this.getView().getDom().links;
        this.items = this.decorateChildren('smLink', links);
    };


    /**
     * @override
     * @public
     */
    Switch.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.autoDispatch(Switch.Event.ITEM_SELECT);
    };

});  // goog.scope
