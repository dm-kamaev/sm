goog.provide('sm.bSmBreadcrumbs.SmBreadcrumbs');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmBreadcrumbs.Template');
goog.require('sm.bSmBreadcrumbs.View');



/**
 *
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmBreadcrumbs.SmBreadcrumbs = function(view, opt_params, opt_domHelper) {
    sm.bSmBreadcrumbs.SmBreadcrumbs.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * Instance list
     * @type {Array<sm.bSmLink.SmLink>}
     * @protected
     */
    this.items = [];

};
goog.inherits(sm.bSmBreadcrumbs.SmBreadcrumbs, cl.iControl.Control);

goog.scope(function() {
    var Breadcrumbs = sm.bSmBreadcrumbs.SmBreadcrumbs;

    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Breadcrumbs.prototype.decorateInternal = function(element) {
        Breadcrumbs.base(this, 'decorateInternal', element);

        var links = this.getView().getDom().links;
        this.items = this.decorateChildren('smLink', links);
    };


}); // goog.scope
