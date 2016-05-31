goog.provide('sm.bFavoriteLink.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * FavoriteLink View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bFavoriteLink.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.bFavoriteLink.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bFavoriteLink.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-favorite-link',
        ICON: 'b-favorite-link__icon',
        NOT_FAVORITE: 'b-favorite-link_not-favorite',
        FAVORITE: 'b-favorite-link_favorite'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
       NOT_FAVORITE_CLICK: 'not-favorite-click',
       FAVORITE_CLICK: 'favorite-click'
    };


    /**
     * Type Icon enum
     * @enum {string}
     */
    View.TypeIcon = {
        FAVORITE: 'favorite_red',
        NOT_FAVORITE: 'favorite'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClick_
        );
    };


    /**
     * Element Click
     * @private
     */
    View.prototype.onClick_ = function() {
        var isFavorite = this.isFavorite_();

        console.log(isFavorite);
        if (isFavorite) {
            this.onFavoriteClick_();
        }
        else {
            this.onNotFavoriteClick_();
        }
    };


    /**
     * Not Favorite Click
     * @private
     */
    View.prototype.onNotFavoriteClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.NOT_FAVORITE_CLICK
        });

        this.switchClass_(
            View.CssClass.NOT_FAVORITE,
            View.CssClass.FAVORITE
        );
    };


    /**
     * Favorite Click
     * @private
     */
    View.prototype.onFavoriteClick_ = function() {
         this.dispatchEvent({
            'type': View.Event.FAVORITE_CLICK
        });

        this.switchClass_(
            View.CssClass.FAVORITE,
            View.CssClass.NOT_FAVORITE
        );
    };


    /**
     * switch Element modifier
     * @param {string} oldClass
     * @param {string} newClass
     * @private
     */
    View.prototype.switchClass_ = function(oldClass, newClass) {
        goog.dom.classlist.swap(
            this.getElement(),
            oldClass,
            newClass
        );
    };


    /**
     * Checks favorites contained in school or not
     * @return {bool}
     * @private
     */
    View.prototype.isFavorite_ = function() {
        return goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.FAVORITE
        );
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            icon: this.getElementByClass(
                cl.gIcon.View.CssClass.ROOT
            )
        };
    };
});  // goog.scope
