goog.provide('sm.bSmComment.View');

goog.require('cl.iControl.View');
goog.require('goog.events');



/**
 * Comment View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmComment.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmComment.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     * }
     */
    this.dom = {};
};
goog.inherits(sm.bSmComment.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmComment.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-comment'
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
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * @protected
     */
    View.prototype.initDom = function() {
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.View.RenderParams}
     * @public
     */
    View.getRenderParams = function(rawParams) {
        return {};
    };

});  // goog.scope
