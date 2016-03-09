goog.provide('sm.lSearchResult.bFilter.FilterClasses');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.events');

goog.require('sm.lSearchResult.bFilter.Filter');

/**
 * TODO: move all classes logic from b-filter to b-filter_classes
 *
 * @param {opject=} opt_params
 * @constructor
 */
sm.lSearchResult.bFilter.FilterClasses = function(opt_params) {
    goog.base(this);

    /**
     * Reset button
     * @type {Element}
     * @protected
     */
    this.filterResetElement = null;

    /**
     * Input label
     * @type {Element}
     * @private
     */
    this.inputLabelElements_ = null;

    /**
     * Ordinary classes input
     * @type {Element}
     * @private
     */
    this.inputClassesOrdinaryElement_ = null;
};
goog.inherits(
    sm.lSearchResult.bFilter.FilterClasses,
    sm.lSearchResult.bFilter.Filter
);


goog.scope(function() {
    var FilterClasses = sm.lSearchResult.bFilter.FilterClasses;
    var Filter = sm.lSearchResult.bFilter.Filter;

    /**
     * CSS-class enum
     * @enum {string}
     */
    FilterClasses.CssClass = {
        'ROOT': 'b-filter_classes',
        'DROPDOWN': 'b-filter__classes-dropdown',
        'INPUT_LABEL': 'b-filter__input-label',
        'INPUT_LABEL_INACTIVE': 'b-filter__input-label_inactive',
        'FILTER_RESET': 'b-filter__reset',
        'FILTER_RESET_ACTIVE': 'b-filter__reset_active',
        'INPUT_CLASSES_ORDINARY': 'b-filter__input-ordinary',
        'HIDDEN': cl.iUtils.Utils.CssClass.HIDDEN
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    FilterClasses.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dropdownElement_ = goog.dom.getElementByClass(
            FilterClasses.CssClass.DROPDOWN,
            element
        );

        var factory = sm.iFactory.FactoryStendhal.getInstance();

        this.dropdown_ = factory.decorate(
            'dropdown-select',
            this.dropdownElement_,
            this
        );

        this.filterResetElement = goog.dom.getElementByClass(
            FilterClasses.CssClass.FILTER_RESET,
            element
        );

        this.inputLabelElements_ = goog.dom.getElementsByClass(
            FilterClasses.CssClass.INPUT_LABEL,
            element
        );

        this.inputClassesOrdinaryElement_ = goog.dom.getElementByClass(
            FilterClasses.CssClass.INPUT_CLASSES_ORDINARY,
            element
        );
    };

    /**
     * Select class by index
     * @param {number} index
     */
    FilterClasses.prototype.selectClass = function(index) {
        for (var i = 0; i < this.inputElements.length; i++) {
            this.inputElements[i].checked = false;
        }
        this.inputElements[index].checked = true;

        goog.dom.classlist.remove(
            this.filterResetElement,
            Filter.CssClass.HIDDEN
        );

        for (var i = 0; i < this.inputLabelElements_.length; i++) {
            goog.dom.classlist.add(
                this.inputLabelElements_[i],
                FilterClasses.CssClass.INPUT_LABEL_INACTIVE
            );

            goog.dom.classlist.remove(
                this.inputLabelElements_[index],
                FilterClasses.CssClass.INPUT_LABEL_INACTIVE
            );
        }

    };

    /**
     * @override
     */
    FilterClasses.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dropdown_,
            sm.gDropdown.DropdownSelect.Event.ITEM_SELECT,
            this.onDropdownItemSelect_,
            false,
            this
        );

        this.getHandler().listen(
            this.filterResetElement,
            goog.events.EventType.CLICK,
            this.onResetClick_,
            false,
            this
        );

        for (var i = 0, input; input = this.inputElements[i]; i++) {
            this.getHandler().listen(
                input,
                goog.events.EventType.CLICK,
                this.onInputClassesClick_,
                false,
                this
            );
        }

        if (this.filterResetElement) {
            this.getHandler().listen(
                this.filterResetElement,
                goog.events.EventType.CLICK,
                this.reset,
                false,
                this
            );
        }

        for (var i = 0; i < this.inputElements.length; i++) {
            this.getHandler().listen(
                this.inputElements[i],
                goog.events.EventType.CHANGE,
                this.onCheckClasses_,
                false,
                this
            );
        }

        if (this.inputClassesOrdinaryElement_) {
            this.getHandler().listen(
                this.inputClassesOrdinaryElement_,
                goog.events.EventType.CLICK,
                this.hasCheckedInputClasses_
            );
        }

    };

    /**
     * Dropdown item select event handling
     * @param {object} event
     * @private
     */
    FilterClasses.prototype.onDropdownItemSelect_ = function(event) {
        this.selectClass(event['itemId']);
    };

    /**
     * Reset button click event handling
     * @param {object} event
     * @private
     */
    FilterClasses.prototype.onResetClick_ = function(event) {
        this.dropdown_.clear();
    };

    /**
     * Input classes click event handling
     * @param {object} event
     * @private
     */
    FilterClasses.prototype.onInputClassesClick_ = function(event) {
        var index = event.currentTarget.value - 1;
        this.dropdown_.selectByIndex(index);
        this.selectClass(index);
    };

    /**
     * Checks for checked radio
     * @return {boolean}
     * @private
     */
    FilterClasses.prototype.hasCheckedInputClasses_ = function() {
        var result = false;

        for (var i = 0; i < this.inputElements.length; i++) {
            if (this.inputElements[i].checked) {
                result = true;
            }
        }

        return result;
    };

    /**
     * Show reset button
     * @param {Object} event
     * @private
     */
    FilterClasses.prototype.onCheckClasses_ = function(event) {
        if (this.filterResetElement) {
            if (event.currentTarget.checked || this.hasCheckedInputClasses_()) {
                goog.dom.classlist.remove(
                    this.filterResetElement,
                    FilterClasses.CssClass.HIDDEN
                );
            }
            else {
                goog.dom.classlist.add(
                    this.filterResetElement,
                    FilterClasses.CssClass.HIDDEN
                );
            }
        }
    };

    /**
     * Reset filter and hide cross
     * @override
     */
    FilterClasses.prototype.reset = function() {
        this.onClickResetButton();

        if (this.inputLabelElements_.length > 0) {
            for (var i = 0; i < this.inputLabelElements_.length; i++) {
                goog.dom.classlist.remove(
                    this.inputLabelElements_[i],
                    FilterClasses.CssClass.INPUT_LABEL_INACTIVE
                );
            }
        }

        if (this.filterResetElement) {
            goog.dom.classlist.add(
                this.filterResetElement,
                FilterClasses.CssClass.HIDDEN
            );
        }
    };

    /**
     * Reset filter Oridinary
     * @override
     */
    FilterClasses.prototype.resetOridinary = function() {
       if (this.inputClassesOrdinaryElement_) {
           this.inputClassesOrdinaryElement_.checked = false;
       }
    };
});
