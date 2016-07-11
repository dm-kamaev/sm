goog.provide('sm.lSearchResult.bFilter.FilterLabels');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('sm.lSearchResult.bFilter.Filter');



/**
 * Constructor
 * @param {Object=} opt_params
 * @constructor
 * @extends {sm.lSearchResult.bFilter.Filter}
 */
sm.lSearchResult.bFilter.FilterLabels = function(opt_params) {
    goog.base(this);


    /**
     * Crosses to remove items
     * @type {Element}
     * @private
     */
    this.crossRemove_ = [];


    /**
     * Button with number hidden items
     * @type {Element}
     * @private
     */
    this.buttonMore_ = null;


    /**
     * number hidden items
     * @type {Element}
     * @private
     */
    this.numberHiddenItems_ = null;


    /**
     * number show items
     * @type {number}
     * @private
     */
    this.numberShowItems_ =
        sm.lSearchResult.bFilter.FilterLabels.numberShowItems;
};
goog.inherits(
    sm.lSearchResult.bFilter.FilterLabels,
    sm.lSearchResult.bFilter.Filter
);


goog.scope(function() {
    var FilterLabels = sm.lSearchResult.bFilter.FilterLabels,
        Filter = sm.lSearchResult.bFilter.Filter,
        Utils = cl.iUtils.Utils;


    /**
     * CSS-class enum
     * @enum {string}
     */
    FilterLabels.CssClass = {
        ROOT: 'b-filter_labels',
        REMOVE: 'b-filter__remove',
        BUTTON_MORE: 'b-filter__button_more',
        BUTTON_NUMBER: 'b-filter__button-number',
        FILTER_SECTION: Filter.CssClass.FILTER_SECTION
    };


    /**
     * Event enum
     * @enum {string}
     */
    FilterLabels.Event = {
        UNCHECKED_ITEM: Filter.Event.UNCHECKED_ITEM
    };


    /**
     * Number filters to show
     * @const {number}
     */
    FilterLabels.numberShowItems = 6;


    /**
     * Remove item
     * @param {({
     *     value: string,
     *     label: string,
     *     name: string
     * }|Element)} data
     * @public
     */
    FilterLabels.prototype.removeItem = function(data) {
        this.removeNode_(data);
        this.initFilterItems();

        this.changeButtonState_();
        this.showLastHiddenItem_();
    };


    /**
     * Add item
     * @param {{
     *     value: string,
     *     label: string,
     *     name: string
     * }} params data-params Element
     * @public
     */
    FilterLabels.prototype.addItem = function(params) {
        this.renderItem_(params);
        this.initFilterItems();
        this.initFilterItemsListeners();

        this.changeButtonState_();
        this.hideLastShownItem_();
    };


    /**
     * Init Filter Items
     * @param {Element=} opt_element
     * @override
     */
    FilterLabels.prototype.initFilterItems = function(opt_element) {
        var element = opt_element ? opt_element : this.getElement();

        this.filterSectionElements = goog.dom.getElementsByClass(
            Filter.CssClass.FILTER_SECTION,
            element
        );

        this.inputElements = goog.dom.getElementsByClass(
            Filter.CssClass.INPUT,
            element
        );

        this.crossRemove_ = this.getElementsByClass(
            FilterLabels.CssClass.REMOVE
        );
    };


    /**
     * Init Buttons and her elements
     * @param {Element} element
     * @protected
     */
    FilterLabels.prototype.initButtons = function(element) {
        this.buttonMore_ = goog.dom.getElementByClass(
            FilterLabels.CssClass.BUTTON_MORE,
            element
        );

        this.numberHiddenItems_ = goog.dom.getElementByClass(
            FilterLabels.CssClass.BUTTON_NUMBER,
            element
        );
    };


    /**
     * Init Filter Items Listeners
     * @override
     */
    FilterLabels.prototype.initFilterItemsListeners = function() {
        var handler = this.getHandler();

        if (this.crossRemove_.length) {
            for (var i = 0; i < this.crossRemove_.length; i++) {
                handler.listen(
                    this.crossRemove_[i],
                    goog.events.EventType.CLICK,
                    this.onRemoveClick_
                );
            }
        }
    };


    /**
     * on Remove Click
     * @param {Object} event
     * @private
     */
    FilterLabels.prototype.onRemoveClick_ = function(event) {
        this.removeItem(event.target);

        var filterSection = this.getItem_(event.target);

        this.dispatchEvent({
            'type': FilterLabels.Event.UNCHECKED_ITEM,
            'data': this.getDataParams(filterSection)
        });
    };


    /**
     * Get filter section
     * @param {Element} childNodeFilterSection
     * @return {Element} filter section
     * @private
     */
    FilterLabels.prototype.getItem_ = function(childNodeFilterSection) {
        return goog.dom.getAncestorByClass(
            childNodeFilterSection,
            FilterLabels.CssClass.FILTER_SECTION
        );
    };


    /**
     * Change state of the button, when added or removed filter item
     * @private
     */
    FilterLabels.prototype.changeButtonState_ = function() {
        var numberAllItems = this.filterSectionElements.length;

        if (numberAllItems == this.numberShowItems_) {
            this.hideButtonMore_();
        }
        else if (numberAllItems == this.numberShowItems_ + 1) {
            this.showButtonMore_();
        }

        if (numberAllItems > this.numberShowItems_) {
            this.insertNumberInButton_(numberAllItems - this.numberShowItems_);
        }
    };


    /**
     * show Button More
     * @private
     */
    FilterLabels.prototype.showButtonMore_ = function() {
        goog.dom.classlist.remove(
            this.buttonMore_,
            Utils.CssClass.HIDDEN
        );
    };


    /**
     * hide Button More
     * @private
     */
    FilterLabels.prototype.hideButtonMore_ = function() {
        goog.dom.classlist.add(
            this.buttonMore_,
            Utils.CssClass.HIDDEN
        );
    };


    /**
     * show last hidden filter item
     * @private
     */
    FilterLabels.prototype.showLastHiddenItem_ = function() {
        if (this.filterSectionElements.length + 1 > this.numberShowItems_) {
            goog.dom.classlist.remove(
                this.filterSectionElements[this.numberShowItems_ - 1],
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * hide last shown filter item
     * @private
     */
    FilterLabels.prototype.hideLastShownItem_ = function() {
        if (this.filterSectionElements.length > this.numberShowItems_) {
            goog.dom.classlist.add(
                this.filterSectionElements[this.numberShowItems_],
                Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Remove node
     * @param {({
     *     value: string,
     *     label: string,
     *     name: string
     * }|Element)} data
     * @private
     */
    FilterLabels.prototype.removeNode_ = function(data) {
        var domElement;

        if (data instanceof Node) {
            domElement = data;
        } else {
            domElement = this.findInput(data.value);
        }

        var filterSection = this.getItem_(domElement);
        goog.dom.removeNode(filterSection);
    };


    /**
     * Render item
     * @param {{
     *     value: string,
     *     label: string,
     *     name: string
     * }} templateParams
     * @private
     */
    FilterLabels.prototype.renderItem_ = function(templateParams) {
        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bFilterLabels.Template.filter, {
                params: {
                    filter: {
                        label: templateParams.label,
                        value: templateParams.value,
                        isChecked: true
                    },
                    name: templateParams.name
                }
            }
        );

        goog.dom.insertChildAt(
            this.wrapperListFilters,
            element,
            0
        );
    };


    /**
     * insert Number hidden items In Button
     * @param {number} numberHiddenItems
     * @private
     */
    FilterLabels.prototype.insertNumberInButton_ = function(numberHiddenItems) {
        goog.dom.setTextContent(
            this.numberHiddenItems_,
            numberHiddenItems
        );
    };
});  // goog.scope
