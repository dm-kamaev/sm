goog.provide('sm.bSmTabSelect.SmTabSelect');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmTabSelect.Template');
goog.require('sm.bSmTabSelect.View');



/**
 *
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmTabSelect.SmTabSelect = function(view, opt_params, opt_domHelper) {
    sm.bSmTabSelect.SmTabSelect.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * Instance list
     * @type {Array<sm.bSmLink.SmLink>}
     * @protected
     */
    this.items = [];

};
goog.inherits(sm.bSmTabSelect.SmTabSelect, cl.iControl.Control);


goog.scope(function() {
    var Tab = sm.bSmTabSelect.SmTabSelect,
        View = sm.bSmTabSelect.View;

    /**
     * Event enum
     * @enum {string}
     */
    Tab.Event = {
        ITEM_SELECT: View.Event.ITEM_SELECT
    };


    /**
     * @param {Element} element
     * @override
     */
    Tab.prototype.decorateInternal = function(element) {
        Tab.base(this, 'decorateInternal', element);
        var links = this.getView().getDom().links;

        for (var i = 0; i < links.length; i++)
        {
            this.items[i] = this.decorateChild(
                'smLink',
                links[i]
            );
        }
    };


    /**
     * @override
     */
    Tab.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.autoDispatch(Tab.Event.ITEM_SELECT);
    };

});  // goog.scope
