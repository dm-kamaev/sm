goog.module('sm.bFilterPanelGroup.FilterPanelGroup');

const Button = goog.require('cl.gButton.Button');
const ButtonStendhal = goog.require('sm.gButton.ButtonStendhal');
const Control = goog.require('cl.iControl.Control');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const FilterPanel = goog.require('sm.lSearch.bFilterPanel.FilterPanel');
const Template = goog.require('sm.bFilterPanelGroup.Template');
const View = goog.require('sm.bFilterPanelGroup.View');
const events = goog.require('goog.events');
const object = goog.require('goog.object');

const Link = goog.require('sm.bSmLink.SmLink');

/**
 * Possible event enum
 * @enum {string}
 */
const Event = {
    SUBMIT: FilterPanel.Event.SUBMIT
};

/**
 * Filter name of ege results filter
 * @const {string}
 */
const EGE_RESULTS_FILTER = 'egeResults';


/**
 * Block for control and interaction filter panels
 */
class FilterPanelGroup extends Control {
    /**
     * @param {cl.gButton.View} view
     * @param {Object=} opt_params
     * @param {Object=} opt_domHelper
     */
    constructor(view, opt_params, opt_domHelper) {
        super(view, opt_params, opt_domHelper);

        /**
         * Button show filters instance
         * @type {sm.gButton.ButtonStendhal}
         * @private
         */
        this.button_ = null;

        /**
         * Filter panel instance
         * @type {sm.lSearch.bFilterPanel.FilterPanel}
         * @private
         */
        this.mainFilterPanel_ = null;

        /**
         * Filter panel instance
         * @type {sm.lSearch.bFilterPanel.FilterPanel}
         * @private
         */
        this.dependentFilterPanel_ = null;

        /**
         * State filter group
         * @type {boolean}
         * @protected
         */
        this.isChecked = false;
    }

    /**
     * @return {string}
     */
    static get NAME() {
        return Template.NAME();
    }

    /**
     * Return selected search params from all filter panels
     * @return {Object}
     */
    getData() {
        const mainFilterPanelData = this.transformFilterPanelData_(
            this.mainFilterPanel_.getData()
        );
        const dependentFilterPanelData = this.transformFilterPanelData_(
            this.dependentFilterPanel_.getData()
        );
        const result = {};

        goog.object.extend(
            result,
            mainFilterPanelData,
            dependentFilterPanelData
        );

        return result;
    }

    /**
     * @override
     * @public
     */
    enterDocument() {
        super.enterDocument();

        this.initButtonsListeners_();
        this.initFilterPanelsListeners_();
    }

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initButtons_();
        this.initFilterPanels_();
    }

    /**
     * Transform filter panel data for each filter from array of objects to
     * array of values
     * @param {Object<string, Array<Object>>} filterPanelData
     * @return {Object<string, Array<Object>>}
     * @private
     */
    transformFilterPanelData_(filterPanelData) {
        return object.map(filterPanelData, this.transformFilterData_, this);
    };

    /**
     * Remove from filter data unnecessary fields
     * @param {Array<Object<string, (string | number)>>} filterData
     * @param {string} filterName
     * @return {Array<(string | number | Object)>}
     * @private
     */
    transformFilterData_(filterData, filterName) {
        const transformFunction = (filterName === EGE_RESULTS_FILTER) ?
            this.getEgeResultsFilterData_ :
            this.getDefaultFilterData_;

        return filterData.map(transformFunction);
    }

    /**
     * Default filter data transformation
     * @param {Object<string, (string | number)>} filterDataItem
     * @return {(string | number)}
     * @private
     */
    getDefaultFilterData_(filterDataItem) {
        return filterDataItem.value;
    }

    /**
     * Ege resulte filter data transformation
     * @param {Object<string, (string | number)>} filterDataItem
     * @return {{
     *     subjectId: number,
     *     value: number
     * }}
     * @private
     */
    getEgeResultsFilterData_(filterDataItem) {
        return {
            subjectId: filterDataItem.name,
            value: filterDataItem.value
        };
    }

    /**
     * @private
     */
    initButtons_() {
        const dom = this.getView().getDom();

        this.button_ = this.decorateChild(
            ButtonStendhal.NAME,
            dom.button
        );

        this.reset_ = this.decorateChild(
            Link.NAME,
            dom.reset
        );
    }

    /**
     * @private
     */
    initFilterPanels_() {
        this.mainFilterPanel_ = this.decorateChild(
            FilterPanel.NAME,
            this.getView().getDom().mainFilterPanel
        );

        this.dependentFilterPanel_ = this.decorateChild(
            FilterPanel.NAME,
            this.getView().getDom().dependentFilterPanel
        );
    }

    /**
     * @private
     */
    initFilterPanelsListeners_() {
        this.getHandler().listen(
            this.dependentFilterPanel_,
            FilterPanel.Event.COLLAPSE,
            this.onCollapseFilter_
        );

        this.getHandler().listen(
            this.dependentFilterPanel_,
            FilterPanel.Event.CHECK,
            this.onFilterCheck_
        );

        this.getHandler().listen(
            this.dependentFilterPanel_,
            FilterPanel.Event.UNCHECK,
            this.onFilterUncheck_
        );

        this.getHandler().listen(
            this.mainFilterPanel_,
            FilterPanel.Event.CHECK,
            this.onFilterCheck_
        );

        this.getHandler().listen(
            this.mainFilterPanel_,
            FilterPanel.Event.UNCHECK,
            this.onFilterUncheck_
        );
    }

    /**
     * @private
     */
    initButtonsListeners_() {
        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick_
        );

        this.getHandler().listen(
            this.reset_,
            Link.Event.CLICK,
            this.onResetClick_
        );
    }

    /**
     * @private
     */
    onButtonClick_() {
        this.getView().hideControls();

        this.showFilters_();
    }

    /**
     * @private
     */
    onResetClick_() {
        this.mainFilterPanel_.reset();
        this.dependentFilterPanel_.reset();
        this.getView().hideResetButton();
    }

    /**
     * @private
     */
    onCollapseFilter_() {
        this.getView().showControls();
        this.hideFilters_();
    }

    /**
     * @private
     */
    showFilters_() {
        this.getView().showFilters();

        this.mainFilterPanel_.expand();
        this.dependentFilterPanel_.expand();
    }

    /**
     * @private
     */
    hideFilters_() {
        this.getView().hideFilters();

        this.mainFilterPanel_.collapse();
        this.dependentFilterPanel_.collapse();
    }

    /**
     * Filter check event handler
     * @private
     */
    onFilterCheck_() {
        this.getView().showResetButton();
    }

    /**
     * Filter check event handler
     * @private
     */
    onFilterUncheck_() {
        if (!this.mainFilterPanel_.isChecked() &&
            !this.dependentFilterPanel_.isChecked()) {
            this.getView().hideResetButton();
        }
    }
};



Factory.getInstance().register(FilterPanelGroup.NAME, {
    control: FilterPanelGroup,
    view: View
});


/**
 * @constructor
 */
exports = FilterPanelGroup;

/**
 * @enum {string}
 */
exports.Event = Event;
