goog.provide('sm.bSummaryBoard.SummaryBoard');

goog.require('cl.iControl.Control');



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
    var SummaryBoard = sm.bSummaryBoard.SummaryBoard;


    /**
     * @protected
     * @override
     */
    SummaryBoard.prototype.decorateInternal = function(element) {
        SummaryBoard.base(this, 'decorateInternal', element);
        var dom = this.getView().getDom();

        this.decorateChild(
            'button-link',
            dom.link
        );
    };


    /**
     * @override
     * @protected
     */
    SummaryBoard.prototype.enterDocument = function() {
        SummaryBoard.base(this, 'enterDocument');
    };
});  // goog.scope
