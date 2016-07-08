goog.provide('sm.lSearchResult.bFilter.FilterExtended');

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
sm.lSearchResult.bFilter.FilterExtended = function(opt_params) {
    goog.base(this);

    /**
     * Button for the call modal
     * @type {Element}
     * @private
     */
    this.buttonShowModal_ = null;


    /**
     * full Data Filter List
     * @type {Object}
     * @private
     */
    this.allFiltersData_ = {};


    /**
     * instance Modal
     * @type {sm.gModal.ModalStendhal}
     * @private
     */
    this.filterModal_ = null;
};
goog.inherits(
    sm.lSearchResult.bFilter.FilterExtended,
    sm.lSearchResult.bFilter.Filter
);


goog.scope(function() {
    var FilterExtended = sm.lSearchResult.bFilter.FilterExtended,
        Filter = sm.lSearchResult.bFilter.Filter;


    /**
     * CSS-class enum
     * @enum {string}
     */
    FilterExtended.CssClass = {
        ROOT: 'b-filter_extended',
        SHOW_MODAL_BUTTON: 'b-filter__button_show-modal'
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    FilterExtended.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.allFiltersData_ = this.getFiltersData();
    };


    /**
     * Reset filter
     * @override
     */
    FilterExtended.prototype.reset = function() {
        this.updateListFilters_(this.allFiltersData_);
    };


    /**
     * Init Buttons
     * @param {Element} element
     * @override
     */
    FilterExtended.prototype.initButtons = function(element) {
        goog.base(this, 'initButtons', element);

        this.buttonShowModal_ = goog.dom.getElementByClass(
            FilterExtended.CssClass.SHOW_MODAL_BUTTON,
            element
        );
    };


    /**
     * Init Buttons Listeners
     * @override
     */
    FilterExtended.prototype.initButtonsListeners = function() {
        goog.base(this, 'initButtonsListeners');

        var handler = this.getHandler();

        handler.listen(
            this.buttonShowModal_,
            goog.events.EventType.CLICK,
            this.onShowModalButtonClick_
        );
    };


    /**
     * Init modal filter listeners
     * @param {Element} element
     * @private
     */
    FilterExtended.prototype.initModalFilterListeners_ = function(element) {
        this.getHandler().listen(
            element,
            sm.lSearchResult.bFilterSearch.FilterSearch.Event.BUTTON_CLICK,
            this.onModalFilterButtonClick_
        );
    };


    /**
     * Handler button for show modal
     * @private
     */
    FilterExtended.prototype.onShowModalButtonClick_ = function() {
        this.filterModal_ = this.createFilterModal_();
        this.filterModal_.show();
    };


    /**
     * Hide Search Filter Click
     * @param {goog.events.Event} event
     * @private
     */
    FilterExtended.prototype.onModalFilterButtonClick_ = function(event) {
        var params = event.data.filters.length ?
            event.data.filters :
            this.allFiltersData_;

        this.updateListFilters_(params);
        this.filterModal_.remove();

        this.dispatchChangedFilterEvent();
    };


    /**
     * Create filter modal
     * @return {sm.gModal.ModalStendhal}
     * @private
     */
    FilterExtended.prototype.createFilterModal_ = function() {
        var modal = this.initModalFilter_();
        this.initModalFilterListeners_(modal);

        return modal;
    };


    /**
     * Init Modal Filter
     * @return {sm.gModal.ModalStendhal}
     * @private
     */
    FilterExtended.prototype.initModalFilter_ = function() {
        var modal = sm.gModal.ModalStendhal.render(true);

        modal.renderContent(
            'filter-search',
            this.getModalContentData_()
        );

        return modal;
    };


    /**
     * update content (inputs and labels)
     * @param {Array<{
     *     value: string,
     *     label: string,
     *     isChecked: bool
     * }>} filters
     * @private
     */
    Filter.prototype.updateListFilters_ = function(filters) {
        goog.soy.renderElement(
            this.wrapperListFilters,
            sm.lSearchResult.bFilterExtended.Template.listFilters, {
                params: {
                    data: {
                        name: this.filterName,
                        filters: filters
                    }
                }
            }
        );

        this.initFilterItems();
        this.initFilterItemsListeners();
    };


    /**
     * get Modal Content Data
     * @return {{
     *     data: {
     *         header: string,
     *         name: string,
     *         filters: {
     *             title: string
     *             items: Array<{
     *                 label: string,
     *                 value: string,
     *                 isChecked: bool
     *             }>
     *         },
     *         selectedItems: Array<{
     *             label: string,
     *             value: string,
     *             isChecked: bool
     *         }>,
     *         search: string
     *     }
     * }}
     * @private
     */
    FilterExtended.prototype.getModalContentData_ = function() {
        var selected = this.getSelectedData(),
            popular = this.allFiltersData_,
            params;

        if (this.filterName == 'additionalEducation') {
            params = this.getAdditionalEducationParams_();
        }
        else if (this.filterName == 'specializedClasses') {
            params = this.getSpecializedClassesParams_();
        }

        params.data.filters.items = this.setSelected_(popular, selected);
        params.data.selectedItems = selected;

        return params;
    };


    /**
     * In first array is set to isChecked true
     * according to the value of the second array
     * @param {Array<{
     *     value: string,
     *     label: string,
     *     name: string,
     *     isChecked: bool
     * }>} filters
     * @param {Array<{Object}>} selectedFilters like filters
     * @return {Array<{Object}>} like filters
     * @private
     */
    FilterExtended.prototype.setSelected_ = function(filters, selectedFilters) {
        return filters.map(function(item) {
            var itemClone = goog.object.clone(item);

            itemClone.isChecked = selectedFilters.some(function(selected) {
                return itemClone.value == selected.value;
            });

            return itemClone;
        });
    };


     /**
     * Get filter params for Additional Education
     * @return {{
     *     data: {
     *         header: string,
     *         name: string,
     *         filters: {
     *             title: string
     *         },
     *         search: string
     *     }
     * }}
     * @private
     */
    FilterExtended.prototype.getAdditionalEducationParams_ = function() {
        var additionalEducation = {
            data: {
                header: 'Дополнительные занятия',
                name: 'additionalEducation',
                filters: {
                    title: 'Популярные дополнительные занятия'
                },
                search: {
                    placeholder: 'Какие занятия вы ищете?'
                }
            }
        };
        return additionalEducation;
    };


    /**
     * Get filter params for Specialized Classes
     * @return {{
     *     data: {
     *         header: string,
     *         name: string,
     *         filters: {
     *             title: string
     *         },
     *         search: string
     *     }
     * }}
     * @private
     */
    FilterExtended.prototype.getSpecializedClassesParams_ = function() {
       var specializedClasses = {
            data: {
                header: 'Профильные классы',
                name: 'specializedClasses',
                filters: {
                        title: 'Популярные профильные классы'
                },
                search: {
                    placeholder: 'Какой профиль вы ищете?'
                }
            }
        };
        return specializedClasses;
    };
});  // goog.scope
