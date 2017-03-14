goog.provide('sm.bSmItem.SmItemCompact');

goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.TemplateCompact');
goog.require('sm.bSmItem.ViewCompact');
goog.require('sm.bSmLink.SmLink');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.bSmItem.SmItem}
 */
sm.bSmItem.SmItemCompact = function(view, opt_domHelper) {
    sm.bSmItem.SmItemCompact.base(this, 'constructor', view, opt_domHelper);

    /**
     * Link Instance
     * @type {?sm.bSmLink.SmLink}
     * @private
     */
    this.descriptionLink_ = null;
};
goog.inherits(sm.bSmItem.SmItemCompact, sm.bSmItem.SmItem);


goog.scope(function() {
    var Item = sm.bSmItem.SmItemCompact,
        View = sm.bSmItem.ViewCompact;


    /**
     * @typedef {sm.bSmItem.SmItem.RenderParams}
     */
    sm.bSmItem.SmItemCompact.RenderParams;


    /**
     * Element name in factory
     * @const {string}
     */
    Item.NAME = sm.bSmItem.TemplateCompact.NAME();


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.SmItemCompact.RenderParams}
     */
    Item.getRenderParams = function(rawParams) {
        return sm.bSmItem.SmItem.getRenderParams(rawParams);
    };


    /**
     * Event enum
     * @enum {string}
     */
    Item.Event = {
        CLICK: sm.bSmItem.SmItem.Event.CLICK
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    Item.prototype.decorateInternal = function(element) {
        Item.base(this, 'decorateInternal', element);

        this.initAdditionalLink_();
    };


    /**
     * Initializes description link instance
     * @private
     */
    Item.prototype.initAdditionalLink_ = function() {
        var link = this.getView().getDom().additionalLink;

        if (link) {
            this.descriptionLink_ = this.decorateChild(
                sm.bSmLink.SmLink.NAME,
                link
            );
        }
    };

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Item.NAME, {
        control: Item,
        view: View
    });
});  // goog.scope
