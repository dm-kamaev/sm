goog.provide('sm.bSmCollapsedText.SmCollapsedText');

goog.require('cl.iControl.Control');
goog.require('sm.bSmCollapsedText.View');

goog.scope(function() {



    /**
     * Constructor
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmCollapsedText.SmCollapsedText = function(view, opt_domHelper) {
    sm.bSmCollapsedText.SmCollapsedText.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(sm.bSmCollapsedText.SmCollapsedText, cl.iControl.Control);


    var CollapsedText = sm.bSmCollapsedText.SmCollapsedText,
        View = sm.bSmCollapsedText.View;
});  // goog.scope
