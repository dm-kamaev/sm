/**
 * @fileoverview Base score block
 */

goog.provide('sm.bSmScore.SmScore');

goog.require('cl.iControl.Control');

goog.scope(function() {



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
});  // goog.scope
