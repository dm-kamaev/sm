goog.provide('sm.bHeader.View');

goog.require('cl.iControl.View');

goog.require('goog.dom.classes');
goog.require('cl.iUtils.Utils');


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
        Utils = cl.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        SEARCH_MODE: 'b-header_mode_search',
        SEARCH_BUTTON: 'b-header__button_search',
        CLOSE_BUTTON: 'b-header__button_close',
        FADER: 'b-header__fader'
    };

    /**
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.searchButton =
            this.getElementByClass(View.CssClass.SEARCH_BUTTON);

        this.dom.closeButton =
            this.getElementByClass(View.CssClass.CLOSE_BUTTON);

        this.dom.fader =
            this.getElementByClass(View.CssClass.FADER);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.searchButton,
            goog.events.EventType.CLICK,
            this.searchButtonClick_
        ).listen(
            this.dom.closeButton,
            goog.events.EventType.CLICK,
            this.closeButtonClick_
        ).listen(
            this.dom.fader,
            goog.events.EventType.CLICK,
            this.closeButtonClick_
        );
    };


    View.prototype.searchButtonClick_ = function() {
        goog.dom.classes.add(
            this.getElement(),
            View.CssClass.SEARCH_MODE
        );

        goog.dom.classes.add(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
    };


    View.prototype.closeButtonClick_ = function() {
        goog.dom.classes.remove(
            this.getElement(),
            View.CssClass.SEARCH_MODE
        );

        goog.dom.classes.remove(
            document.documentElement,
            Utils.CssClass.OVERFLOW_HIDDEN
        );
    };
});
