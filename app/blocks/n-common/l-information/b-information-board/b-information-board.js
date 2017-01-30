goog.provide('sm.lInformation.bInformationBoard.InformationBoard');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');
goog.require('sm.lInformation.bInformationBoard.Template');
goog.require('sm.lInformation.bInformationBoard.View');



/**
 * Information Board
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lInformation.bInformationBoard.InformationBoard = function(
    view, opt_domHelper) {

    sm.lInformation.bInformationBoard.InformationBoard.base(this,
        'constructor', view, opt_domHelper);
};
goog.inherits(
    sm.lInformation.bInformationBoard.InformationBoard,
    cl.iControl.Control
);


goog.scope(function() {
    var InformationBoard = sm.lInformation.bInformationBoard.InformationBoard,
        View = sm.lInformation.bInformationBoard.View;

    /**
     * Name of this element in factory
     */
    InformationBoard.NAME = sm.lInformation.bInformationBoard.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(InformationBoard.NAME, {
        control: InformationBoard,
        view: View
    });

});  // goog.scope
