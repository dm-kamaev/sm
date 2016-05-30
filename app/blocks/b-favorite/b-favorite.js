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


    /**
     * school List Paged
     * @type {sm.bSchoolListPaged.SchoolListPaged}
     * @private
     */
    this.schoolListPaged_ = null;
};
goog.inherits(sm.bFavorite.Favorite, cl.iControl.Control);


goog.scope(function() {
    var Favorite = sm.bFavorite.Favorite,
        View = sm.bFavorite.View;


    /**
     * @override
     * @param {Element} element
     */
    Favorite.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSchoolListPaged_();
    };


    /**
     * init School List Paged
     * @private
     */
    Favorite.prototype.initSchoolListPaged_ = function() {
        this.schoolListPaged_ = this.decorateChild(
            'school-list-paged',
            this.getView().getDom().schoolListPaged
        );
    };
});  // goog.scope
