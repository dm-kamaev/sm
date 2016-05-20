goog.provide('sm.bFavorite.Favorite');

goog.require('cl.iControl.Control');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bFavorite.Favorite = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sm.bFavorite.Favorite, cl.iControl.Control);


goog.scope(function() {
    var Favorite = sm.bFavorite.Favorite,
        View = sm.bFavorite.View;
});  // goog.scope
