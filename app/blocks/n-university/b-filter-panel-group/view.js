goog.module('sm.bFilterPanelGroup.View');

const ControlView = goog.require('cl.iControl.View');
const ButtonView = goog.require('sm.gButton.ViewStendhal');
const Utils = goog.require('cl.iUtils.Utils');

goog.require('goog.dom.classlist');

/**
 * Css class enum
 * @enum {string}
 */
const CssClass = {
    ROOT: 'b-filter-panel-group',
    MAIN_FILTER_PANEL: 'b-filter-panel-group__main-filter-panel',
    DEPENDENT_FILTER_PANEL: 'b-filter-panel-group__dependent-filter-panel',
    MAIN_FILTER_PANEL_WRAP: 'b-filter-panel-group__filters_main',
    DEPENDENT_FILTER_PANEL_WRAP: 'b-filter-panel-group__filters_dependent',
    FILTER_VISIBLE: 'b-filter-panel-group__filters_visible',
    CONTROLS_WRAP: 'b-filter-panel-group__controls-wrap',
    RESET: 'b-filter-panel-group__reset',
    COLLAPSED_STATE: 'b-filter-panel-group_state_collapsed'
};

/**
 * View
 */
class View extends ControlView {
    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    constructor(opt_params, opt_type, opt_modifier) {
        super(opt_params, opt_type, opt_modifier);

        /**
         * Collection of DOM elements
         * @type {Object}
         */
        this.dom = {};
    }


    /**
     * Show filters
     */
    showFilters() {
        goog.dom.classlist.add(
            this.dom.mainFilterPanelWrap,
            CssClass.FILTER_VISIBLE
        );

        goog.dom.classlist.add(
            this.dom.dependentFilterPanelWrap,
            CssClass.FILTER_VISIBLE
        );

        goog.dom.classlist.remove(
            this.getElement(),
            CssClass.COLLAPSED_STATE
        );
    }

    /**
     * Hide filters
     */
    hideFilters() {
        goog.dom.classlist.remove(
            this.dom.mainFilterPanelWrap,
            CssClass.FILTER_VISIBLE
        );

        goog.dom.classlist.remove(
            this.dom.dependentFilterPanelWrap,
            CssClass.FILTER_VISIBLE
        );

        goog.dom.classlist.add(
            this.getElement(),
            CssClass.COLLAPSED_STATE
        );
    }

    /**
     * Hide controls
     */
    hideControls() {
        goog.dom.classlist.add(
            this.dom.controlsWrap,
            Utils.CssClass.HIDDEN
        );
    }

    /**
     * Show controls
     */
    showControls() {
        goog.dom.classlist.remove(
            this.dom.controlsWrap,
            Utils.CssClass.HIDDEN
        );
    }

    /**
     * Show reset button
     */
    showResetButton() {
        goog.dom.classlist.remove(
            this.dom.reset,
            Utils.CssClass.HIDDEN
        );
    }

    /**
     * Hide reset button
     */
    hideResetButton() {
        goog.dom.classlist.add(
            this.dom.reset,
            Utils.CssClass.HIDDEN
        );
    }

    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initDom_();
    }

    /**
     * Init DOM
     * @private
     */
    initDom_() {
        this.dom = {
            button: this.getElementByClass(
                ButtonView.CssClass.ROOT
            ),
            mainFilterPanel: this.getElementByClass(
                CssClass.MAIN_FILTER_PANEL
            ),
            dependentFilterPanel: this.getElementByClass(
                CssClass.DEPENDENT_FILTER_PANEL
            ),
            mainFilterPanelWrap: this.getElementByClass(
                CssClass.MAIN_FILTER_PANEL_WRAP
            ),
            dependentFilterPanelWrap: this.getElementByClass(
                CssClass.DEPENDENT_FILTER_PANEL_WRAP
            ),
            controlsWrap: this.getElementByClass(
                CssClass.CONTROLS_WRAP
            ),
            reset: this.getElementByClass(
                CssClass.RESET
            )
        };
    }
};


/**
 * @constructor
 */
exports = View;

/**
 * @enum {string}
 */
exports.CssClass = CssClass;
