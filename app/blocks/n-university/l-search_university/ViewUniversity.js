/**
 * @fileoverview View for university search page
 */
goog.module('sm.lSearch.ViewUniversity');

const View = goog.require('sm.lSearch.View');
const Utils = goog.require('cl.iUtils.Utils');
const ViewFilterPanelGroup = goog.require('sm.bFilterPanelGroup.View');


/**
 * University Search View
 * @class ViewUniversity
 * @extends {View}
 */
class ViewUniversity extends View {



    /**
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     */
    constructor(opt_params, opt_type, opt_modifier) {
        super(opt_params, opt_type, opt_modifier);


        /**
         * @type {sm.lSearch.View.Params}
         * @protected
         */
        this.params = null;
    }

    /**
     * Css class enum
     * @enum {string}
     */
    static get CssClass() {
        return {
            ROOT: 'l-search_university',
            FILTER_PANEL_GROUP: ViewFilterPanelGroup.CssClass.ROOT
        };
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initDom();
    }


    /**
     * Init DOM
     * @protected
     */
    initDom() {
        super.initDom();

        goog.object.extend(this.dom, {
            filterPanelGroup: this.getElementByClass(
                ViewUniversity.CssClass.FILTER_PANEL_GROUP
            )
        });
    }
}

exports = ViewUniversity;
