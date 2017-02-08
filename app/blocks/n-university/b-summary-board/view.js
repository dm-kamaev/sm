goog.provide('sm.bSummaryBoard.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');



/**
 * SummaryBoard View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSummaryBoard.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSummaryBoard.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSummaryBoard.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSummaryBoard.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-summary-board',
        LINK: 'b-summary-board__button-link'
    };


    /**
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom = {
            link: this.getElementByClass(
                View.CssClass.LINK
            )
        };
    };
});  // goog.scope
