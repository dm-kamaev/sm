goog.provide('sm.bSummaryBoard.SummaryBoard');

goog.require('cl.iControl.Control');
goog.require('sm.bSummaryBoard.Template');
goog.require('sm.bSummaryBoard.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSummaryBoard.SummaryBoard = function(view, opt_domHelper) {
    sm.bSummaryBoard.SummaryBoard.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSummaryBoard.SummaryBoard, cl.iControl.Control);


goog.scope(function() {
    var SummaryBoard = sm.bSummaryBoard.SummaryBoard,
        View = sm.bSummaryBoard.View;

    /**
     * Name of this element in factory
     */
    SummaryBoard.NAME = sm.bSummaryBoard.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(SummaryBoard.NAME, {
        control: SummaryBoard,
        view: View
    });


    /**
     * Event enum
     * @enum {string}
     */
    SummaryBoard.Event = {
        LINK_CLICK: View.Event.LINK_CLICK
    };


    /**
     * @override
     */
    SummaryBoard.prototype.enterDocument = function() {
        SummaryBoard.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Initializes listeners for view
     * @private
     */
    SummaryBoard.prototype.initViewListeners_ = function() {
        this.autoDispatch(SummaryBoard.Event.LINK_CLICK);
    };
});  // goog.scope
