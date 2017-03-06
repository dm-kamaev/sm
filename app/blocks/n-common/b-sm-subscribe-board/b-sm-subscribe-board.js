goog.provide('sm.bSmSubscribeBoard.SmSubscribeBoard');

goog.require('cl.iControl.Control');
goog.require('sm.bSmSubscribeBoard.View');
goog.require('sm.gInput.InputStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSubscribeBoard.SmSubscribeBoard = function(view, opt_domHelper) {
    sm.bSmSubscribeBoard.SmSubscribeBoard.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSmSubscribeBoard.SmSubscribeBoard, cl.iControl.Control);


goog.scope(function() {
    var SubscribeBoard = sm.bSmSubscribeBoard.SmSubscribeBoard,
        View = sm.bSmSubscribeBoard.View;


    /**
     * @override
     * @public
     */
    SubscribeBoard.prototype.enterDocument = function() {
        SubscribeBoard.base(this, 'enterDocument');

        this.viewListen(View.Event.SUBMIT, this.onSubmit_);
    };


    /**
     * @override
     * @protected
     */
    SubscribeBoard.prototype.decorateInternal = function(element) {
        SubscribeBoard.base(this, 'decorateInternal', element);

        this.initInputs_();
    };


    /**
     * @private
     */
    SubscribeBoard.prototype.initInputs_ = function() {
        this.decorateChild(
            'input',
            this.getView().getDom().emailInput
        );
    };


    /**
     * Submit handler
     * @private
     */
    SubscribeBoard.prototype.onSubmit_ = function() {
        console.log('test');
    };
});  // goog.scope
