goog.provide('sm.lSearch.bFilter.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Filter View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.lSearch.bFilter.View = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);

    /**
     * Hide or show content
     * @type {boolean}
     * @private
     */
    this.contentVisibility_ = null;
};
goog.inherits(sm.lSearch.bFilter.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.View,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter',
        HEADER: 'b-sm-filter__header',
        BUTTON_SWITCH_CONTENT_VISIBILITY: 'b-sm-filter__header_button',
        ICON_UP: 'b-sm-filter__header-icon_up',
        ICON_DOWN: 'b-sm-filter__header-icon_down',
        CONTENT: 'b-sm-filter__content',
        LIST_OPTIONS: 'b-sm-filter__list-options',
        OPTION: 'b-sm-filter__option',
        OPTION_HIDABLE: 'b-sm-filter__option_hidable',
        BUTTON_SHOW_MORE: 'b-sm-filter__button_show-more',
        BUTTON_SHOW_LESS: 'b-sm-filter__button_show-less'
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initButtons(element);
        this.initHeader(element);
        this.initContainers(element);

        this.initStateContentVisibility();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initButtonsListeners();
        this.initHeaderControlsListeners();
    };


    /**
     * Expand filter
     */
    View.prototype.expand = function() {
        this.setContentVisibility_(true);
        this.setHeaderIconUpState_(true);

        this.contentVisibility_ = true;
    };


    /**
     * Collapse filter
     */
    View.prototype.collapse = function() {
        if (this.dom.buttonSwitchContentVisibility) {
            this.setContentVisibility_(false);
            this.setHeaderIconUpState_(false);

            this.contentVisibility_ = false;
        }
    };


    /**
     * Remove option (dom element)
     * @param {Element} option
     */
    View.prototype.removeOption = function(option) {
        var container = goog.dom.getAncestorByClass(
            option,
            View.CssClass.OPTION
        );

        goog.dom.removeNode(
            container
        );
    };


    /**
     * Add option (dom element)
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     * @param {number=} opt_index
     */
    View.prototype.addOption = function(data, opt_index) {
        var option = this.renderOption(data);

        goog.dom.insertChildAt(
            this.dom.list,
            option,
            opt_index
        );
    };


    /**
     * Get offset of option
     * @param {Object} option
     * @return {number}
     */
    View.prototype.getOptionOffset = function(option) {
        var element = option.getElement();
        return element.offsetTop;

    };


    /**
     * Initializes options
     * @param {Element=} opt_element
     */
    View.prototype.initOptions = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.wrapOptionsHidable = goog.dom.getElementsByClass(
            View.CssClass.OPTION_HIDABLE,
            element
        );

        this.dom.options = goog.dom.getElementsByClass(
            sm.bSmCheckbox.View.CssClass.ROOT,
            element
        );
    };


    /**
     * adds or deletes class to show header
     * @param {bool} visible
     */
    View.prototype.setHeaderVisibility = function(visible) {
        if (this.dom.header) {
            var isContains = goog.dom.classlist.contains(
                this.dom.header,
                Utils.CssClass.HIDDEN
            );

            if (visible && isContains) {
                goog.dom.classlist.remove(
                    this.dom.header,
                    Utils.CssClass.HIDDEN
                );
            }
            else if (!visible && !isContains) {
                goog.dom.classlist.add(
                    this.dom.header,
                    Utils.CssClass.HIDDEN
                );
            }
        }
    };


    /**
     * Render option
     * @param {sm.bSmCheckbox.SmCheckbox.Params} data
     * @return {Element}
     * @protected
     */
    View.prototype.renderOption = function(data) {
        return goog.soy.renderAsElement(
            sm.lSearch.bFilter.Template.option, {
                params: {
                    data: data
                }
            },
            {
                factoryIndex: this.getFactory().getIndex()
            }
        );
    };


    /**
     * Initializes buttons
     * @param {Element} element
     * @protected
     */
    View.prototype.initButtons = function(element) {
        this.dom.buttonShowMore = goog.dom.getElementByClass(
            View.CssClass.BUTTON_SHOW_MORE,
            element
        );

        this.dom.buttonShowLess = goog.dom.getElementByClass(
            View.CssClass.BUTTON_SHOW_LESS,
            element
        );
    };


    /**
     * Initializes listeners for buttons
     * @protected
     */
    View.prototype.initButtonsListeners = function() {
        var handler = this.getHandler();

        if (this.dom.buttonShowMore) {
            handler.listen(
                this.dom.buttonShowMore,
                goog.events.EventType.CLICK,
                this.onButtonShowMoreClick_
            );

            handler.listen(
                this.dom.buttonShowLess,
                goog.events.EventType.CLICK,
                this.onButtonShowLessClick_
            );
        }
    };


    /**
     * Initializes header and his controls
     * @param {Element} element
     * @protected
     */
    View.prototype.initHeader = function(element) {
        this.dom.header = goog.dom.getElementByClass(
            View.CssClass.HEADER,
            element
        );

        this.dom.buttonSwitchContentVisibility = goog.dom.getElementByClass(
            View.CssClass.BUTTON_SWITCH_CONTENT_VISIBILITY,
            element
        );

        this.dom.iconUp = goog.dom.getElementByClass(
            View.CssClass.ICON_UP,
            element
        );

        this.dom.iconDown = goog.dom.getElementByClass(
            View.CssClass.ICON_DOWN,
            element
        );
    };


    /**
     * Initializes listeners for header controls
     * @protected
     */
    View.prototype.initHeaderControlsListeners = function() {
        var handler = this.getHandler();

        if (this.dom.buttonSwitchContentVisibility) {
            handler.listen(
                this.dom.buttonSwitchContentVisibility,
                goog.events.EventType.CLICK,
                this.onSwitchContentVisibilityClick_
            );
        }
    };


    /**
     * Button show or hide content handler
     * @private
     */
    View.prototype.onSwitchContentVisibilityClick_ = function() {
        this.contentVisibility_ ?
            this.collapse() :
            this.expand();
    };


    /**
     * Button show more handler
     * @private
     */
    View.prototype.onButtonShowMoreClick_ = function() {
        this.showMore_();
    };


    /**
     * Button show less handler
     * @private
     */
    View.prototype.onButtonShowLessClick_ = function() {
        this.showLess_();
    };


    /**
     * Show more options
     * @private
     */
    View.prototype.showMore_ = function() {
        this.setMoreOptionsVisibility_(true);
        this.setButtonMoreState_(true);
    };


    /**
     * Hide more options
     * @private
     */
    View.prototype.showLess_ = function() {
        this.setMoreOptionsVisibility_(false);
        this.setButtonMoreState_(false);
    };


    /**
     * Hide shown options or show hidden options
     * @param {boolean} visible
     * @private
     */
    View.prototype.setMoreOptionsVisibility_ = function(visible) {
        var options = Array.prototype.slice.call(
            this.dom.wrapOptionsHidable,
            0
        );

        options.forEach(function(option) {
            visible ?
                goog.dom.classlist.remove(
                    option,
                    Utils.CssClass.HIDDEN
                ) :
                goog.dom.classlist.add(
                    option,
                    Utils.CssClass.HIDDEN
                );
        });
    };


    /**
     * Adds or deletes classes to switch buttons (buttons more and less)
     * @param {boolean} isMore
     * @private
     */
    View.prototype.setButtonMoreState_ = function(isMore) {
        if (isMore) {
            goog.dom.classlist.add(
                this.dom.buttonShowMore,
                Utils.CssClass.HIDDEN
            );
            goog.dom.classlist.remove(
                this.dom.buttonShowLess,
                Utils.CssClass.HIDDEN
            );
        } else {
            goog.dom.classlist.add(
                this.dom.buttonShowLess,
                Utils.CssClass.HIDDEN
            );

            goog.dom.classlist.remove(
                this.dom.buttonShowMore,
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Adds or deletes class to show content
     * @param {boolean} visible
     * @private
     */
    View.prototype.setContentVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.content,
                Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.content,
                Utils.CssClass.HIDDEN
            );
    };


    /**
     * Adds or deletes classes to switch header icons
     * @param {boolean} isUp
     * @private
     */
    View.prototype.setHeaderIconUpState_ = function(isUp) {
        if (isUp) {
            goog.dom.classlist.remove(
                this.dom.iconUp,
                Utils.CssClass.HIDDEN
            );
            goog.dom.classlist.add(
                this.dom.iconDown,
                Utils.CssClass.HIDDEN
            );
        } else {
            goog.dom.classlist.remove(
                this.dom.iconDown,
                Utils.CssClass.HIDDEN
            );

            goog.dom.classlist.add(
                this.dom.iconUp,
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Initializes containers
     * @param {Element} element
     * @protected
     */
    View.prototype.initContainers = function(element) {
        this.dom.content = goog.dom.getElementByClass(
            View.CssClass.CONTENT,
            element
        );

        this.dom.list = goog.dom.getElementByClass(
            View.CssClass.LIST_OPTIONS,
            element
        );
    };


    /**
     * Initializes state content visibility
     * @protected
     */
    View.prototype.initStateContentVisibility = function() {
        if (this.dom.buttonSwitchContentVisibility) {
            var isUp = goog.dom.classlist.contains(
                this.dom.iconDown,
                Utils.CssClass.HIDDEN
            );

            this.contentVisibility_ = isUp;
        }
    };


    /**
     * Return data-params from dom element
     * @return {{
     *    name: string,
     *    type: (string|undefined)
     * }}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');
        this.params = !goog.object.isEmpty(rawParams) ?
            this.transformParams(rawParams) :
            null;

        return this.params;
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            name: rawParams['name'],
            type: rawParams['type']
        };
    };
});  // goog.scope
