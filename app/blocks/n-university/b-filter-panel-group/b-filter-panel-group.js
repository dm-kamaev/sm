goog.module('sm.bFilterPanelGroup.FilterPanelGroup');

const Control = goog.require('cl.iControl.Control');
const View = goog.require('sm.bFilterPanelGroup.View');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.bFilterPanelGroup.Template');
const ButtonStendhal = goog.require('sm.gButton.ButtonStendhal');
const Button = goog.require('cl.gButton.Button');
const FilterPanel = goog.require('sm.lSearch.bFilterPanel.FilterPanel');

goog.require('goog.events');


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
     * @override
     * @public
     */
    enterDocument() {
        super.enterDocument();

        this.initButtonListeners_();
        this.initFilterPanelsListeners_();
    }

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initButton_();
        this.initFilterPanels_();
    }

    /**
     * @private
     */
    initButton_() {
        this.button_ = this.decorateChild(
            ButtonStendhal.NAME,
            this.getView().getDom().button
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
    initButtonListeners_() {
        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick_
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
     * On filter check
     */
    onFilterCheck_() {
    }

    /**
     * On filter check
     */
    onFilterUncheck_() {
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
