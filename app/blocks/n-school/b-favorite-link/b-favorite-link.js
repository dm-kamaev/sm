goog.provide('sm.bFavoriteLink.FavoriteLink');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bFavoriteLink.Event.FavoriteAdded');
goog.require('sm.bFavoriteLink.Template');
goog.require('sm.bFavoriteLink.View');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



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
        View = sm.bFavoriteLink.View,
        Event = sm.bFavoriteLink.Event;

    /**
     * Name of this element in factory
     */
    FavoriteLink.NAME = sm.bFavoriteLink.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(FavoriteLink.NAME, {
        control: FavoriteLink,
        view: View
    });

    /**
     * Event enum
     * @enum
     */
    FavoriteLink.Event = {
        FAVORITE_ADDED: Event.FavoriteAdded.Type,
        SET_FAVORITE_STATE: 'set-favorite-state',
        SET_NOT_FAVORITE_STATE: 'set-not-favorite-state'
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

        var data = {
            'entityId': itemId,
            'entityType': 'school',
            '_csrf': window['ctx']['csrf']
        };

        if (opt_action == 'add') {
            method = 'POST';
            var callback = this.onSuccessFavoriteAdd_.bind(this);
        } else if (opt_action == 'remove') {
            method = 'DELETE';
        } else {
            method = 'GET';
        }

        return jQuery.ajax({
            url: this.favoriteApiAddress_,
            type: method,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: callback
        });
    };


    /**
     * Dispatches event about successfull add to favorites with added item
     * @param {Object} data
     * @private
     */
    FavoriteLink.prototype.onSuccessFavoriteAdd_ = function(data) {
        var item = sm.bSchoolListItem.SchoolListItem.transformParams(data),
            event = new Event.FavoriteAdded(item, this);
        this.dispatchEvent(event);
    };


    /**
     * Element Click
     * @param {{
     *     data: {
     *         isFavorite: boolean
     *     }
     * }} event
     * @private
     */
    FavoriteLink.prototype.onClick_ = function(event) {
        var currentFavoriteState = event['data']['isFavorite'],
            newFavoriteState = !currentFavoriteState,
            authorization = sm.iAuthorization.Authorization.getInstance();

        authorization.isUserAuthorized() ?
            this.switchState_(newFavoriteState) :
            authorization.authorize();
    };


    /**
     * Switch state to given state value and dispatch event about this action
     * 'true' means in Favorite state, 'false' means not in favorite
     * @param {boolean} state
     * @private
     */
    FavoriteLink.prototype.switchState_ = function(state) {
        if (state) {
            this.addFavorite();
            this.dispatchEvent(FavoriteLink.Event.SET_FAVORITE_STATE);
        } else {
            this.removeFavorite();
            this.dispatchEvent(FavoriteLink.Event.SET_NOT_FAVORITE_STATE);
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
