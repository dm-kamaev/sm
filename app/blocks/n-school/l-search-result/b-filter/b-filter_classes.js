goog.provide('sm.lSearchResult.bFilter.FilterClasses');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('sm.lSearchResult.bFilter.Filter');



/**
 * Classes filter
 * @param {Object=} opt_params
 * @constructor
 * @extends {sm.lSearchResult.bFilter.Filter}
 */
sm.lSearchResult.bFilter.FilterClasses = function(opt_params) {
    goog.base(this);


    /**
     * Reset button
     * @type {Element}
     * @private
     */
    this.filterResetElement_ = null;


    /**
     * Input label class
     * @type {Element}
     * @private
     */
    this.inputLabelClassElements_ = null;


    /**
     * Input class
     * @type {Element}
     * @private
     */
    this.inputClassElements_ = null;


    /**
     * Kindergarten classes input
     * @type {Element}
     * @private
     */
    this.inputClassesKindergartenElement_ = null;
};
goog.inherits(
    sm.lSearchResult.bFilter.FilterClasses,
    sm.lSearchResult.bFilter.Filter
);


goog.scope(function() {
    var FilterClasses = sm.lSearchResult.bFilter.FilterClasses;


    /**
     * CSS-class enum
     * @enum {string}
     */
    FilterClasses.CssClass = {
        'ROOT': 'b-filter_classes',
        'DROPDOWN': 'b-filter__classes-dropdown',
        'INPUT_LABEL_CLASS': 'b-filter__input-label_class',
        'INPUT_CLASS': 'b-filter__input_class',
        'INPUT_LABEL_INACTIVE': 'b-filter__input-label_inactive',
        'FILTER_RESET': 'b-filter__reset',
        'FILTER_RESET_ACTIVE': 'b-filter__reset_active',
        'INPUT_CLASSES_KINDERGARTEN': 'b-filter__input_kindergarten',
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
            'dropdown-select-legacy',
            this.dropdownElement_,
            this
        );

        this.filterResetElement_ = goog.dom.getElementByClass(
            FilterClasses.CssClass.FILTER_RESET,
            element
        );

        this.inputLabelClassElements_ = goog.dom.getElementsByClass(
            FilterClasses.CssClass.INPUT_LABEL_CLASS,
            element
        );

        this.inputClassElements_ = goog.dom.getElementsByClass(
            FilterClasses.CssClass.INPUT_CLASS,
            element
        );

        this.inputClassesKindergartenElement_ = goog.dom.getElementByClass(
            FilterClasses.CssClass.INPUT_CLASSES_KINDERGARTEN,
            element
        );
    };


    /**
     * @override
     */
    FilterClasses.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dropdown_,
            sm.gDropdown.DropdownSelectLegacy.Event.ITEM_SELECT,
            this.onDropdownItemSelect_,
            false,
            this
        );

        this.getHandler().listen(
            this.dropdown_,
            sm.gDropdown.DropdownSelectLegacy.Event.ITEM_SELECT,
            this.onChangeFilter,
            false,
            this
        );

        this.getHandler().listen(
            this.filterResetElement_,
            goog.events.EventType.CLICK,
            this.onClickReset_,
            false,
            this
        );

        for (var i = 0, input; input = this.inputClassElements_[i]; i++) {
            this.getHandler().listen(
                input,
                goog.events.EventType.CLICK,
                this.onClickInputClasses_,
                false,
                this
            );
        }

        if (this.filterResetElement_) {
            this.getHandler().listen(
                this.filterResetElement_,
                goog.events.EventType.CLICK,
                this.onClickResetButton_,
                false,
                this
            );
        }

        if (this.filterResetElement_) {
            this.getHandler().listen(
                this.filterResetElement_,
                goog.events.EventType.CLICK,
                this.onChangeFilter,
                false,
                this
            );
        }

        for (var i = 0; i < this.inputClassElements_.length; i++) {
            this.getHandler().listen(
                this.inputClassElements_[i],
                goog.events.EventType.CHANGE,
                this.onCheckClasses_,
                false,
                this
            );
        }
    };


    /**
     * Select class by index
     * @param {number} index
     */
    FilterClasses.prototype.selectClass = function(index) {
        var idDefaultElementDropdown = this.inputClassElements_.length;

        for (var i = 0; i < this.inputClassElements_.length; i++) {
            this.inputClassElements_[i].checked = false;
        }
        if (index < idDefaultElementDropdown) {
            this.inputClassElements_[index].checked = true;

            this.showCross_();
            this.selectLabel_(index);
        }
    };


    /**
     * Reset filter and hide cross
     * @override
     */
    FilterClasses.prototype.reset = function() {
        goog.base(this, 'reset');

        this.resetKindergarten_();
        this.resetClasses_();
    };


    /**
     * Checks for checked radio
     * @return {boolean}
     * @override
     */
    FilterClasses.prototype.isCheckedInputs = function() {
        var result = goog.base(this, 'isCheckedInputs');

        if (this.inputClassesKindergartenElement_.checked == true) {
            result = true;
        }
        return result;
    };


    /**
     * Handler change item
     * @override
     */
    FilterClasses.prototype.onChangeItem = function() {
    };


    /**
     * Reset filter click event handling
     * @private
     */
    FilterClasses.prototype.onClickResetButton_ = function() {
        this.resetClasses_();
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
    FilterClasses.prototype.onClickReset_ = function(event) {
        this.dropdown_.clear();
    };


    /**
     * Input classes click event handling
     * @param {object} event
     * @private
     */
    FilterClasses.prototype.onClickInputClasses_ = function(event) {
        var index = event.currentTarget.value - 1;
        this.dropdown_.selectByIndex(index);
        this.selectClass(index);
    };


    /**
     * Show reset button
     * @param {Object} event
     * @private
     */
    FilterClasses.prototype.onCheckClasses_ = function(event) {
        if (this.filterResetElement_) {
            if (event.currentTarget.checked) {
                this.showCross_();
            }
            else {
                this.hideCross_();
            }
        }
    };


    /**
     * Reset filter and hide cross
     * @private
     */
    FilterClasses.prototype.resetClasses_ = function() {
        for (var i = 0; i < this.inputClassElements_.length; i++) {
            this.inputClassElements_[i].checked = false;
        }

        this.hideCross_();
        this.resetLabels_();
        this.selectDropdownDefaultElement_();
    };


    /**
     * select the default element
     * @private
     */
    FilterClasses.prototype.selectDropdownDefaultElement_ = function() {
        var idDefaultElement = this.inputClassElements_.length;

        this.dropdown_.selectByIndex(idDefaultElement);
    };


    /**
     * Reset filter Kindergarten
     * @private
     */
    FilterClasses.prototype.resetKindergarten_ = function() {
        this.inputClassesKindergartenElement_.checked = false;
    };


    /**
     * Hide filter classes cross
     * @private
     */
    FilterClasses.prototype.hideCross_ = function() {
        goog.dom.classlist.add(
            this.filterResetElement_,
            FilterClasses.CssClass.HIDDEN
        );
    };


    /**
     * Show filter classes cross
     * @private
     */
    FilterClasses.prototype.showCross_ = function() {
        goog.dom.classlist.remove(
            this.filterResetElement_,
            FilterClasses.CssClass.HIDDEN
        );
    };


    /**
     * Select label by index
     * @param {number} index
     * @private
     */
    FilterClasses.prototype.selectLabel_ = function(index) {
        for (var i = 0; i < this.inputLabelClassElements_.length; i++) {
            goog.dom.classlist.add(
                this.inputLabelClassElements_[i],
                FilterClasses.CssClass.INPUT_LABEL_INACTIVE
            );
        }

        goog.dom.classlist.remove(
            this.inputLabelClassElements_[index],
            FilterClasses.CssClass.INPUT_LABEL_INACTIVE
        );
    };


    /**
     * Set active filter classes
     * @private
     */
    FilterClasses.prototype.resetLabels_ = function() {
        if (this.inputLabelClassElements_.length > 0) {
            for (var i = 0; i < this.inputLabelClassElements_.length; i++) {
                goog.dom.classlist.remove(
                    this.inputLabelClassElements_[i],
                    FilterClasses.CssClass.INPUT_LABEL_INACTIVE
                );
            }
        }
    };
});  // goog.scope
