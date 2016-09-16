goog.provide('sm.bSmLink.View');

goog.require('cl.iControl.View');
goog.require('goog.labs.userAgent.device');


goog.scope(function() {



    /**
     * Link View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmLink.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmLink.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);
    };
    goog.inherits(sm.bSmLink.View, cl.iControl.View);
    var View = sm.bSmLink.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-link',
        HOVERABLE: 'b-sm-link_hoverable'
    };


    /**
     * @typedef {{
     *     id: (number|undefined),
     *     url: (string|undefined),
     *     content: (string|undefined),
     * }}
     */
    View.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number)>} rawParams
     * @return {sm.bSmItem.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            id: rawParams['id'],
            url: rawParams['url'],
            content: rawParams['content']
        };
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.detectHoverability_();
    };


    /**
     * Check hoverability for block and
     * if it hoverable, add to it corresponding modifier
     * @private
     */
    View.prototype.detectHoverability_ = function() {
        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.HOVERABLE
            );
        }
    };
});  // goog.scope
