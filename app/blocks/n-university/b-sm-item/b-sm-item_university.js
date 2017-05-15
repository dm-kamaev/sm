goog.provide('sm.bSmItem.SmItemUniversity');

goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.TemplateUniversity');
goog.require('sm.bSmItem.ViewUniversity');
goog.require('sm.bSmStars.SmStars');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmItem.SmItemUniversity = function(view, opt_domHelper) {
    sm.bSmItem.SmItemUniversity.base(this, 'constructor', view, opt_domHelper);

};
goog.inherits(sm.bSmItem.SmItemUniversity, sm.bSmItem.SmItem);


goog.scope(function() {
    var Item = sm.bSmItem.SmItemUniversity,
        View = sm.bSmItem.ViewUniversity;

    /**
     * Name of this element in factory
     */
    Item.NAME = sm.bSmItem.TemplateUniversity.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Item.NAME, {
        control: Item,
        view: View
    });


    /**
     * Css class enum
     * @enum {string}
     * @const
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

        var dom = this.getView().getDom();

        if (dom.stars) {
            this.stars_ = this.decorateChild(
                sm.bSmStars.SmStars.NAME,
                dom.stars
            );
        }
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItemUniversity.Params}
     */
    Item.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };

});  // goog.scope
