/**
 * @fileoverview Link control
 */
goog.provide('sm.bSmLink.SmLink');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.Template');
goog.require('sm.bSmLink.View');
goog.require('sm.iCloblFactory.FactoryStendhal');


goog.scope(function() {
    var View = sm.bSmLink.View;



    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmLink.SmLink = function(view, opt_domHelper) {
        sm.bSmLink.SmLink.base(this, 'constructor', view, opt_domHelper);
    };
    goog.inherits(sm.bSmLink.SmLink, cl.iControl.Control);
    var Link = sm.bSmLink.SmLink;

    /**
     * Name of this element in factory
     */
    Link.NAME = sm.bSmLink.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Link.NAME, {
        control: Link,
        view: View
    });

    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    Link.CssClass = {
        ROOT: sm.bSmLink.View.CssClass.ROOT
    };


    /**
     * Possible themes
     * @enum {string}
     * @const
     */
    Link.Theme = {
        DEFAULT: View.Theme.DEFAULT,
        LIGHT: View.Theme.LIGHT,
        ATTENTION: View.Theme.ATTENTION,
        DARK: View.Theme.DARK,
        BLOCK: View.Theme.BLOCK
    };


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    Link.Event = {
        CLICK: View.Event.CLICK
    };


    /**
     * @typedef {sm.bSmLink.View.RenderParams}
     */
    sm.bSmLink.SmLink.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmLink.SmLink.RenderParams}
     */
    Link.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * Set given theme
     * @param {sm.bSmLink.SmLink.Theme} theme
     * @public
     */
    Link.prototype.setTheme = function(theme) {
        this.getView().setTheme(theme);
    };


    /**
     * Disable hover reaction on element
     * @public
     */
    Link.prototype.disableHover = function() {
        this.getView().disableHover();
    };


    /**
     * Enable hover reaction on element if it possible (not-mobile device)
     * @public
     */
    Link.prototype.enableHover = function() {
        this.getView().enableHover();
    };


    /**
     * Return isSelected status
     * @return {boolean}
     * @public
     */
    Link.prototype.isSelected = function() {
        return this.getView().isSelected();
    };


    /**
     * Set class SELECTED
     * @public
     */
    Link.prototype.select = function() {
        this.getView().select();
    };


    /**
     * Remove class SELECTED
     * @public
     */
    Link.prototype.deselect = function() {
        this.getView().deselect();
    };


    /**
     * @protected
     * @override
     */
    Link.prototype.decorateInternal = function(element) {
        Link.base(this, 'decorateInternal', element);


        /** Enable hover here as params initialization already occurs */
        if (!this.getView().getParams().disableHover) {
            this.enableHover();
        }
    };


    /**
     * @override
     * @protected
     */
    Link.prototype.enterDocument = function() {
        Link.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Initializes listeners for view
     * @private
     */
    Link.prototype.initViewListeners_ = function() {
        this.autoDispatch(View.Event.CLICK);
    };
});  // goog.scope
