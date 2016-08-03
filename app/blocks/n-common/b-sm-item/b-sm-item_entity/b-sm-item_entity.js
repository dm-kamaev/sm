goog.provide('sm.bSmItem.SmItemEntity');

goog.require('sm.bBadge.Badge');
goog.require('sm.bSmItem.Event.FavoriteRemoved');
goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.ViewEntity');



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
     * @type {sm.bScore.Score}
     * @private
     */
    this.score_ = null;


    /**
     * Badges instances
     * @type {Array<sm.bBadge.Badge>}
     * @private
     */
    this.badges_ = [];


    /**
     * Favorite Link Instance
     * @type {sm.bFavoriteLink.FavoriteLink}
     * @private
     */
    this.favoriteLink_ = null;
};
goog.inherits(sm.bSmItem.SmItemEntity, sm.bSmItem.SmItem);


goog.scope(function() {
    var Item = sm.bSmItem.SmItemEntity,
        View = sm.bSmItem.ViewEntity,
        FavoriteLink = sm.bFavoriteLink.FavoriteLink;

    var Event = sm.bSmItem.Event;


    /**
     * Event enum
     * @enum {string}
     */
    Item.Event = {
        FAVORITE_ADDED: FavoriteLink.Event.FAVORITE_ADDED,
        FAVORITE_REMOVED: Event.FavoriteRemoved.Type
    };


    /**
     * @param {Element} element
     * @override
     */
    Item.prototype.decorateInternal = function(element) {
        Item.base(this, 'decorateInternal', element);

        this.initScore_();
        this.initBadges_();
        this.initFavoriteLink_();
    };


    /**
     * @override
     */
    Item.prototype.enterDocument = function() {
        Item.base(this, 'enterDocument');

        this.initFavoriteLinkListeners_();
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
     * Initializes badges instances
     * @private
     */
    Item.prototype.initBadges_ = function() {
        var badges = this.getDom().badges;

        for (var i = 0, instance; i < badges.length; i++) {
            instance = new Badge();
            this.addChild(instance);
            instance.decorate(badges[i]);

            this.badges_.push(instance);
        }
    };


    /**
     * Initializes favorite link instance
     * @private
     */
    Item.prototype.initFavoriteLink_ = function() {
        this.favoriteLink_ = FactoryManager.getInstance().decorate(
            this.getView().getStylization(),
            'favorite-link',
            this.getDom().favoriteLink,
            this
        );
    };
});  // goog.scope
