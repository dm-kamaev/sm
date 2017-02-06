goog.provide('sm.bSmSketch.SmSketch');

goog.require('cl.iControl.Control');
goog.require('sm.bSmSketch.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmSketch.SmSketch = function(view, opt_domHelper) {
    sm.bSmSketch.SmSketch.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.bSmSketch.SmSketch, cl.iControl.Control);


goog.scope(function() {
    var Sketch = sm.bSmSketch.SmSketch;
    var View = sm.bSmSketch.View;


    /**
     * @protected
     * @override
     */
    Sketch.prototype.decorateInternal = function(element) {
        Sketch.base(this, 'decorateInternal', element);

        this.decorateChild(
            'button',
            this.getView().getDom().button
        );
    };


    /**
     * @override
     * @protected
     */
    Sketch.prototype.enterDocument = function() {
        Sketch.base(this, 'enterDocument');
    };
});  // goog.scope
