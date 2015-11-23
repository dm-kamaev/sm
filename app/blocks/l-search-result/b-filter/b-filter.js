goog.provide('sm.lSearchResult.bFilter.Filter');

goog.require('gorod.iUtils');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Filter component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bFilter.Filter = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type{Object}
     */
    this.params_ = opt_params || {};

    /**
     * Show button element
     * @type {Element}
     * @private
     */
    this.showButtonElement_ = null;

    /**
     * Hidden filters element
     * @type {Element}
     * @private
     */
    this.hiddenFiltersElement_ = null;
};
goog.inherits(sm.lSearchResult.bFilter.Filter, goog.ui.Component);

goog.scope(function() {
    var Filter = sm.lSearchResult.bFilter.Filter;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Filter.CssClass = {
        ROOT: 'b-filter',
        SHOW_BUTTON: 'b-filter__show-button',
        FILTERS_HIDDEN: gorod.iUtils.CssClass.HIDDEN,
        SHOW_BUTTON_HIDDEN: 'b-filter__show-button_hidden'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Filter.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bSchoolList.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Filter.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.showButtonElement_ = goog.dom.getElementByClass(
            Filter.CssClass.SHOW_BUTTON,
            element
        );

        this.hiddenFiltersElements_ = goog.dom.getElementsByClass(
            Filter.CssClass.FILTERS_HIDDEN,
            element
        );
    };

    /**
     * Set up the Component.
     */
    Filter.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        if(this.showButtonElement_) {
            this.getHandler().listen(
                this.showButtonElement_,
                goog.events.EventType.CLICK,
                this.showHiddenFilters_
            );
        }
    };

    /**
     * Show hidden filters
     * @private
     */
    Filter.prototype.showHiddenFilters_ = function() {
        for(var i = 0; i < this.hiddenFiltersElements_.length; i++) {
            goog.dom.classlist.remove(
                this.hiddenFiltersElements_[i],
                Filter.CssClass.FILTERS_HIDDEN
            );
        }

        goog.dom.classlist.add(
            this.showButtonElement_,
            Filter.CssClass.SHOW_BUTTON_HIDDEN
        );
    }
});
