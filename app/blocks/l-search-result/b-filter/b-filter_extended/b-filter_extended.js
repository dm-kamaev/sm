goog.provide('sm.lSearchResult.bFilter.FilterExtended');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('sm.lSearchResult.bFilter.Filter');
goog.require('sm.lSearchResult.bFilterSearch.FilterSearch');



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
    var FilterExtended = sm.lSearchResult.bFilter.FilterExtended;


    /**
     * CSS-class enum
     * @enum {string}
     */
    FilterExtended.CssClass = {
        ROOT: 'b-filter_extended',
        SHOW_MODAL_BUTTON: 'b-filter__button_show-modal'
    };


    /**
     * Event enum
     * @enum {String}
     */
    FilterExtended.Event = {
        APPLY_CLICK: 'apply-click'
    };


    /**
     * Possible types
     * @enum {string}
     */
    FilterExtended.Name = {
        ACTIVITY_SPHERE: 'activitySphere',
        SPECIALIZED_CLASS_TYPE: 'specializedClassType'
    };


    /**
     * Possible api addresses
     * @enum {string}
     */
    FilterExtended.ApiUrl = {
        ACTIVITY_SPHERE: '/api/school/activitySphere',
        SPECIALIZED_CLASS_TYPE: 'api/school/specializedClassType'
    };


    /**
     * Possible api addresses for popular filters
     * @enum {string}
     */
    FilterExtended.ApiUrlPopular = {
        ACTIVITY_SPHERE: '/api/school/activitySphere/popular',
        SPECIALIZED_CLASS_TYPE: 'api/school/specializedClassType/popular'
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    FilterExtended.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };


    /**
     * Reset filter
     * @override
     */
    FilterExtended.prototype.reset = function() {
        this.updateListFilters(this.allFiltersData);
    };


    /**
     * update content (inputs and labels)
     * @param {Array<{
     *     value: string,
     *     label: string,
     *     isChecked: bool
     * }>} filters
     * @override
     */
    FilterExtended.prototype.updateListFilters = function(filters) {
        goog.soy.renderElement(
            this.wrapperListFilters,
            sm.lSearchResult.bFilterExtended.Template.listFilters, {
                params: {
                    data: {
                        name: this.filterName,
                        filters: filters
                    }
                },
                config: {
                    type: this.type
                }
            }
        );

        this.initFilterItems();
        this.initFilterItemsListeners();
    };


    /**
     * set default filters data
     * @override
     */
    FilterExtended.prototype.setAllFiltersData = function() {
        var api = this.getApiUrlPopular_();

        this.send_(api)
            .then(function(data) {
                this.allFiltersData = data;
            }
            .bind(this));
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
     * Init Modal Filter
     * @return {sm.gModal.ModalStendhal}
     * @private
     */
    FilterExtended.prototype.initModalFilter_ = function() {
        var params = {
            config: {
                size: 'l'
            }
        };

        var modal = sm.gModal.ModalStendhal.render(params, true);

        modal.renderContent(
            'filter-search',
            this.getModalContentData_()
        );

        return modal;
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
            this.allFiltersData;

        this.updateListFilters(params);
        this.filterModal_.remove();

        this.dispatchChangedFilterEvent();
        this.dispatchApplyClickEvent_();
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
        var params;

        if (this.filterName == FilterExtended.Name.ACTIVITY_SPHERE) {
            params = this.getActivitiesParams_();
        } else if (
            this.filterName == FilterExtended.Name.SPECIALIZED_CLASS_TYPE) {
            params = this.getSpecializedClassesParams_();
        }

        return params;
    };


     /**
     * Get filter params for Activities
     * @return {{
     *     data: {
     *         header: string,
     *         name: string,
     *         filters: {
     *             title: string,
     *             items: Array<{
     *                 label: string,
     *                 value: string,
     *                 isChecked: boolean
     *             }>
     *         },
     *         search: {
     *             placeholder: string,
     *              sourceUrl: string
     *         }
     *     }
     * }}
     * @private
     */
    FilterExtended.prototype.getActivitiesParams_ = function() {
        var selected = this.getSelectedData(),
            popular = this.allFiltersData;

        return {
            data: {
                header: 'Курсы, кружки и секции',
                name: FilterExtended.Name.ACTIVITY_SPHERE,
                filters: {
                    title: 'Популярные',
                    items: this.setSelected(popular, selected)
                },
                selectedItems: selected,
                search: {
                    placeholder: 'Какие занятия вы ищете?',
                    sourceUrl: FilterExtended.ApiUrl.ACTIVITY_SPHERE
                }
            }
        };
    };


    /**
     * Get filter params for Specialized Classes
     * @return {{
     *     data: {
     *         header: string,
     *         name: string,
     *         filters: {
     *             title: string,
     *             items: Array<{
     *                 label: string,
     *                 value: string,
     *                 isChecked: boolean
     *             }>
     *         },
     *         search: {
     *             placeholder: string,
     *              sourceUrl: string
     *         }
     *     }
     * }}
     * @private
     */
    FilterExtended.prototype.getSpecializedClassesParams_ = function() {
        var selected = this.getSelectedData(),
            popular = this.allFiltersData;

        return {
            data: {
                header: 'Профильные классы',
                name: FilterExtended.Name.SPECIALIZED_CLASS_TYPE,
                filters: {
                    title: 'Популярные профильные классы',
                    items: this.setSelected(popular, selected)
                },
                selectedItems: selected,
                search: {
                    placeholder: 'Какой профиль вы ищете?',
                    sourceUrl: FilterExtended.ApiUrl.SPECIALIZED_CLASS_TYPE
                }
            }
        };
    };


    /**
     * get Api Url Popular filters
     * @return {string}
     * @private
     */
    FilterExtended.prototype.getApiUrlPopular_ = function() {
        var apiUrlPopular;

        if (this.filterName == FilterExtended.Name.SPECIALIZED_CLASS_TYPE) {
            apiUrlPopular = FilterExtended.ApiUrlPopular.SPECIALIZED_CLASS_TYPE;
        }
        else if (this.filterName == FilterExtended.Name.ACTIVITY_SPHERE) {
            apiUrlPopular = FilterExtended.ApiUrlPopular.ACTIVITY_SPHERE;
        }

        return apiUrlPopular;
    };
});  // goog.scope
