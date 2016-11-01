goog.provide('sm.gList.ListStendhal');

goog.require('cl.gList.List');
goog.require('sm.gList.ViewStendhal');



/**
 * List control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gList.List}
 */
sm.gList.ListStendhal = function(view, opt_params, opt_domHelper) {
    var instance = view || new sm.gList.ViewStendhal();

    sm.gList.ListStendhal.base(
        this, 'constructor', instance, opt_params, opt_domHelper
    );
};
goog.inherits(sm.gList.ListStendhal, cl.gList.List);


goog.scope(function() {
    var List = sm.gList.ListStendhal,
        View = sm.gList.ViewStendhal;

    /**
     * Event enum
     * @enum {string}
     */
    List.Event = {
        ITEM_SELECT: cl.gList.List.Event.ITEM_SELECT,
        ITEM_CLICK: cl.gList.List.Event.ITEM_CLICK
    };
});  // goog.scope
