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

        var handler = this.getHandler();

        handler.listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onRootElementClick_
        );
    };


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
        var domElement;

        if (data instanceof Node) {
            domElement = data;
        } else {
            domElement = this.findInput(data.value);
        }

        var filterSection = this.getItem_(domElement);
        goog.dom.removeNode(filterSection);

        this.initFilterItems(this.getElement());

        this.dispatchEvent({
            'type': FilterLabels.Event.UNCHECKED_FILTER
        });
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
        this.initFilterItems(this.getElement());

        this.dispatchEvent({
            'type': FilterLabels.Event.CHECKED_FILTER
        });
    };


    /**
     * Init Filter Items
     * @param {Element} element
     * @override
     */
    FilterLabels.prototype.initFilterItems = function(element) {
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
    FilterLabels.prototype.initFilterItemsListeners = function() {
    };


    /**
     * on Root Element Click
     * @param {Object} event
     * @private
     */
    FilterLabels.prototype.onRootElementClick_ = function(event) {
        if (this.isRemoveClick_(event.target)) {
            this.removeItem(event.target);

            var filterSection = this.getItem_(event.target);

            this.dispatchEvent({
                'type': FilterLabels.Event.UNCHECKED_ITEM,
                'data': this.getDataParams(filterSection)
            });
        }
    };


    /**
     * Checks is a Remove node or not
     * @return {Element} node
     * @private
     */
    FilterLabels.prototype.isRemoveClick_ = function(node) {
        var result;

        for (var i = 0; i < this.crossRemove_.length; i++) {
            var isContains = goog.dom.contains(
                this.crossRemove_[i],
                node
            );

            if (this.crossRemove_[i] == node || isContains) {
                result = true;
            }
        }

        return result;
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
            this.filtersElement,
            element,
            0
        );
    };
});  // goog.scope
