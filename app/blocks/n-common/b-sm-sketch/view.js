goog.provide('sm.bSmSketch.View');

goog.require('cl.iControl.View');



/**
 * Sketch View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmSketch.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmSketch.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     *     button: Element
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSmSketch.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmSketch.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-sketch',
        BUTTON: 'b-sm-sketch__button-action'
    };


    /**
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        Sketch.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * @protected
     */
    View.prototype.decorateInternal = function() {
        this.dom = {
            button: this.getElementByClass(
                View.CssClass.BUTTON
            )
        };
    };
});  // goog.scope
