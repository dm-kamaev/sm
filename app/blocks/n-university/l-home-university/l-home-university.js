/**
 * @fileoverview Home page of universities with filters
 */
goog.module('sm.lHomeUniversity.HomeUniversity');


const View = goog.require('sm.lHomeUniversity.View');
const Factory = goog.require('sm.iCloblFactory.FactoryStendhal');
const Template = goog.require('sm.lHomeUniversity.Template');
const ILayout = goog.require('sm.iLayout.LayoutStendhal');
const ItemList = goog.require('sm.bSmItemList.SmItemList');
const SearchPanel =
goog.require('sm.lHomeUniversity.bSearchPanelUniversity.SearchPanelUniversity');



/**
 * Home University page control
 * @class HomeUniversity
 * @extends {ILayout}
 */
class HomeUniversity extends ILayout {



    /**
     * @param {Object} view
     * @param {Object=} opt_domHelper
     */
    constructor(view, opt_domHelper) {
        super(view, opt_domHelper);
    }

    /**
     * Name of this element in factory
     * @const {string}
     */
    static get NAME() {
        return Template.NAME();
    }


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    decorateInternal(element) {
        super.decorateInternal(element);

        this.initSearch_();
        this.initUniversities_();
    }


    /**
     * Init search
     * @private
     */
    initSearch_() {
        let dom = this.getView().getDom();

        this.searchPanel_ = this.decorateChild(
            SearchPanel.NAME,
            dom.searchPanel
        );
    }

    /**
     * Init popular universities
     * @private
     */
    initUniversities_() {
        this.universities_ = this.decorateChild(
            ItemList.NAME,
            this.getView().getDom().universities
        );
    }
};


/**
 * Register control into factory
 */
Factory.getInstance().register(HomeUniversity.NAME, {
    control: HomeUniversity,
    view: View
});


exports = HomeUniversity;
