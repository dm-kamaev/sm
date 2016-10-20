goog.provide('sm.gList.ListLink');

goog.require('sm.gList.ListStendhal');
goog.require('sm.gList.ViewLink');



/**
 * List control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.gList.ListStendhal}
 */
sm.gList.ListLink = function(view, opt_params, opt_domHelper) {
    var instance = view || new sm.gList.ViewLink();

    sm.gList.ListLink.base(
        this, 'constructor', instance, opt_params, opt_domHelper
    );


    /**
     * Links instances
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.links_ = [];
};
goog.inherits(sm.gList.ListLink, sm.gList.ListStendhal);


goog.scope(function() {
    var List = sm.gList.ListLink,
        View = sm.gList.ViewLink;

    /**
     * Event enum
     * @enum {string}
     */
    List.Event = {
        ITEM_SELECT: sm.gList.ListStendhal.Event.ITEM_SELECT,
        ITEM_CLICK: sm.gList.ListStendhal.Event.ITEM_CLICK
    };


    /**
     * @override
     */
    List.prototype.decorateInternal = function(element) {
        List.base(this, 'decorateInternal', element);

        this.initLinks_();
    };


    /**
     * Initializes instance of links
     * @private
     */
    List.prototype.initLinks_ = function() {
        var domElements = this.getView().getDom().links,
            instance;

        for (var i = 0; i < domElements.length; i++) {
            instance = this.decorateChild(
                'smLink',
                domElements[i]
            );

            this.links_.push(instance);
        }
    };
});  // goog.scope
