goog.provide('sm.lSearch.bFilter.ViewSwitchLabels');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('sm.lSearch.bFilter.ViewSwitch');



/**
 * Filter View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.ViewSwitch}
 */
sm.lSearch.bFilter.ViewSwitchLabels = function(opt_params, opt_type,
    opt_modifier) {

    sm.lSearch.bFilter.ViewSwitchLabels.base(this, 'constructor',
        opt_params, opt_type, opt_modifier);
};
goog.inherits(
    sm.lSearch.bFilter.ViewSwitchLabels,
    sm.lSearch.bFilter.ViewSwitch
);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewSwitchLabels;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_switch-labels'
    };
});  // goog.scope
