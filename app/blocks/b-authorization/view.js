goog.provide('sm.bAuthorization.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Authorization View
 * @param {Object=} opt_params
 * @param {Function=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bAuthorization.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);
};
goog.inherits(sm.bAuthorization.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bAuthorization.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-authorization'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            socialModal: this.getElementByClass(
                cl.gAuthSocialModal.View.CssClass.ROOT
            )
        };
    };
});  // goog.scope
