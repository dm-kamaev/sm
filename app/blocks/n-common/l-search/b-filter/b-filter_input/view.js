goog.provide('sm.lSearch.bFilter.ViewInput');

goog.require('sm.lSearch.bFilter.View');



/**
 * Filter input View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewInput = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewInput.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.lSearch.bFilter.ViewInput, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewInput,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_input',
        PLACEHOLDER: 'b-sm-filter__placeholder',
        BUTTON_RESET: 'b-sm-filter__button_reset',
        OPTION: sm.lSearch.bFilter.View.CssClass.OPTION,
        OPTION_HIDABLE: sm.lSearch.bFilter.View.CssClass.OPTION_HIDABLE
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        RESET_CLICK: goog.events.getUniqueId('reset-click')
    };


    /**
     * Show option
     * @param {Element} option
     * @override
     * @public
     */
    View.prototype.showOption = function(option) {
        View.base(this, 'showOption', option);

        this.updatePlaceholderVisibility_();
    };


    /**
     * Hide option
     * @param {Element} option
     * @override
     * @public
     */
    View.prototype.hideOption = function(option) {
        View.base(this, 'hideOption', option);

        this.updatePlaceholderVisibility_();
    };


    /**
     * Show or hide placeholder, it depends on number of visible options
     * @param {Element} option
     * @override
     * @public
     */
    View.prototype.updatePlaceholderVisibility_ = function() {
        var shownOptions = this.getNumberShownOptions();

        if (this.dom.placeholder) {
            if (shownOptions <= this.params.minOptionsToShowPlaceholder) {
                this.showElement(this.dom.placeholder);
            } else {
                this.hideElement(this.dom.placeholder);
            }
        }
    };


    /**
     * Initializes options
     */
    View.prototype.initOptions = function() {
        this.dom.wrapOptionsHidable = this.getElementsByClass(
            View.CssClass.OPTION_HIDABLE
        );

        this.dom.wrapOptions = this.getElementsByClass(
            View.CssClass.OPTION
        );

        this.dom.options = this.getElementsByClass(
            sm.gInput.ViewStendhal.CssClass.ROOT
        );
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initPlaceholder_();
    };


    /**
     * Initializes buttons
     * @param {Element} element
     * @override
     */
    View.prototype.initButtons = function(element) {
        this.dom.buttonReset = goog.dom.getElementByClass(
            View.CssClass.BUTTON_RESET,
            element
        );
    };


    /**
     * Adds or deletes class to show button reset
     * @override
     */
    View.prototype.setButtonResetVisibility = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.buttonReset,
                Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.buttonReset,
                Utils.CssClass.HIDDEN
            );
    };


    /**
     * Initializes listeners for buttons
     * @override
     */
    View.prototype.initButtonsListeners = function() {
        var handler = this.getHandler();

        handler.listen(
            this.dom.buttonReset,
            goog.events.EventType.CLICK,
            this.onButtonResetClick_
        );
    };


    /**
     * Transform raw params to compressed ones
     * @param {{
     *     name: string,
     *     type: string,
     *     optionsTheme: ?string,
     *     customIcon: ?{
     *         check: string,
     *         uncheck: string
     *     },
     *     minOptionsToShowPlaceholder: ?number
     * }} rawParams
     * @return {{
     *     name: string,
     *     type: string,
     *     optionsTheme: ?string,
     *     customIcon: ?{
     *         check: string,
     *         uncheck: string
     *     },
     *     minOptionsToShowPlaceholder: ?number
     * }}
     * @override
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        var params = View.base(this, 'transformParams', rawParams);

        params.minOptionsToShowPlaceholder =
            rawParams['minOptionsToShowPlaceholder'];

        return params;
    };


    /**
     * Button reset handler
     * @private
     */
    View.prototype.onButtonResetClick_ = function() {
        this.dispatchEvent({
            'type': View.Event.RESET_CLICK
        });
    };


    /**
     * Init placeholder
     * @private
     */
    View.prototype.initPlaceholder_ = function() {
        this.dom.placeholder = this.getElementByClass(
            View.CssClass.PLACEHOLDER
        );
    };
});  // goog.scope
