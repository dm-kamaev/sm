goog.provide('sm.lSearchResult.bFilters.Filters');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.lSearchResult.bFilter.Filter');
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
};
goog.inherits(sm.lSearchResult.bFilters.Filters, goog.ui.Component);

goog.scope(function() {
    var Filters = sm.lSearchResult.bFilters.Filters,
        Filter = sm.lSearchResult.bFilter.Filter;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Filters.CssClass = {
        ROOT: 'b-filters',
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

        //filters
        var filters = goog.dom.getElementsByClass(
            Filter.CssClass.ROOT,
            element
        );

        for (var i = 0, filter; i < filters.length; i++) {
            filter = new Filter();
            this.addChild(filter);
            filter.decorate(filters[i]);
        }
    };

    /**
     * @override
     */
    Filters.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.getElementByClass(Filters.CssClass.SUBMIT_BUTTON),
            goog.events.EventType.CLICK,
            this.onSubmit_
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
     * Submit handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onSubmit_ = function(event) {
        event.preventDefault();

        this.sendForm_(event);
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

            console.log(event);

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
