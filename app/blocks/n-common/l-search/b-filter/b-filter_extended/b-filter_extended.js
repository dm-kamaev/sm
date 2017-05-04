goog.provide('sm.lSearch.bFilter.FilterExtended');

goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.TemplateExtended');
goog.require('sm.lSearch.bFilter.ViewExtended');
goog.require('sm.lSearch.bSuggestFilter.SuggestFilter');



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
     * @type {sm.lSearch.bFilter.ViewExtended.Params}
     * @override
     * @protected
     */
    this.params = view.getParams() || {};


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
     * Name of this element in factory
     */
    FilterExtended.NAME = sm.lSearch.bFilter.TemplateExtended.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        FilterExtended.NAME, {
            control: FilterExtended,
            view: View
        }
    );

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
    };


    /**
     * Reset options filters
     */
    FilterExtended.prototype.reset = function() {
        this.updateOptions(this.getDefaultOptionsData_());
        this.collapse();
    };


    /**
     * Get options data to show (data by default)
     * @return {Array<sm.bSmCheckbox.SmCheckbox>}
     * @private
     */
    FilterExtended.prototype.getDefaultOptionsData_ = function() {
        var data = this.getAllData();

        if (this.params.optionsToShow) {
            data = data.slice(0, this.params.optionsToShow);
        }

        return data;
    };


    /**
     * Set all options data
     * @override
     */
    FilterExtended.prototype.setAllData = function() {
        var apiPopular = this.params.apiPopular ||
            (this.params.api + '/popular');

        this.send_(apiPopular)
            .then(function(data) {
                this.allOptionsData = data;
            }
            .bind(this));
    };


    /**
     * Initializes listeners for view
     * @override
     * @protected
     */
    FilterExtended.prototype.initViewListeners = function() {
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
        var that = this;
        var params = event.data.filters.length ?
            event.data.filters :
            this.getDefaultOptionsData_();

        params.forEach(function(data) {
            data.optionsTheme = that.params.optionsTheme;
            data.customIcon = that.params.customIcon;
        });

        this.updateOptions(params);
        this.removeFilterModal_();

        this.dispatchEventChangeOptions();
        this.dispatchEventSubmit();
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
     * Init Modal Filter
     * @private
     */
    FilterExtended.prototype.initModalFilter_ = function() {
        var params = this.getModalData_();
        this.filterModal_ = sm.gModal.ModalStendhal.render(params, true);

        this.filterModal_.renderContent(
            sm.lSearch.bSuggestFilter.SuggestFilter.NAME,
            this.getModalContentData_()
        );
    };


    /**
     * generate params for render modal
     * @return {sm.gModalStendhal.Params}
     * @private
     */
    FilterExtended.prototype.getModalData_ = function() {
        return {
            data: {
                closer: this.params.modal.theme == 'neptune' ? {
                    iconName: 'blue-close',
                    iconType: 'icon-svg'
                } : null
            },
            config: {
                size: 'l',
                theme: this.params.modal.theme
            }
        };
    };


     /**
     * Get Modal content data
     * @return {{
     *     data: {
     *         header: string,
     *         search: {
     *             placeholder: ?string,
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
    FilterExtended.prototype.getModalContentData_ = function() {
        var allOptionsData = this.setChecked(
            this.getAllData(),
            this.getCheckedData()
        );

        return {
            data: {
                header: this.params.modal.header,
                search: {
                    placeholder: this.params.modal.placeholder,
                    sourceUrl: this.params.api
                },
                filter: {
                    name: this.getName(),
                    header: {
                        title: this.params.modal.filterHeader
                    },
                    options: allOptionsData
                },
                selected: {
                    name: this.getName(),
                    options: this.getCheckedData()
                }
            },
            config: {
                theme: this.params.modal.theme
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
