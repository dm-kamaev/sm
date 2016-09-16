goog.provide('sm.bSmLink.SmLink');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.View');


goog.scope(function() {
    var View = sm.bSmLink.View;



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
    var Link = sm.bSmLink.SmLink;


    /**
     * @typedef {sm.bSmLink.View.RenderParams}
     */
    sm.bSmLink.SmLink.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number, Object)>} rawParams
     * @return {sm.bSmLink.SmLink.RenderParams}
     */
    Link.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };
});  // goog.scope
