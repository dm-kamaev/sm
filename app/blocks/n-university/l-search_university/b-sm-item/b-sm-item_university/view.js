goog.provide('sm.bSmItem.ViewUniversity');

goog.require('sm.bSmItem.View');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItem.ViewUniversity = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.ViewUniversity.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmItem.ViewUniversity, sm.bSmItem.View);


goog.scope(function() {
    var View = sm.bSmItem.ViewUniversity;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-item_university',
        COVER_IMAGE: 'b-sm-item__cover-image',
        STARS: 'b-sm-item__stars',
        NAME_LINK: 'b-sm-item__link-name',
        DESCRIPTION_LINK: 'b-sm-item__description-link'
    };


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLICK: goog.events.getUniqueId('click')
    };


    /**
     * Initializes dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');
        // this.dom = {
        //     coverImage: this.getElementByClass(View.CssClass.COVER_IMAGE),
        //     nameLink: this.getElementByClass(View.CssClass.NAME_LINK),
        //     stars: this.getElementByClass(View.CssClass.STARS),
        //     descriptionLink: this.getElementByClass(
        //         View.CssClass.DESCRIPTION_LINK
        //     )
        // };
        this.dom.stars = this.getElementByClass(View.CssClass.STARS);
    };
});  // goog.scope
