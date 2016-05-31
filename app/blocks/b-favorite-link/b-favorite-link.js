goog.provide('sm.bFavoriteLink.FavoriteLink');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bFavoriteLink.View');



/**
 * FavoriteLink
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bFavoriteLink.FavoriteLink = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


    /**
     * Icon instance
     * @type {cl.gIcon.Icon}
     * @private
     */
    this.icon_ = null;
};
goog.inherits(sm.bFavoriteLink.FavoriteLink, cl.iControl.Control);


goog.scope(function() {
    var FavoriteLink = sm.bFavoriteLink.FavoriteLink,
        View = sm.bFavoriteLink.View;
    /**
     * @override
     * @param {Element} element
     */
    FavoriteLink.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initIcon_();
    };


    /**
     * @override
     */
    FavoriteLink.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.NOT_FAVORITE_CLICK,
            this.onNotFavoriteClick_
        );

        this.viewListen(
            View.Event.FAVORITE_CLICK,
            this.onFavoriteClick_
        );
    };


    /**
     * Not Favorite Click
     * @private
     */
    FavoriteLink.prototype.onNotFavoriteClick_ = function() {
        this.addFavorite();
        this.icon_.setType(View.TypeIcon.FAVORITE);
    };


    /**
     * Favorite Click
     * @private
     */
    FavoriteLink.prototype.onFavoriteClick_ = function() {
        this.removeFavorite();
        this.icon_.setType(View.TypeIcon.NOT_FAVORITE);
    };


    /**
     * Add to favorites
     */
    FavoriteLink.prototype.addFavorite = function() {
    };


    /**
     * remove from favorites
     */
    FavoriteLink.prototype.removeFavorite = function() {
    };


    /**
     * init Icon
     * @private
     */
    FavoriteLink.prototype.initIcon_ = function() {
        this.icon_ = this.decorateChild(
            'icon',
            this.getView().getDom().icon
        );
    };
});  // goog.scope
