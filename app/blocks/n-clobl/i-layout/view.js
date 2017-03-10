goog.provide('sm.iLayout.ViewStendhal');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('sm.bSmHeader.View');



/**
 * Layout View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.iLayout.ViewStendhal = function(opt_params, opt_type, opt_modifier) {
    sm.iLayout.ViewStendhal.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.iLayout.ViewStendhal, cl.iControl.View);


goog.scope(function() {
    var View = sm.iLayout.ViewStendhal;
    var Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'i-layout'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
        this.initParams();
        this.initStylization_();
    };

    /**
     * Get params for authentication
     * @return {Object}
     * @public
     */
    View.prototype.getAuthParams = function() {
        return {
            isUserAuthorzed: this.params.isUserAuthorzed,
            authSocialLinks: this.params.authSocialLinks
        };
    };


    /**
     * Initializes dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom = {
            mainHeader: this.getElementByClass(
                sm.bSmHeader.View.CssClass.ROOT
            ),
            subheader: this.getElementByClass(
                sm.bSmSubheader.View.CssClass.ROOT
            ),
            footer: this.getElementByClass(
                sm.bSmFooter.View.CssClass.ROOT
            ),
            sideMenu: this.getElementByClass(
                sm.gModal.ViewSideMenu.CssClass.ROOT
            )
        };
    };


    /**
     * Init params from dom element
     * @protected
     */
    View.prototype.initParams = function() {
        var rawParams = this.getRawDataParams();
        this.params = this.transformParams(rawParams);
    };


    /**
     * Return raw data-params from dom element
     * @return {Object}
     * @protected
     */
    View.prototype.getRawDataParams = function() {
        var dataParams = goog.dom.dataset.get(
            this.getElement(),
            'params'
        );

        return JSON.parse(dataParams);
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {{
     *     isUserAuthorzed: boolean,
     *     authSocialLinks: {
     *         vk: string,
     *         fb: string
     *     },
     *     modifier: string,
     *     type: string
     * }}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            isUserAuthorzed: rawParams['isUserAuthorzed'],
            authSocialLinks: {
                vk: rawParams['authSocialLinks']['vk'],
                fb: rawParams['authSocialLinks']['fb']
            },
            modifier: rawParams['modifier'],
            type: rawParams['type']
        };
    };


    /**
     * Init stylization
     * @private
     */
    View.prototype.initStylization_ = function() {
        this.modifier_ = this.modifier_ || this.params.modifier;
    };
});  // goog.scope
