/**
 * @fileoverview Page with error not found
 */
goog.provide('sm.lErrorNotFound.ErrorNotFound');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lErrorNotFound.View');



goog.scope(function() {
    var View = sm.lErrorNotFound.View;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.iLayout.LayoutStendhal}
     */
    sm.lErrorNotFound.ErrorNotFound = function(view, opt_domHelper) {
        sm.lErrorNotFound.ErrorNotFound.base(this, 'constructor', view,
            opt_domHelper);
    };
    goog.inherits(sm.lErrorNotFound.ErrorNotFound, sm.iLayout.LayoutStendhal);
    var ErrorNotFound = sm.lErrorNotFound.ErrorNotFound;
});  // goog.scope


/**
 * creates sm.lErrorNotFound.ErrorNotFound instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lErrorNotFound.View.CssClass.ROOT
    );

    var view = new sm.lErrorNotFound.View(null, null, 'stendhal');
    var instance = new sm.lErrorNotFound.ErrorNotFound(view);

    instance.decorate(domElement);
});
