goog.provide('sm.gListSelect.View');

goog.require('cl.gList.View');


/**
 * List view
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gList.View}
 */
sm.gListSelect.View =
    function(opt_params, opt_template, opt_domHelper) {
    goog.base(this, opt_params, opt_template, opt_domHelper);
};
goog.inherits(sm.gListSelect.View, cl.gList.View);

goog.scope(function() {
    var View = sm.gListSelect.View;

    /**
     * Get data params object from element
     * @param {Element} element
     * @public
     * @return {Array}
     */
    View.prototype.getDataParams = function(element) {
        return JSON.parse(
            element.getAttribute('data-params')
        );
    };
});
