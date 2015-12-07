goog.provide('sm.lSearchResult.bFilters.Filters');

goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.lSearchResult.bFilters.Template');
goog.require('sm.lSearchResult.bFilter.Filter');

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
        ROOT: 'b-filters'
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
            this.getElement(),
            goog.events.EventType.SUBMIT,
            this.onSubmit_
        );
    };

    /**
     * Sends form using jQuery.ajax
     * @param {Element} form
     * @param {Function=} opt_callback
     * @private
     */
    Filters.prototype.send_ = function(form, opt_callback) {
        jQuery.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            success: opt_callback ? opt_callback : function() {}
        });
    };

    /**
     * Submit handler
     * @param {Object} event
     * @private
     */
    Filters.prototype.onSubmit_ = function(event) {
        event.preventDefault();

        var form = jQuery(this.getElement()),
            data = form.serialize();

        console.log(data);

        this.send_(form);
    };
});
