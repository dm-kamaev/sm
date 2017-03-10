goog.provide('sm.bSmCollapsedText.SmCollapsedText');

goog.require('cl.iControl.Control');
goog.require('sm.bSmCollapsedText.Template');
goog.require('sm.bSmCollapsedText.View');
goog.require('sm.iCloblFactory.FactoryStendhal');

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

    /**
     * Name of this element in factory
     */
    CollapsedText.NAME = sm.bSmCollapsedText.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        CollapsedText.NAME, {
            control: CollapsedText,
            view: View
        }
    );

});  // goog.scope
