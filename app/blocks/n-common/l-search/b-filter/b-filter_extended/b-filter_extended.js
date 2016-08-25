goog.provide('sm.lSearch.bFilter.FilterExtended');

goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.ViewExtended');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.lSearch.bFilter.Filter}
 */
sm.lSearch.bFilter.FilterExtended = function(view, opt_domHelper) {
    sm.lSearch.bFilter.FilterExtended.base(this, 'constructor',
        view, opt_domHelper);


    /**
     * instance Modal
     * @type {sm.gModal.ModalStendhal}
     * @private
     */
    this.filterModal_ = null;
};
goog.inherits(sm.lSearch.bFilter.FilterExtended, sm.lSearch.bFilter.Filter);


goog.scope(function() {
    var FilterExtended = sm.lSearch.bFilter.FilterExtended,
        View = sm.lSearch.bFilter.ViewExtended;


    /**
     * Event enum
     * @enum {String}
     */
    FilterExtended.Event = {
        APPLY_CLICK: goog.events.getUniqueId('apply-click')
    };


    /**
     * Checks refers element to this control
     * @param {Element} element
     * @return {boolean}
     */
    FilterExtended.isControl = function(element) {
        return goog.dom.classlist.contains(
            element,
            View.CssClass.ROOT
        );
    };


    /**
     * @override
     */
    FilterExtended.prototype.enterDocument = function() {
        FilterExtended.base(this, 'enterDocument');

        this.initViewListeners_();
    };


    /**
     * Reset options filters
     */
    FilterExtended.prototype.reset = function() {
        this.updateOptions(this.getAllData());

        this.collapse();
    };


    /**
     * Set all options data
     * @override
     */
    FilterExtended.prototype.setAllData = function() {
        this.send_('/api/school/activitySphere/popular')
            .then(function(data) {
                this.allOptionsData = data;
            }
            .bind(this));
    };


    /**
     * Initializes listeners for view
     * @private
     */
    FilterExtended.prototype.initViewListeners_ = function() {
        this.viewListen(
            View.Event.SHOW_MODAL_CLICK,
            this.onShowModalClick_
        );
    };


    /**
     * Init modal filter listeners
     * @private
     */
    FilterExtended.prototype.initModalFilterListeners_ = function() {
        this.getHandler().listen(
            this.filterModal_,
            sm.lSearch.bSuggestFilter.SuggestFilter.Event.BUTTON_CLICK,
            this.onModalFilterButtonClick_
        );
    };


    /**
     * Show modal handler
     * @private
     */
    FilterExtended.prototype.onShowModalClick_ = function() {
        this.createFilterModal_();
        this.showFilterModal_();
    };


    /**
     * Modal Filter Button heandler
     * @param {goog.events.Event} event
     * @private
     */
    FilterExtended.prototype.onModalFilterButtonClick_ = function(event) {
        var params = event.data.filters.length ?
            event.data.filters :
            this.allOptionsData;

        this.updateOptions(params);
        this.removeFilterModal_();

        this.dispatchEventChangeOptions();
        this.dispatchApplyClickEvent_();
    };


    /**
     * Create filter modal
     * @private
     */
    FilterExtended.prototype.createFilterModal_ = function() {
        this.initModalFilter_();
        this.initModalFilterListeners_();
    };


    /**
     * Remove filter modal
     * @private
     */
    FilterExtended.prototype.removeFilterModal_ = function() {
        this.filterModal_.remove();
        this.filterModal_ = null;
    };


    /**
     * Show filter modal
     * @private
     */
    FilterExtended.prototype.showFilterModal_ = function() {
        this.filterModal_.show();
    };


    /**
     * Dispatch Apply Click Event
     * @private
     */
    FilterExtended.prototype.dispatchApplyClickEvent_ = function() {
        this.dispatchEvent({
            'type': FilterExtended.Event.APPLY_CLICK
        });
    };


    /**
     * Init Modal Filter
     * @private
     */
    FilterExtended.prototype.initModalFilter_ = function() {
        var params = {
            config: {
                size: 'l'
            }
        };
        this.filterModal_ = sm.gModal.ModalStendhal.render(params, true);

        this.filterModal_.renderContent(
            'lSearch-suggestFilter',
            this.getModalData_()
        );
    };


     /**
     * Get Modal content data
     * @return {{
     *     data: {
     *         header: string,
     *         search: {
     *             placeholder: (string|undefined),
     *             sourceUrl: string
     *         },
     *         filter: {
     *             name: string,
     *             header: {
     *                 title: string
     *             },
     *             options: Array<sm.bSmCheckbox.SmCheckbox>
     *         },
     *         selected: {
     *             name: string,
     *             options: Array<sm.bSmCheckbox.SmCheckbox>
     *         }
     *     }
     * }}
     * @private
     */
    FilterExtended.prototype.getModalData_ = function() {
        var allOptionsData = this.setChecked(
            this.getAllData(),
            this.getCheckedData()
        );

        return {
            data: {
                header: 'Курсы, кружки и секции',
                search: {
                    placeholder: 'Какие занятия вы ищете?',
                    sourceUrl: '/api/school/activitySphere'
                },
                filter: {
                    name: this.getName(),
                    header: {
                        title: 'Популярные'
                    },
                    options: allOptionsData
                },
                selected: {
                    name: this.getName(),
                    options: this.getCheckedData()
                }
            }
        };
    };


    /**
     * Send query
     * @param {string} url
     * @return {Promise}
     * @private
     */
    FilterExtended.prototype.send_ = function(url) {
        return jQuery.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        });
    };
});  // goog.scope
