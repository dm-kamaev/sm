goog.provide('sm.bSmRange.SmRange');

goog.require('cl.iControl.Control');
goog.require('sm.bSmRange.Template');
goog.require('sm.bSmRange.View');
goog.require('sm.iCloblFactory.FactoryStendhal');


goog.scope(function() {
    var View = sm.bSmRange.View;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmRange.SmRange = function(view, opt_domHelper) {
        sm.bSmRange.SmRange.base(this, 'constructor', view, opt_domHelper);


        /**
         * @type {sm.bSmRange.View.Params}
         * @override
         * @protected
         */
        this.params = view.getParams() || {};
    };
    goog.inherits(sm.bSmRange.SmRange, cl.iControl.Control);
    var Range = sm.bSmRange.SmRange;

    /**
     * Name of this element in factory
     */
    Range.NAME = sm.bSmRange.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Range.NAME, {
        control: Range,
        view: View
    });


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    Range.Event = {
        CHANGE: View.Event.CHANGE
    };


    /**
     * @protected
     * @override
     */
    Range.prototype.decorateInternal = function(element) {
        Range.base(this, 'decorateInternal', element);

    };


    /**
     * @override
     * @protected
     */
    Range.prototype.enterDocument = function() {
        Range.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Initializes listeners for view
     * @private
     */
    Range.prototype.initViewListeners_ = function() {
        this.autoDispatch(View.Event.CHANGE);
    };
});  // goog.scope
