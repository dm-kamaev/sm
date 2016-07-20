goog.provide('sm.lSmSearch.SmSearch');

goog.require('cl.iControl.Control');
goog.require('cl.iFactory.FactoryManager');
goog.require('goog.dom');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iMetrika.Metrika');
goog.require('sm.lSmSearch.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lSmSearch.SmSearch = function(view, opt_domHelper) {
    sm.lSmSearch.SmSearch.base(this, 'constructor', view, opt_domHelper);
};
goog.inherits(sm.lSmSearch.SmSearch, cl.iControl.Control);


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
