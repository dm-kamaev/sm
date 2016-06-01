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
            View.Event.CLICK,
            this.onClick_
        );

        this.viewListen(
            View.Event.MOUSEOVER,
            this.onMouseover_
        );

        this.viewListen(
            View.Event.MOUSEOUT,
            this.onMouseout_
        );
    };


    /**
     * Add to favorites
     */
    FavoriteLink.prototype.addFavorite = function() {
        this.icon_.setType(View.TypeIcon.FAVORITE);
    };


    /**
     * remove from favorites
     */
    FavoriteLink.prototype.removeFavorite = function() {
        this.icon_.setType(View.TypeIcon.NOT_FAVORITE);
    };


    /**
     * Element Click
     * @param  {Object} event
     * @private
     */
    FavoriteLink.prototype.onClick_ = function(event) {
        var isFavorite = event['data']['isFavorite'];

        if (isFavorite) {
            this.removeFavorite();
        }
        else {
            this.addFavorite();
        }

        this.getView().setFavorite(isFavorite);
    };


    /**
     * Element Mouseover
     * @param  {Object} event
     * @private
     */
    FavoriteLink.prototype.onMouseover_ = function(event) {
        if (event['data']['isFavorite']) {
            this.icon_.setType(View.TypeIcon.FAVORITE_DARK);
        }
    };


    /**
     * Element Mouseout
     * @param  {Object} event
     * @private
     */
    FavoriteLink.prototype.onMouseout_ = function(event) {
        if (event['data']['isFavorite']) {
            this.icon_.setType(View.TypeIcon.FAVORITE);
        }
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
