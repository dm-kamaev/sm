goog.provide('sm.bFavorite.Favorite');

goog.require('cl.iControl.Control');
goog.require('sm.bFavorite.Template');
goog.require('sm.bFavorite.View');
goog.require('sm.bSchoolListPaged.SchoolListPaged');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



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
     * Name of this element in factory
     */
    Favorite.NAME = sm.bFavorite.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Favorite.NAME, {
        control: Favorite,
        view: View
    });

    /**
     * Add given item to favorites
     * @param {sm.bSchoolListItem.SchoolListItem.Params} favoriteItem
     */
    Favorite.prototype.addItem = function(favoriteItem) {
        this.schoolListPaged_.addItem(favoriteItem);
        this.updateState_();
    };


    /**
     * Remove item with given id from favorites
     * @param {number} itemId
     */
    Favorite.prototype.removeItem = function(itemId) {
        this.schoolListPaged_.removeItem(itemId);
        this.updateState_();
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
     * Init new state and set it by view method
     * @private
     */
    Favorite.prototype.updateState_ = function() {
        var state = this.schoolListPaged_.isNotEmpty() ?
            View.State.FILLED :
            View.State.EMPTY;
        this.getView().setState(state);
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
            sm.bSchoolListPaged.SchoolListPaged.NAME,
            this.getView().getDom().schoolListPaged
        );
    };
});  // goog.scope
