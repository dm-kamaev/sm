goog.provide('sm.bSmBreadcrumbs.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');



/**
 * Dropdown View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmBreadcrumbs.View = function(opt_params, opt_template, opt_modifier) {
    sm.bSmBreadcrumbs.View.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );
};
goog.inherits(sm.bSmBreadcrumbs.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmBreadcrumbs.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-breadcrumbs',
        LINK: 'b-sm-breadcrumbs__link'
    };

    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.links = goog.dom.getElementsByClass(View.CssClass.LINK);
    };
}); // goog.scope
