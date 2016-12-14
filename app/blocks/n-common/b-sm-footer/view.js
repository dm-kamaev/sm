goog.provide('sm.bSmFooter.View');

goog.require('cl.iControl.View');



/**
 * Footer View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmFooter.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmFooter.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmFooter.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmFooter.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-footer'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };

    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            links: this.getElementsByClass(
                sm.bSmLink.View.CssClass.ROOT
            )
        };
    };
});  // goog.scope
