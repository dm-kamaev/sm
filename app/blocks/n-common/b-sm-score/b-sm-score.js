/**
 * @fileoverview Base score block
 */

goog.provide('sm.bSmScore.SmScore');

goog.require('cl.iControl.Control');
goog.require('sm.bSmScore.View');

goog.scope(function() {
    var View = sm.bSmScore.View;



    /**
     * Score block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmScore.SmScore = function(view, opt_domHelper) {
        sm.bSmScore.SmScore.base(
            this, 'constructor', view, opt_domHelper
        );

        this.setSupportedState(goog.ui.Component.State.ALL, false);
    };
    goog.inherits(sm.bSmScore.SmScore, cl.iControl.Control);
    var Score = sm.bSmScore.SmScore;


    /**
     * @typedef {sm.bSmScore.View.RenderParams}
     */
    sm.bSmScore.SmScore.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, Object>} rawParams
     * @return {sm.bSmScore.View.RenderParams}
     */
    Score.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };
});  // goog.scope
