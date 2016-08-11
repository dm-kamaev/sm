goog.provide('sm.lSearch.bFilter.Filter');

goog.require('cl.iControl.Control');
goog.require('sm.lSearch.bFilter.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSearch.bFilter.Filter = function(view, opt_domHelper) {
    sm.lSearch.bFilter.Filter.base(this, 'constructor',
        view, opt_domHelper);
};
goog.inherits(sm.lSearch.bFilter.Filter, cl.iControl.Control);


goog.scope(function() {
    var Filter = sm.lSearch.bFilter.Filter,
        View = sm.lSearch.bFilter.View;


    /**
     * Event enum
     * @enum {string}
     */
    Filter.Event = {
    };


    /**
     * @override
     * @param {Element} element
     */
    Filter.prototype.decorateInternal = function(element) {
        Filter.base(this, 'decorateInternal', element);
    };


    /**
     * @override
     */
    Filter.prototype.enterDocument = function() {
        Filter.base(this, 'enterDocument');
    };
});  // goog.scope
