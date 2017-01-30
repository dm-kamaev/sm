goog.provide('sm.bSmFavorite.SmFavorite');

goog.require('cl.iControl.Control');
goog.require('sm.bSmFavorite.Template');
goog.require('sm.bSmFavorite.View');
goog.require('sm.iAuthorization.Authorization');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



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
     * Items List Paged
     * @type {sm.bSmListPaged.SmListPaged}
     * @private
     */
    this.listPaged_ = null;


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
     * Name of this element in factory
     */
    Favorite.NAME = sm.bSmFavorite.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Favorite.NAME, {
        control: Favorite,
        view: View
    });

    /**
     * Add given item to favorites
     * @param {sm.bSmItem.SmItem.Params} itemParams
     */
    Favorite.prototype.addItem = function(itemParams) {
        this.listPaged_.addItem(itemParams);
        this.updateState_();
    };


    /**
     * Remove item with given id from favorites
     * @param {number} itemId
     */
    Favorite.prototype.removeItem = function(itemId) {
        this.listPaged_.removeItem(itemId);
        this.updateState_();
    };


    /**
     * @override
     * @param {Element} element
     */
    Favorite.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initlistPaged_();
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
        var state = this.listPaged_.isNotEmpty() ?
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
    Favorite.prototype.initlistPaged_ = function() {
        this.listPaged_ = this.decorateChild(
            'smListPaged',
            this.getView().getDom().listPaged
        );
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
