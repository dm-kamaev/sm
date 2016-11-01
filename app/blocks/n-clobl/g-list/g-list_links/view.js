goog.provide('sm.gList.ViewLinks');

goog.require('cl.gList.ListMode');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.object');
goog.require('sm.gList.ViewStendhal');



/**
 * List List view
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gList.View}
 */
sm.gList.ViewLinks = function(opt_params, opt_template, opt_domHelper) {
    sm.gList.ViewLinks.base(
        this, 'constructor', opt_params, opt_template, opt_domHelper
    );
};
goog.inherits(sm.gList.ViewLinks, sm.gList.ViewStendhal);


goog.scope(function() {
    var View = sm.gList.ViewLinks,
        ListMode = cl.gList.ListMode;


    /** @const */
    View.DEFAULT_MODE = ListMode.SELECTION;

    /** @const */
    View.DEFAULT_MAX_SELECTION = null;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-list_links',
        ITEM: 'g-list__item',
        ITEM_SELECTED: 'g-list__item_selected',
        ITEM_DISABLED: 'g-list__item_disabled'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ITEM_SELECT: sm.gList.ViewStendhal.Event.ITEM_SELECT,
        ITEM_CLICK: sm.gList.ViewStendhal.Event.ITEM_CLICK
    };


     /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.links = this.getElementsByClass(
            sm.bSmLink.View.CssClass.ROOT
        );
    };
});  // goog.scope
