goog.provide('sm.lSearch.bFilter.ViewRange');

goog.require('sm.lSearch.bFilter.View');



/**
 * Filter range View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewRange = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewRange.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bFilter.ViewRange, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewRange,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_range'
    };


    /**
     * Initializes options
     * @param {Element=} opt_element
     */
    View.prototype.initOptions = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.options = this.getElementsByClass(
            sm.bSmInputRange.View.CssClass.ROOT
        );
    };


    /**
     * Initializes buttons
     * @param {Element} element
     * @override
     */
    View.prototype.initButtons = function(element) {
    };


    /**
     * Initializes listeners for buttons
     * @override
     */
    View.prototype.initButtonsListeners = function() {
    };
});  // goog.scope
