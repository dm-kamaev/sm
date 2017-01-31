goog.provide('sm.gList.ListLinks');

goog.require('sm.bSmLink.SmLink');
goog.require('sm.gList.ListStendhal');
goog.require('sm.gList.TemplateLinks');
goog.require('sm.gList.ViewLinks');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * List control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.gList.ListStendhal}
 */
sm.gList.ListLinks = function(view, opt_params, opt_domHelper) {
    var instance = view || new sm.gList.ViewLinks();

    sm.gList.ListLinks.base(
        this, 'constructor', instance, opt_params, opt_domHelper
    );


    /**
     * Links instances
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.links_ = [];
};
goog.inherits(sm.gList.ListLinks, sm.gList.ListStendhal);


goog.scope(function() {
    var ListLinks = sm.gList.ListLinks,
        View = sm.gList.ViewLinks;

    /**
     * Name of this element in factory
     */
    ListLinks.NAME = sm.gList.TemplateLinks.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(ListLinks.NAME, {
        control: ListLinks,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    ListLinks.Event = {
        ITEM_SELECT: sm.gList.ListStendhal.Event.ITEM_SELECT,
        ITEM_CLICK: sm.gList.ListStendhal.Event.ITEM_CLICK
    };


    /**
     * @override
     */
    ListLinks.prototype.decorateInternal = function(element) {
        ListLinks.base(this, 'decorateInternal', element);

        this.initLinks_();
    };


    /**
     * Initializes instance of links
     * @private
     */
    ListLinks.prototype.initLinks_ = function() {
        var domElements = this.getView().getDom().links,
            instance;

        for (var i = 0; i < domElements.length; i++) {
            instance = this.decorateChild(
                sm.bSmLink.SmLink.NAME,
                domElements[i]
            );

            this.links_.push(instance);
        }
    };
});  // goog.scope
