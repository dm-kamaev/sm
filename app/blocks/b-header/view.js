goog.provide('sm.bHeader.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');
goog.require('sm.bBanner.Banner');
goog.require('sm.bSearch.Search');
goog.require('sm.iAnimate.Animate');


/**
 * Button View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sm.bHeader.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bHeader.View,
        Search = sm.bSearch.Search;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        SEARCH_MODE: 'b-header_mode_search',
        DEFAULT_MODE: 'b-header_mode_default',
        ANIMATION_ON: 'b-header_animation_on',
        ANIMATION_OFF: 'b-header_animation_off'
    };


    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.search = this.getElementByClass(
            Search.CssClass.ROOT
        );

        this.dom.banner = this.getElementByClass(
            sm.bBanner.View.CssClass.ROOT
        );

        this.detectAnimationSupportion_();
    };

    /**
     * Switch view to default mode
     */
    View.prototype.switchToDefaultMode = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.SEARCH_MODE
        );
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.DEFAULT_MODE
        );
    };


    /**
     * Switch view to search mode
     */
    View.prototype.switchToSearchMode = function() {
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.SEARCH_MODE
        );
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.DEFAULT_MODE
        );
    };


    /**
     * Turn on animation if it is supported
     * @private
     */
    View.prototype.detectAnimationSupportion_ = function() {
        this.addCssClass(
            sm.iAnimate.Animate.isSupported() ?
                View.CssClass.ANIMATION_ON :
                View.CssClass.ANIMATION_OFF
        );
    };
});
