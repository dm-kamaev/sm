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
});  // goog.scope
