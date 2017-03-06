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
     * @typedef {{
     *     disableHover: boolean
     * }}
     */
    View.DataParams;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-link',
        HOVERABLE: 'b-sm-link_hoverable',
        SELECTED: 'b-sm-link_selected'
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
        BLOCK: 'block',
        HOAR: 'hoar'
    };


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLICK: goog.events.getUniqueId('click')
    };


    /**
     * Sign of theme in css class
     * If css class contains this sign => it is theme modifier
     * @const {string}
     */
    View.THEME_SIGN = '-theme';


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number)>} rawParams
     * @return {sm.bSmItem.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        return {
            data: {
                id: rawParams['id'],
                url: rawParams['url'],
                content: rawParams['content']
            },
            config: {
                target: rawParams['target'],
                size: rawParams['size'],
                disableHover: rawParams['disableHover'],
                isSelected: rawParams['isSelected'],
                theme: rawParams['theme']
            }
        };
    };


    /**
     * Getter for params
     * @return {sm.bSmLink.View.DataParams}
     * @public
     * @override
     */
    View.prototype.getParams = function() {
        if (!this.params || goog.object.isEmpty(this.params)) {
            var elem = this.getElement(),
                data = elem && elem.getAttribute('data-params');
            if (data) {
                this.params = this.transformParams(JSON.parse(data));
            }
        }

        return this.params;
    };


    /**
     * Enable hover reaction on element if it possible (not-mobile device
     * and element isn't selected)
     * @public
     */
    View.prototype.enableHover = function() {
        if (goog.labs.userAgent.device.isDesktop() && !this.isSelected()) {
            goog.dom.classlist.add(this.getElement(), View.CssClass.HOVERABLE);
            this.params.disableHover = false;
        }
    };


    /**
     * Disable hover reaction on element
     * @public
     */
    View.prototype.disableHover = function() {
        goog.dom.classlist.remove(this.getElement(), View.CssClass.HOVERABLE);
        this.params.disableHover = true;
    };

    /**
     * Return isSelected status
     * @return {boolean}
     * @public
     */
    View.prototype.isSelected = function() {
        return goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.SELECTED
        );
    };


    /**
     * Set class SELECTED and disable hover
     * @public
     */
    View.prototype.select = function() {
        goog.dom.classlist.add(this.getElement(), View.CssClass.SELECTED);
        goog.dom.classlist.remove(this.getElement(), View.CssClass.HOVERABLE);
    };


    /**
     * Remove class SELECTED and enable hover if it possible
     * @public
     */
    View.prototype.deselect = function() {
        goog.dom.classlist.remove(this.getElement(), View.CssClass.SELECTED);

        if (!this.params.disableHover) {
            this.enableHover();
        }
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
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initElementListeners_();
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, string>} rawParams
     * @return {sm.bSmLink.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            id: rawParams['id'],
            disableHover: rawParams['disableHover'] || false
        };
    };


    /**
     * Initializes listeners for root Element
     * @private
     */
    View.prototype.initElementListeners_ = function() {
        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClick_
        );
    };


    /**
     * Handler click on root Element
     * @param {Object} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
        this.dispatchEvent(View.Event.CLICK);
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
