goog.provide('sm.bSmRowLinks.View');

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
sm.bSmRowLinks.View = function(opt_params, opt_template, opt_modifier) {
    sm.bSmRowLinks.View.base(
        this, 'constructor', opt_params, opt_template, opt_modifier
    );
};
goog.inherits(sm.bSmRowLinks.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmRowLinks.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-row-links',
        LINK: 'b-sm-row-links__link'
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
});  // goog.scope
