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
};
goog.inherits(
    sm.lSearchResult.bFilter.FilterLabels,
    sm.lSearchResult.bFilter.Filter
);


goog.scope(function() {
    var FilterLabels = sm.lSearchResult.bFilter.FilterLabels,
        Filter = sm.lSearchResult.bFilter.Filter;


    /**
     * CSS-class enum
     * @enum {string}
     */
    FilterLabels.CssClass = {
        'ROOT': 'b-filter_labels',
        'REMOVE': 'b-filter__remove',
        'FILTER_SECTION': Filter.CssClass.FILTER_SECTION
    };


    /**
     * Event enum
     * @enum {string}
     */
    FilterLabels.Event = {
        CHECKED_FILTER: Filter.Event.CHECKED_FILTER,
        UNCHECKED_FILTER: Filter.Event.UNCHECKED_FILTER,
        UNCHECKED_ITEM: Filter.Event.UNCHECKED_ITEM
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    FilterLabels.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initFilterItems(element);
    };


    /**
     * @override
     */
    FilterLabels.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initFilterItemsListeners();
    };


    /**
     * Remove item
     * @param {({
     *     value: string,
     *     label: string,
     *     name: string,
     *     id: string
     * }|Element)} data
     * @public
     */
    FilterLabels.prototype.removeItem = function(data) {
        var domElement;

        if (data instanceof Node) {
            domElement = data;
        } else {
            domElement = this.findInput(data.value);
        }

        var filterSection = this.getItem_(domElement);
        goog.dom.removeNode(filterSection);

        this.initFilterItems(this.getElement());
        this.initFilterItemsListeners();

        this.dispatchEvent({
            'type': FilterLabels.Event.UNCHECKED_FILTER
        });
    };


    /**
     * Add item
     * @param {{
     *     value: string,
     *     label: string,
     *     name: string,
     *     id: string
     * }} params data-params Element
     * @public
     */
    FilterLabels.prototype.addItem = function(params) {
        this.renderItem_(params);

        this.initFilterItems(this.getElement());
        this.initFilterItemsListeners();

        this.dispatchEvent({
            'type': FilterLabels.Event.CHECKED_FILTER
        });
    };


    /**
     * Handler change item
     * @param {Object} event
     * @override
     */
    FilterLabels.prototype.onChangeItem = function() {
        var filterSection = this.getItem_(event.target);

        this.dispatchEvent({
            'type': FilterLabels.Event.UNCHECKED_ITEM,
            'data': this.getDataParams(filterSection)
        });
    };


    /**
     * Init Filter Items
     * @param {Element} element
     * @override
     */
    Filter.prototype.initFilterItems = function(element) {
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
     * Init Filter Items Listeners
     * @override
     */
    Filter.prototype.initFilterItemsListeners = function() {
        var handler = this.getHandler();

        for (var i = 0; i < this.inputElements.length; i++) {
            handler.listen(
                this.inputElements[i],
                goog.events.EventType.CLICK,
                this.onChangeFilter
            );

            handler.listen(
                this.inputElements[i],
                goog.events.EventType.CLICK,
                this.onChangeItem
            );
        }

        if (this.crossRemove_.length) {
            for (var i = 0; i < this.crossRemove_.length; i++) {
                this.getHandler().listen(
                    this.crossRemove_[i],
                    goog.events.EventType.CLICK,
                    this.onRemoveClick_
                );

                this.getHandler().listen(
                    this.crossRemove_[i],
                    goog.events.EventType.CLICK,
                    this.onChangeItem
                );
            }
        }
    };


    /**
     * Remove filter item click
     * @param {Object} event
     * @private
     */
    FilterLabels.prototype.onRemoveClick_ = function(event) {
        this.removeItem(event.target);

        this.dispatchEvent({
            'type': FilterLabels.CssClass.UNCHECKED_ITEM
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
     * Render item
     * @param {{
     *     value: string,
     *     label: string,
     *     name: string,
     *     id: string
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
                        id: templateParams.id,
                        isChecked: true
                    },
                    name: templateParams.name
                }
            }
        );
        goog.dom.appendChild(this.filtersElement, element);
    };
});  // goog.scope
