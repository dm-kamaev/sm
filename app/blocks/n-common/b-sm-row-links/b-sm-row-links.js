goog.provide('sm.bSmRowLinks.SmRowLinks');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmRowLinks.Template');
goog.require('sm.bSmRowLinks.View');



/**
 *
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmRowLinks.SmRowLinks = function(view, opt_params, opt_domHelper) {
    sm.bSmRowLinks.SmRowLinks.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * Instance list
     * @type {Array<sm.bSmLink.SmLink>}
     * @protected
     */
    this.items = [];

};
goog.inherits(sm.bSmRowLinks.SmRowLinks, cl.iControl.Control);

goog.scope(function() {
    var RowLinks = sm.bSmRowLinks.SmRowLinks;

    /**
     * @param {Element} element
     * @override
     * @protected
     */
    RowLinks.prototype.decorateInternal = function(element) {
        RowLinks.base(this, 'decorateInternal', element);

        var links = this.getView().getDom().links;
        this.items = this.decorateChildren('smLink', links);
    };


});  // goog.scope