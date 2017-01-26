goog.provide('sm.bSmItem.SmItemEntity');

goog.require('sm.bFavoriteLink.FavoriteLink');
goog.require('sm.bSmItem.Event.FavoriteRemoved');
goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.ViewEntity');
goog.require('sm.iSmViewport.SmViewport');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.bSmItem.SmItem}
 */
sm.bSmItem.SmItemEntity = function(view, opt_domHelper) {
    sm.bSmItem.SmItemEntity.base(this, 'constructor', view, opt_domHelper);


    /**
     * Score instance
     * @type {sm.bSmScore.SmScoreBrief}
     * @private
     */
    this.score_ = null;


    /**
     * Favorite Link Instance
     * @type {sm.bFavoriteLink.FavoriteLink}
     * @private
     */
    this.favoriteLink_ = null;
};
goog.inherits(sm.bSmItem.SmItemEntity, sm.bSmItem.SmItem);


goog.scope(function() {
    var Item = sm.bSmItem.SmItemEntity;
    var View = sm.bSmItem.ViewEntity;

    var FavoriteLink = sm.bFavoriteLink.FavoriteLink;
    var Event = sm.bSmItem.Event;
    var Viewport = sm.iSmViewport.SmViewport;


    /**
     * @typedef {sm.bSmItem.ViewEntity.RenderParams}
     */
    sm.bSmItem.SmItemEntity.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.SmItemEntity.RenderParams}
     */
    Item.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * Event enum
     * @enum {string}
     */
    Item.Event = {
        CLICK: sm.bSmItem.SmItem.Event.CLICK,
        FAVORITE_ADDED: FavoriteLink.Event.FAVORITE_ADDED,
        FAVORITE_REMOVED: Event.FavoriteRemoved.Type
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    Item.prototype.decorateInternal = function(element) {
        Item.base(this, 'decorateInternal', element);

        this.initScore_();
        this.initFavoriteLink_();
    };


    /**
     * @protected
     * @override
     */
    Item.prototype.enterDocument = function() {
        Item.base(this, 'enterDocument');

        this.initScoreListeners_();
        this.initFavoriteLinkListeners_();
    };


    /**
     * Initializes listeners for score
     * @private
     */
    Item.prototype.initScoreListeners_ = function() {
        this.getHandler().listen(
            this.score_,
            sm.bSmScore.SmScoreBrief.Event.PRIMARY_NAME_SHOW,
            this.onScorePrimaryNameShow_
        );

        this.getHandler().listen(
            this.score_,
            sm.bSmScore.SmScoreBrief.Event.PRIMARY_NAME_HIDE,
            this.onScorePrimaryNameHide_
        );
    };


    /**
     * Initializes listeners for favorite link
     * @private
     */
    Item.prototype.initFavoriteLinkListeners_ = function() {
        this.getHandler().listen(
            this.favoriteLink_,
            sm.bFavoriteLink.FavoriteLink.Event.SET_FAVORITE_STATE,
            this.onAddFavoriteClick_
        );

        this.getHandler().listen(
            this.favoriteLink_,
            sm.bFavoriteLink.FavoriteLink.Event.SET_NOT_FAVORITE_STATE,
            this.onRemoveFavoriteClick_
        );
    };


    /**
     * Listener for show score primary name
     * @private
     */
    Item.prototype.onScorePrimaryNameShow_ = function() {
        var viewportSize = Viewport.getInstance().getSize();

        if (viewportSize >= Viewport.Size.XL) {
            this.getView().setCostVisibility(false);
        }
    };


    /**
     * Listener for hide score primary name
     * @private
     */
    Item.prototype.onScorePrimaryNameHide_ = function() {
        var viewportSize = Viewport.getInstance().getSize();

        if (viewportSize >= Viewport.Size.XL) {
            this.getView().setCostVisibility(true);
        }
    };


    /**
     * Add Favorite Click
     * @private
     */
    Item.prototype.onAddFavoriteClick_ = function() {
        this.sendAddToFavorites_();
    };


    /**
     * Remove Favorite Click
     * @private
     */
    Item.prototype.onRemoveFavoriteClick_ = function() {
        var event = new Event.FavoriteRemoved(this.schoolId_, this);
        this.dispatchEvent(event);

        this.sendRemoveFromFavorites_();
    };


    /**
     * Send data about adding to favorites
     * @private
     */
    Item.prototype.sendAddToFavorites_ = function() {
        var schoolId = this.params.data.id;

        this.favoriteLink_.sendData(schoolId, 'add');
    };


    /**
     * Send data about removing from favorites
     * @private
     */
    Item.prototype.sendRemoveFromFavorites_ = function() {
        var schoolId = this.params.data.id;

        this.favoriteLink_.sendData(schoolId, 'remove');
    };


    /**
     * Initializes score instance
     * @private
     */
    Item.prototype.initScore_ = function() {
        this.score_ = this.decorateChild(
            'smScoreBrief',
            this.getView().getDom().score
        );
    };


    /**
     * Initializes favorite link instance
     * @private
     */
    Item.prototype.initFavoriteLink_ = function() {
        this.favoriteLink_ = this.decorateChild(
            'favorite-link',
            this.getView().getDom().favoriteLink
        );
    };
});  // goog.scope
