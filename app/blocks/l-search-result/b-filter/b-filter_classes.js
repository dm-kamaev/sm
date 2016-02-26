goog.provide('sm.lSearchResult.bFilter.FilterClasses');

goog.require('sm.lSearchResult.bFilter.Filter');


/**
 * TODO: move all classes logic from b-filter to b-filter_classes
 *
 * @param {opject=} opt_params
 * @constructor
 */
sm.lSearchResult.bFilter.FilterClasses = function(opt_params) {
    goog.base(this);
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
        'DROPDOWN': 'b-filter__classes-dropdown'
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
    };

    /**
     * Select class by index
     * @param {number} index
     */
    FilterClasses.prototype.selectClass = function(index) {
        for (var i = 0; i < this.inputClassesElements.length; i++) {
            this.inputClassesElements[i].checked = false;
        }
        this.inputClassesElements[index].checked = true;

        goog.dom.classlist.remove(
            this.filterResetElement,
            Filter.CssClass.HIDDEN
        );
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

        for (var i = 0, input; input = this.inputClassesElements[i]; i++) {
            this.getHandler().listen(
                input,
                goog.events.EventType.CLICK,
                this.onInputClassesClick_,
                false,
                this
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
        this.dropdown_.selectByIndex(event.currentTarget.value - 1);
    };
});
