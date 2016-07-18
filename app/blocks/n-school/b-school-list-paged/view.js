goog.provide('sm.bSchoolListPaged.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('sm.bSchoolListPaged.Template');



/**
 * SchoolListPaged View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSchoolListPaged.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);


    /**
     * @type {sm.bSchoolListPaged.View.Params}
     */
    this.params = opt_params || {};

    /**
     * visible list schools of schools
     * @type {Element}
     * @private
     */
    this.visibleListSchools_ = null;


    /**
     * count pages of schools
     * @type {number}
     * @private
     */
    this.countPages_ = null;


    /**
     * current Page
     * @type {number}
     * @private
     */
    this.currentPage_ = 0;
};
goog.inherits(sm.bSchoolListPaged.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSchoolListPaged.View,
        Utils = cl.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-school-list-paged',
        CONTENT: 'b-school-list-paged__content',
        FOOTER: 'b-school-list-paged__footer',
        COUNT: 'b-school-list-paged__count',
        LIST_SCHOOLS: 'b-school-list-paged__list',
        LINK: 'b-school-list-paged__link',
        LINK_NEXT: 'b-school-list-paged__link_next',
        LINK_PREVIOUS: 'b-school-list-paged__link_previous',
        ACTIVE_LINK: 'b-school-list-paged__link_active',
        INACTIVE_LINK: 'b-school-list-paged__link_inactive',
        INTERVAL: 'b-school-list-paged__interval-count'
    };


    /**
     * @typedef {{
     *     itemsPerPage: number
     * }}
     */
    sm.bSchoolListPaged.View.Params;

    /**
     * Updates items in list
     * @param {Array.<sm.bSchoolListItem.SchoolListItem.Params>} items
     */
    View.prototype.updateItems = function(items) {
        this.renderItemLists_(items);
        this.updateItemElements_();

        this.setControlsInitialState_(items.length);
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initControlElements_()
            .initContentElements_()
            .initItemElements_()
            .initItemListElements_()
            .initParams_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.linkNext,
            goog.events.EventType.CLICK,
            this.onLinkNextClick_
        );

        this.getHandler().listen(
            this.dom.linkPrevious,
            goog.events.EventType.CLICK,
            this.onLinkPreviousClick_
        );
    };


    /**
     * set Next Page
     */
    View.prototype.setNextPage = function() {
        var nextListSchools = this.getNextListSchools_();

        this.toggleListSchools_(nextListSchools);
        this.currentPage_ += 1;

        this.setActiveLink_(true, this.dom.linkPrevious);
        this.setInterval_();

        if (this.currentPage_ == this.countPages_) {
            this.setActiveLink_(false, this.dom.linkNext);
        }
    };


    /**
     * set Previous Page
     */
    View.prototype.setPreviousPage = function() {
        var previousListSchools = this.getPreviousListSchools_();

        this.toggleListSchools_(previousListSchools);
        this.currentPage_ -= 1;

        this.setActiveLink_(true, this.dom.linkNext);
        this.setInterval_();

        if (this.currentPage_ == 0) {
            this.setActiveLink_(false, this.dom.linkPrevious);
        }
    };


    /**
     * Link Next Click
     * @private
     */
    View.prototype.onLinkNextClick_ = function() {
        if (this.isActiveLink_(this.dom.linkNext)) {
            this.setNextPage();
        }
    };


    /**
     * Link Previous Click
     * @private
     */
    View.prototype.onLinkPreviousClick_ = function() {
        if (this.isActiveLink_(this.dom.linkPrevious)) {
            this.setPreviousPage();
        }
    };


    /**
     * Render lists with given items
     * @param {Array.<sm.bSchoolListItem.SchoolListItem.Params>} items
     * @private
     */
    View.prototype.renderItemLists_ = function(items) {
        goog.soy.renderElement(
            this.dom.content,
            sm.bSchoolListPaged.Template.content,
            {
                params: {
                    data: {
                        schools: items
                    }
                }
            }
        );
    };


    /**
     * Set initial state for controls
     * @param {number} schoolsAmount
     * @private
     */
    View.prototype.setControlsInitialState_ = function(schoolsAmount) {
        this.setActiveLink_(false, this.dom.linkPrevious);
        this.setActiveLink_(true, this.dom.linkNext);

        this.currentPage_ = 0;
        this.setInterval_();
        this.setCount_(schoolsAmount);

        this.initFooterVisibility_(schoolsAmount);
    };


    /**
     * Set count in according to schools amount
     * @param {number} schoolsAmount
     * @private
     */
    View.prototype.setCount_ = function(schoolsAmount) {
        goog.soy.renderElement(
            this.dom.count,
            sm.bSchoolListPaged.Template.countText,
            {
                params: {
                    schoolsCount: schoolsAmount
                }
            }
        );
    };


    /**
     * Make footer visible or not depends of schools per page and
     * amount of schools
     * @param {number} schoolsAmount
     * @private
     */
    View.prototype.initFooterVisibility_ = function(schoolsAmount) {
        if (schoolsAmount > this.params.itemsPerPage) {
            goog.dom.classlist.remove(
                this.dom.footer,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        } else {
            goog.dom.classlist.add(
                this.dom.footer,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        }
    };

    /**
     * Re-Init dom elements of items, after re-render item lists
     * @private
     */
    View.prototype.updateItemElements_ = function() {
        this.initItemElements_()
            .initItemListElements_();
    };


    /**
     * toggle List Schools
     * @param {Element} ListToShow
     * @private
     */
    View.prototype.toggleListSchools_ = function(ListToShow) {
        this.hideListSchools_(this.visibleListSchools_);
        this.showListSchools_(ListToShow);
    };


    /**
     * hide List Schools
     * @param {Element} listSchools
     * @private
     */
    View.prototype.hideListSchools_ = function(listSchools) {
        goog.dom.classlist.add(
            listSchools,
            Utils.CssClass.HIDDEN
        );
    };


    /**
     * show List Schools
     * @param {Element} listSchools
     * @private
     */
    View.prototype.showListSchools_ = function(listSchools) {
        goog.dom.classlist.remove(
            listSchools,
            Utils.CssClass.HIDDEN
        );

        this.visibleListSchools_ = listSchools;
    };


    /**
     * get Previous List Schools
     * @return {Element}
     * @private
     */
    View.prototype.getPreviousListSchools_ = function() {
        return goog.dom.getPreviousElementSibling(
            this.visibleListSchools_
        );
    };


    /**
     * get Next List Schools
     * @return {Element}
     * @private
     */
    View.prototype.getNextListSchools_ = function() {
        return goog.dom.getNextElementSibling(
            this.visibleListSchools_
        );
    };


    /**
     * set Active Link
     * @private
     * @param {bool} active
     * @param {Element} link
     */
    View.prototype.setActiveLink_ = function(active, link) {
        if (active) {
            goog.dom.classlist.add(
                link,
                View.CssClass.ACTIVE_LINK
            );
            goog.dom.classlist.remove(
                link,
                View.CssClass.INACTIVE_LINK
            );
        } else {
            goog.dom.classlist.add(
                link,
                View.CssClass.INACTIVE_LINK
            );
            goog.dom.classlist.remove(
                link,
                View.CssClass.ACTIVE_LINK
            );
        }
    };


    /**
     * set Interval
     * @private
     */
    View.prototype.setInterval_ = function() {
        var interval = this.calculateInterval_(this.params.itemsPerPage);
        this.insertInterval_(interval);
    };


    /**
     * calculate Interval
     * @param {number} itemsPerPage
     * @return {{
     *     firstIndex: number,
     *     lastIndex: number
     * }}
     * @private
     */
    View.prototype.calculateInterval_ = function(itemsPerPage) {
        var lastItemIndex,
            firstItemIndex,
            itemsCount = this.dom.schoolListItems.length;

        var skipedItemsCount = this.currentPage_ * itemsPerPage,
            restItemsCount = itemsCount - skipedItemsCount;

            firstItemIndex = skipedItemsCount + 1;

        if (restItemsCount < itemsPerPage) {
            lastItemIndex = itemsCount;
        } else {
            lastItemIndex = skipedItemsCount + itemsPerPage;
        }

        return {
            firstIndex: firstItemIndex,
            lastIndex: lastItemIndex
        };
    };


    /**
     * insert Interval
     * @param {{
     *     firstIndex: number,
     *     lastIndex: number
     * }} interval
     * @private
     */
    View.prototype.insertInterval_ = function(interval) {
        goog.soy.renderElement(
            this.dom.interval,
            sm.bSchoolListPaged.Template.interval,
            {
                params: {
                    start: interval.firstIndex,
                    end: interval.lastIndex
                }
            }
        );
    };


    /**
     * Detect whether Link Active
     * @param {Element} link
     * @return {bool}
     * @private
     */
    View.prototype.isActiveLink_ = function(link) {
        return goog.dom.classlist.contains(
            link,
            View.CssClass.ACTIVE_LINK
        );
    };


    /**
     * Init favorite item dom elements
     * @return {sm.bSchoolListPaged.View}
     * @private
     */
    View.prototype.initItemElements_ = function() {
        this.dom.schoolListItems = this.getElementsByClass(
            sm.bSchoolListItem.SchoolListItem.CssClass.ROOT
        );

        return this;
    };


    /**
     * Initializes List Schools
     * @return {sm.bSchoolListPaged.View}
     * @private
     */
    View.prototype.initItemListElements_ = function() {
        this.dom.listSchools = this.getElementsByClass(
            View.CssClass.LIST_SCHOOLS
        );

        this.visibleListSchools_ = this.dom.listSchools[0];
        this.countPages_ = this.dom.listSchools.length - 1;

        return this;
    };


    /**
     * Initializes dom elements of controls
     * @return {sm.bSchoolListPaged.View}
     * @private
     */
    View.prototype.initControlElements_ = function() {
        this.dom.linkNext = this.getElementByClass(
                View.CssClass.LINK_NEXT
            );
        this.dom.linkPrevious = this.getElementByClass(
                View.CssClass.LINK_PREVIOUS
            );
        this.dom.interval = this.getElementByClass(
                View.CssClass.INTERVAL
            );

        return this;
    };


    /**
     * Initializes dom elements of controls
     * @return {sm.bSchoolListPaged.View}
     * @private
     */
    View.prototype.initContentElements_ = function() {
        this.dom.content = this.getElementByClass(
            View.CssClass.CONTENT
        );

        this.dom.footer = this.getElementByClass(
            View.CssClass.FOOTER
        );

        this.dom.count = this.getElementByClass(
            View.CssClass.COUNT
        );

        return this;
    };

    /**
     * Get data params from dom element
     * @return {sm.bSchoolListPaged.View.Params}
     * @private
     */
    View.prototype.getDataparams_ = function() {
        var dataParams = goog.dom.dataset.get(
            this.getElement(),
            'params'
        );

        return {
            itemsPerPage: dataParams['countItemsPerPage'] || 5
        };
    };

    /**
     * Init fields from data params
     * @return {sm.bSchoolListPaged.View}
     * @private
     */
    View.prototype.initParams_ = function() {
        this.params = this.getDataparams_();

        return this;
    };
});  // goog.scope
