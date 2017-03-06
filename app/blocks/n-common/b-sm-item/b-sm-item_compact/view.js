goog.provide('sm.bSmItem.ViewCompact');

goog.require('sm.bSmItem.View');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.bSmItem.View}
 */
sm.bSmItem.ViewCompact = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.ViewCompact.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /**
     * Parameters
     * @type {sm.bSmItem.TemplateEntity.Params}
     * @protected
     */
    this.params = opt_params || {};
};
goog.inherits(sm.bSmItem.ViewCompact, sm.bSmItem.View);


goog.scope(function() {
    var View = sm.bSmItem.ViewCompact;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-item_compact',
        ADDITIONAL_LINK: 'b-sm-item__additional-link'
    };

    /**
     * Initializes dom elements
     * @protected
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(this.dom, {
            additionalLink: this.getElementByClass(
                View.CssClass.ADDITIONAL_LINK
            )
        });
    };
});  // goog.scope
