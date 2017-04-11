goog.provide('sm.bSmSketch.SmSketch');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');
goog.require('sm.bSmSketch.Template');
goog.require('sm.bSmSketch.View');
goog.require('sm.iCloblFactory.FactoryStendhal');



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
    var Sketch = sm.bSmSketch.SmSketch,
        View = sm.bSmSketch.View;

    /**
     * Name of this element in factory
     */
    Sketch.NAME = sm.bSmSketch.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Sketch.NAME, {
        control: Sketch,
        view: View
    });


    /**
     * Event enum
     * @enum {string}
     */
    Sketch.Event = {
        'BUTTON_CLICK': cl.gButton.Button.Event.CLICK
    };


    /**
     * @protected
     * @override
     */
    Sketch.prototype.decorateInternal = function(element) {
        Sketch.base(this, 'decorateInternal', element);

        this.decorateChild(
            cl.gButton.Button.NAME,
            this.getView().getDom().button
        );
    };
});  // goog.scope
