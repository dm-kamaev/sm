goog.provide('sm.bSmLink.SmLink');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.View');


goog.scope(function() {



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmLink.SmLink = function(view, opt_domHelper) {
        sm.bSmLink.SmLink.base(this, 'constructor', view, opt_domHelper);
    };
    goog.inherits(sm.bSmLink.SmLink, cl.iControl.Control);
});  // goog.scope
