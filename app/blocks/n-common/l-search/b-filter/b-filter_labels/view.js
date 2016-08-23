goog.provide('sm.lSearch.bFilter.ViewLabels');

goog.require('sm.lSearch.bFilter.View');



/**
 * Filter labels View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.lSearch.bFilter.View}
 */
sm.lSearch.bFilter.ViewLabels = function(opt_params, opt_type, opt_modifier) {
    sm.lSearch.bFilter.ViewLabels.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);


    /**
     * Number show options
     * @type {number}
     * @private
     */
    this.numberShowOptions_ =
        sm.lSearch.bFilter.ViewLabels.numberShowOptions;
};
goog.inherits(sm.lSearch.bFilter.ViewLabels, sm.lSearch.bFilter.View);

goog.scope(function() {
    var View = sm.lSearch.bFilter.ViewLabels,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-filter_labels',
        WRAP_OPTION: 'b-sm-filter__option',
        BUTTON_MORE: 'b-sm-filter__button_more',
        BUTTON_NUMBER: 'b-sm-filter__button-number'
    };


    /**
     * Number options to show
     * @const {number}
     */
    View.numberShowOptions = 6;


    /**
     * Initializes options
     * @param {Element=} opt_element
     */
    View.prototype.initOptions = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.wrapOptions = goog.dom.getElementsByClass(
            View.CssClass.WRAP_OPTION,
            element
        );

        this.dom.options = goog.dom.getElementsByClass(
            sm.lSearch.bLabel.View.CssClass.ROOT,
            element
        );
    };


    /**
     * Change state of the button, when added or removed filter option
     */
    View.prototype.changeButtonState = function() {
        var numberAllItems = this.dom.options.length;

        if (numberAllItems == this.numberShowOptions_) {
            this.setButtonMoreVisibility_(false);
        }
        else if (numberAllItems == this.numberShowOptions_ + 1) {
            this.setButtonMoreVisibility_(true);
        }

        if (numberAllItems > this.numberShowOptions_) {
            var numberHiddenItems = numberAllItems - this.numberShowOptions_;
            this.insertNumberInButton_(numberHiddenItems);
        }
    };


    /**
     * show last hidden filter item
     */
    View.prototype.showLastHiddenItem = function() {
        if (this.dom.wrapOptions.length + 1 > this.numberShowOptions_) {
            goog.dom.classlist.remove(
                this.dom.wrapOptions[this.numberShowOptions_ - 1],
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * hide last shown filter item
     */
    View.prototype.hideLastShownItem = function() {
        if (this.dom.wrapOptions.length > this.numberShowOptions_) {
            goog.dom.classlist.add(
                this.dom.wrapOptions[this.numberShowOptions_],
                Utils.CssClass.HIDDEN
            );
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
            sm.lSearch.bFilter.TemplateLabels.option, {
                params: {
                    data: data,
                    config: {
                        stylizationModifier: this.getStylization()
                    }
                }
            }
        );
    };


    /**
     * Initializes buttons
     * @param {Element} element
     * @override
     */
    View.prototype.initButtons = function(element) {
        this.dom.buttonMore = goog.dom.getElementByClass(
            View.CssClass.BUTTON_MORE,
            element
        );

        this.dom.numberHiddenItems = goog.dom.getElementByClass(
            View.CssClass.BUTTON_NUMBER,
            element
        );
    };


    /**
     * Initializes listeners for buttons
     * @override
     */
    View.prototype.initButtonsListeners = function() {
    };


    /**
     * Adds or deletes classes to show button "more"
     * @param {boolean} visible
     * @private
     */
    View.prototype.setButtonMoreVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.buttonMore,
                Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.buttonMore,
                Utils.CssClass.HIDDEN
            );
    };


    /**
     * insert Number hidden items In Button
     * @param {number} numberHiddenItems
     * @private
     */
    View.prototype.insertNumberInButton_ = function(numberHiddenItems) {
        goog.dom.setTextContent(
            this.dom.numberHiddenItems,
            numberHiddenItems
        );
    };
});  // goog.scope
