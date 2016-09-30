/**
 * @fileoverview Link view
 * Can change change theme and hoverability of link
 */
goog.provide('sm.bSmLink.View');

goog.require('cl.iControl.View');
goog.require('goog.array');
goog.require('goog.labs.userAgent.device');
goog.require('goog.object');


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
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-link',
        HOVERABLE: 'b-sm-link_hoverable'
    };


    /**
     * Possible themes
     * @enum {string}
     * @const
     */
    View.Theme = {
        DEFAULT: 'default',
        LIGHT: 'light',
        ATTENTION: 'attention',
        DARK: 'dark',
        BLOCK: 'block'
    };


    /**
     * Sign of theme in css class
     * If css class contains this sign => it is theme modifier
     * @const {string}
     */
    View.THEME_SIGN = '-theme';


    /**
     * @typedef {{
     *     data: {
     *         id: (number|undefined),
     *         url: (string|undefined),
     *         content: (string|undefined)
     *     }
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
            data: {
                id: rawParams['id'],
                url: rawParams['url'],
                content: rawParams['content']
            }
        };
    };


    /**
     * Enable hover reaction on element if it possible (not-mobile device)
     * @public
     */
    View.prototype.enableHover = function() {
        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.HOVERABLE
            );
        }
    };


    /**
     * Disable hover reaction on element
     * @public
     */
    View.prototype.disableHover = function() {
        goog.dom.classlist.remove(
            this.getElement(),
            View.CssClass.HOVERABLE
        );
    };


    /**
     * Check if theme is valid and set it to block
     * @param {sm.bSmLink.View.Theme} theme
     * @public
     */
    View.prototype.setTheme = function(theme) {
        if (this.isValidTheme_(theme)) {
            this.removeTheme_();
            this.setTheme_(theme);
        }
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.enableHover();
    };


        /**
     * Remove theme modifier
     * @private
     */
    View.prototype.removeTheme_ = function() {
        var classes = goog.dom.classlist.get(this.getElement());

        var theme = goog.array.find(classes, function(cssClass) {
            return ~cssClass.search(View.THEME_SIGN);
        });

        if (theme) {
            goog.dom.classlist.remove(
                this.getElement(),
                theme
            );
        }
    };


    /**
     * Check that given theme is in themes enum
     * @param {sm.bSmLink.View.Theme} theme
     * @return {boolean}
     * @private
     */
    View.prototype.isValidTheme_ = function(theme) {
        return goog.object.findValue(View.Theme, function(themeName) {
            return themeName == theme;
        });
    };


    /**
     * Set theme modifier to block
     * @param {sm.bSmLink.View.Theme} theme
     * @private
     */
    View.prototype.setTheme_ = function(theme) {
        var themeCssClass = this.generateThemeCssClass_(theme);

        goog.dom.classlist.add(
            this.getElement(),
            themeCssClass
        );
    };


    /**
     * Generate theme modifier from given theme name
     * @param {sm.bSmLink.View.Theme} theme
     * @return {string}
     * @private
     */
    View.prototype.generateThemeCssClass_ = function(theme) {
        return View.CssClass.ROOT + '_' + theme + View.THEME_SIGN;
    };
});  // goog.scope
