goog.provide('sm.bHeader.Header');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bHeader.View');


/**
 * Header
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bHeader.Header = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    this.setSupportedState(goog.ui.Component.State.FOCUSED, false);
};
goog.inherits(sm.bHeader.Header, cl.iControl.Control);
goog.addSingletonGetter(sm.bHeader.Header);


goog.scope(function() {
    var Header = sm.bHeader.Header,
        View = sm.bHeader.View,
        FactoryManager = cl.iFactory.FactoryManager;

    jQuery(function() {
        FactoryManager.getInstance().decorate(
            'stendhal',
            'header',
            goog.dom.getElementByClass(View.CssClass.ROOT)
        );
    });
});
