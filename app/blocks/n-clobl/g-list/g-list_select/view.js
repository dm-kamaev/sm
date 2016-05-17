goog.provide('sm.gList.SelectListView');

goog.require('cl.gList.View');



/**
 * List view
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.gList.SelectListView = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.gList.SelectListView, cl.gList.View);


goog.scope(function() {
    var View = sm.gList.SelectListView;


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
});  // goog.scope
