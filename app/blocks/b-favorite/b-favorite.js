goog.provide('sm.bFavorite.Favorite');

goog.require('cl.iControl.Control');
goog.require('sm.iAuthorization.Authorization');



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
        View = sm.bFavorite.View,
        Authorization = sm.iAuthorization.Authorization;


    /**
     * Add given item to favorites
     * @param {sm.bSchoolListItem.SchoolListItem.Params} favoriteItem
     */
    Favorite.prototype.addItem = function(favoriteItem) {
        this.schoolListPaged_.addItem(favoriteItem);
    };


    /**
     * Remove item with given id from favorites
     * @param {number} itemId
     */
    Favorite.prototype.removeItem = function(itemId) {
        this.schoolListPaged_.removeItem(itemId);
    };


    /**
     * @override
     * @param {Element} element
     */
    Favorite.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSchoolListPaged_();
    };

    /**
     * @override
     */
    Favorite.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.AUTHORIZE,
            this.onAuthorize_
        );
    };


    /**
     * Handles authorize action
     * @private
     */
    Favorite.prototype.onAuthorize_ = function() {
        var authorization = Authorization.getInstance();

        authorization.authorize();
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
