goog.provide('sm.lSearch.bFilter.ViewSwitch');

goog.require('sm.lSearch.bFilter.View');



/**
 * Filter Switch View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewSwitch = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewSwitch.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bFilter.ViewSwitch, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewSwitch,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_switch'
    };


    /**
     * Initializes options
     * @param {Element=} opt_element
     */
    View.prototype.initOptions = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.wrapOptionsHidable = goog.dom.getElementsByClass(
            View.CssClass.OPTION_HIDABLE,
            element
        );

        this.dom.options = goog.dom.getElementsByClass(
            sm.bSmRadioButton.View.CssClass.ROOT,
            element
        );
    };
});  // goog.scope
