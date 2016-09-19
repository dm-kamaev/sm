goog.provide('sm.bSmFavorite.SmFavorite');

goog.require('cl.iControl.Control');
goog.require('sm.iAuthorization.Authorization');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmFavorite.SmFavorite = function(view, opt_domHelper) {
    sm.bSmFavorite.SmFavorite.base(this, 'constructor', view, opt_domHelper);


    /**
     * Enties List Paged
     * @type {sm.bSmListPaged.SmListPaged}
     * @private
     */
    this.entitiesListPaged_ = null;


    /**
     * Link instance
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.authorizeLink_ = null;
};
goog.inherits(sm.bSmFavorite.SmFavorite, cl.iControl.Control);


goog.scope(function() {
    var Favorite = sm.bSmFavorite.SmFavorite,
        View = sm.bSmFavorite.View,
        Authorization = sm.iAuthorization.Authorization;


    /**
     * Add given item to favorites
     * @param {sm.bSmItem.SmItem.Params} entityParams
     */
    Favorite.prototype.addItem = function(entityParams) {
        this.entitiesListPaged_.addItem(entityParams);
        this.updateState_();
    };


    /**
     * Remove item with given id from favorites
     * @param {number} itemId
     */
    Favorite.prototype.removeItem = function(itemId) {
        this.entitiesListPaged_.removeItem(itemId);
        this.updateState_();
    };


    /**
     * @override
     * @param {Element} element
     */
    Favorite.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initEntitiesListPaged_();
        this.initAuthorizeLink_();
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
        var state = this.entitiesListPaged_.isNotEmpty() ?
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
     * Init List Paged
     * @private
     */
    Favorite.prototype.initEntitiesListPaged_ = function() {
        this.entitiesListPaged_ = this.decorateChild(
            'smListPaged',
            this.getView().getDom().entitiesListPaged
        );

        entitiesListPaged = this.entitiesListPaged_;
    };


    /**
     * Init Authorize Link
     * @private
     */
    Favorite.prototype.initAuthorizeLink_ = function() {
        this.authorizeLink_ = this.decorateChild(
            'smLink',
            this.getView().getDom().authorizeLink
        );
    };
});  // goog.scope
