goog.provide('sm.lSmSearch.SmSearch');

goog.require('sm.iLayout.LayoutStendhal');
goog.require('sm.lSmSearch.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.iLayout.LayoutStendhal}
 */
sm.lSmSearch.SmSearch = function(view, opt_domHelper) {
    sm.lSmSearch.SmSearch.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.lSmSearch.SmSearch, sm.iLayout.LayoutStendhal);


goog.scope(function() {
    var Search = sm.lSmSearch.SmSearch,
       View = sm.lSmSearch.View;
});  // goog.scope


/**
 * creates sm.lSmSearch.SmSearch instance
 */
jQuery(function() {
    var domElement = goog.dom.getElementByClass(
        sm.lSmSearch.View.CssClass.ROOT
    );

    var view = new sm.lSmSearch.View(null, null, 'stendhal');
    var instance = new sm.lSmSearch.SmSearch(view);

    instance.decorate(domElement);
});
