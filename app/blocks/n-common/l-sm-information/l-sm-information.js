goog.provide('sm.lSmInformation.SmInformation');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lSmInformation.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.iLayout.LayoutStendhal}
 */
sm.lSmInformation.SmInformation = function(view, opt_domHelper) {
    sm.lSmInformation.SmInformation.base(this, 'constructor', view,
        opt_domHelper);
};
goog.inherits(sm.lSmInformation.SmInformation, sm.iLayout.LayoutStendhal);


goog.scope(function() {
    var Information = sm.lSmInformation.SmInformation,
       View = sm.lSmInformation.View;
});  // goog.scope


/**
 * creates sm.lSmInformation.SmInformation instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lSmInformation.View.CssClass.ROOT
    );

    var view = new sm.lSmInformation.View(null, null, 'stendhal');
    var instance = new sm.lSmInformation.SmInformation(view);

    instance.decorate(domElement);
});
