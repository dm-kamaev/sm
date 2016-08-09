goog.provide('sm.lInformation.Information');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lInformation.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.iLayout.LayoutStendhal}
 */
sm.lInformation.Information = function(view, opt_domHelper) {
    sm.lInformation.Information.base(this, 'constructor', view,
        opt_domHelper);
};
goog.inherits(sm.lInformation.Information, sm.iLayout.LayoutStendhal);


goog.scope(function() {
    var Information = sm.lInformation.Information,
       View = sm.lInformation.View;
});  // goog.scope


/**
 * creates sm.lInformation.Information instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lInformation.View.CssClass.ROOT
    );

    var view = new sm.lInformation.View(null, null, 'stendhal');
    var instance = new sm.lInformation.Information(view);

    instance.decorate(domElement);
});
