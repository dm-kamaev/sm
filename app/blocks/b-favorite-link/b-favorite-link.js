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

    /**
     * Address to send queries for manipulate favorite
     * @type {string}
     * @private
     */
    this.favoriteApiAddress_ = '/api/favorite';
};
goog.inherits(sm.bFavoriteLink.FavoriteLink, cl.iControl.Control);


goog.scope(function() {
    var FavoriteLink = sm.bFavoriteLink.FavoriteLink,
        View = sm.bFavoriteLink.View;


    /**
     * Event enum
     * @enum
     */
    FavoriteLink.Event = {
        FAVORITE_ADDED: 'favorite-added',
        FAVORITE_REMOVED: 'favorite_removed'
    };


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

        this.autoDispatch(
            View.Event.CLICK,
            this.initEventType_.bind(this)
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
        this.getView().setFavorite(true);
    };


    /**
     * remove from favorites
     */
    FavoriteLink.prototype.removeFavorite = function() {
        this.icon_.setType(View.TypeIcon.NOT_FAVORITE);
        this.getView().setFavorite(false);
    };


    /**
     * Send data about adding or removing item with given id
     * @param {number} itemId
     * @param {string=} opt_action
     * @return {Promise}
     */
    FavoriteLink.prototype.sendData = function(itemId, opt_action) {
        var method = '';

        if (opt_action == 'add') {
            method = 'POST';
        } else if (opt_action == 'remove') {
            method = 'DELETE';
        } else {
            method = 'GET';
        }
        var token = window['ctx']['csrf'];
        return jQuery.ajax({
            url: this.favoriteApiAddress_,
            type: method,
            data: {
                itemId: itemId,
                _csrf: token
            }
        });
    };


    /**
     * Element Click
     * @param {Object} event
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
     * dispatch Event (add to favorites or remove)
     * @param {goog.events.Event} event
     * @return {goog.events.Event}
     * @private
     */
    FavoriteLink.prototype.initEventType_ = function(event) {
        if (event['data']['isFavorite']) {
            event['type'] = FavoriteLink.Event.FAVORITE_REMOVED;
        }
        else {
            event['type'] = FavoriteLink.Event.FAVORITE_ADDED;
        }
        event['target'] = this;
        return event;
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
