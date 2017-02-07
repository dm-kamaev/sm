goog.provide('sm.lUniversity.bDescriptionList.View');

goog.require('cl.iControl.View');
goog.require('sm.bSmLink.View');


/**
 * Sketch View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lUniversity.bDescriptionList.View = function(
    opt_params, opt_type, opt_modifier
) {
    sm.bSmSketch.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /*
     * Collection of DOM elements
     * @type {
     *     links: ?Array<Element>
     * }
     */
    this.dom = {};
};
goog.inherits(sm.lUniversity.bDescriptionList.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.lUniversity.bDescriptionList.View;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-description-list',
        LINK: sm.bSmLink.View.CssClass.ROOT
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
        this.dom = {
            links: this.getElementsByClass(
                View.CssClass.LINK
            )
        };
    };
});  // goog.scope
