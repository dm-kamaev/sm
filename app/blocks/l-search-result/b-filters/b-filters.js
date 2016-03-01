goog.provide('sm.lSearchResult.bFilters.Filters');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('sm.lSearchResult.bFilter.Filter');
goog.require('sm.lSearchResult.bFilter.FilterClasses');
goog.require('sm.lSearchResult.bFilters.Template');

/**
 * Filters component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bFilters.Filters = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Dom elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};
};
goog.inherits(sm.lSearchResult.bFilters.Filters, goog.ui.Component);

goog.scope(function() {
    var Filters = sm.lSearchResult.bFilters.Filters,
        Filter = sm.lSearchResult.bFilter.Filter,
        FilterClasses = sm.lSearchResult.bFilter.FilterClasses;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Filters.CssClass = {
        ROOT: 'b-filters',
        STATE_EXPANDED: 'b-filters_state_expanded',
        STATE_COLLAPSED: 'b-filters_state_collapsed',
        EXPANDER: 'b-filters__expander',
        COLLAPSER: 'b-filters__collapser',
        CONTENT: 'b-filters__content',
        SUBMIT_BUTTON: 'b-filters__submit-button'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Filters.event = {
        SUBMIT: 'filters-submit'
    };

    /**
     * @override
     */
    Filters.prototype.decorate = function(element) {
        goog.base(this, 'decorate', element);

        this.params_ = jQuery(element).data('params') || {};
    };

    /**
     * @override
     */
    Filters.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bFilters.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * @override
     * @param {Element} element
     */
    Filters.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initElements_();

        var filters = this.elements_.filters,
            elem,
            filter;

        for (var i = 0; i < filters.length; i++) {
            elem = filters[i];

            filter = goog.dom.classes.has(elem, FilterClasses.CssClass.ROOT) ?
                new FilterClasses() :
                new Filter();

            this.addChild(filter);
            filter.decorate(elem);
        }
    };

    /**
     * @override
     */
    Filters.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.elements_.submit,
            goog.events.EventType.CLICK,
            this.onSubmit_
        );

        this.getHandler().listen(
            this.elements_.expander,
            goog.events.EventType.CLICK,
            this.onExpanderClick_
        );

        this.getHandler().listen(
            this.elements_.collapser,
            goog.events.EventType.CLICK,
            this.onCollapserClick_
        );
    };

    /**
     * Init elements
     * @private
     */
    Filters.prototype.initElements_ = function() {
        var element = this.getElement();

        this.elements_.filters = goog.dom.getElementsByClass(
            Filter.CssClass.ROOT,
            element
        );

        this.elements_.content = goog.dom.getElementByClass(
            Filters.CssClass.CONTENT,
            element
        );

        this.elements_.expander = goog.dom.getElementByClass(
            Filters.CssClass.EXPANDER,
            element
        );

        this.elements_.collapser = goog.dom.getElementByClass(
            Filters.CssClass.COLLAPSER,
            element
        );

        this.elements_.submit = goog.dom.getElementByClass(
            Filters.CssClass.SUBMIT_BUTTON,
            element
        );
    };

    /**
     * Submit data
     * @param {Object} event
     */
    Filters.prototype.submit = function(event) {
        this.sendForm_(event);
    };


    /**
     * Expand filters
     */
    Filters.prototype.expand = function() {
        goog.dom.classes.swap(
            this.getElement(),
            Filters.CssClass.STATE_COLLAPSED,
            Filters.CssClass.STATE_EXPANDED
        );
    };

    /**
     * Collapse filters
     */
    Filters.prototype.collapse = function() {
        goog.dom.classes.swap(
            this.getElement(),
            Filters.CssClass.STATE_EXPANDED,
            Filters.CssClass.STATE_COLLAPSED
        );
    };

    /**
     * Submit handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onSubmit_ = function(event) {
        event.preventDefault();

        this.sendForm_(event);
    };

    /**
     * Expand handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onExpanderClick_ = function(event) {
        this.expand();
    };

    /**
     * Collapse handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onCollapserClick_ = function(event) {
        this.collapse();
    };

    /**
     * Send form
     * @param {Object} event
     * @private
     */
    Filters.prototype.sendForm_ = function(event) {
        var form = jQuery(this.getElement()),
            data = {
                'searchParams': this.processingSerializeArray_(
                    form.serializeArray()
                )
            },
            type = event.data ? event.data.type : '';

        if (type === 'metro') {
            data.searchParams.metroId = event.data.id;
        } else if (type === 'areas') {
            data.searchParams.areaId = event.data.id;
        }

        this.dispatchEvent({
            type: Filters.event.SUBMIT,
            data: data,
            url: form.attr('action'),
            method: form.attr('method')
        });
    };

    /**
     * Processing serialize array
     * @param {Array.<Object>} array
     * @return {Object}
     * @private
     */
    Filters.prototype.processingSerializeArray_ = function(array) {
        var result = {};

        for (var i = 0, item; i < array.length; i++) {
            item = array[i];

            if (!result[item.name]) {
                result[item.name] = [];
            }

            result[item.name].push(item.value);
        }

        return result;
    };
});
