goog.provide('sm.bSchoolListPaged.View');

goog.require('cl.gHint.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * SchoolListPaged View
 * @param {Object=} opt_params
 * @param {Function=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSchoolListPaged.View = function(opt_params, opt_type, opt_modifier) {
    goog.base(this, opt_params, opt_type, opt_modifier);


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
        LIST_SCHOOLS: 'b-school-list-paged__list',
        LINK: 'b-school-list-paged__link',
        LINK_NEXT: 'b-school-list-paged__link_next',
        LINK_PREVIOUS: 'b-school-list-paged__link_previous',
        ACTIVE_LINK: 'b-school-list-paged__link_active',
        INACTIVE_LINK: 'b-school-list-paged__link_inactive',
        INTERVAL: 'b-school-list-paged__interval-count'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initDom_();
        this.initListSchools_();
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
        var lastItemIndex,
            itemsPerPage = 5,
            itemsCount = this.dom.schoolListItems.length;

        var skipedItemsCount = this.currentPage_ * itemsPerPage,
            firstItemIndex = skipedItemsCount + 1,
            restItemsCount = itemsCount - skipedItemsCount;

        if (restItemsCount < itemsPerPage) {
            lastItemIndex = itemsCount;
        } else {
            lastItemIndex = skipedItemsCount + itemsPerPage;
        }

        var text = firstItemIndex + '\u2014' + lastItemIndex;

        goog.dom.setTextContent(this.dom.interval, text);
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
     * Initializes List Schools
     * @private
     */
    View.prototype.initListSchools_ = function() {
        this.dom.listSchools = this.getElementsByClass(
            View.CssClass.LIST_SCHOOLS
        );

        this.visibleListSchools_ = this.dom.listSchools[0];
        this.countPages_ = this.dom.listSchools.length - 1;
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            schoolListItems: this.getElementsByClass(
                sm.bSchoolListItem.SchoolListItem.CssClass.ROOT
            ),
            linkNext: this.getElementByClass(
                View.CssClass.LINK_NEXT
            ),
            linkPrevious: this.getElementByClass(
                View.CssClass.LINK_PREVIOUS
            ),
            interval: this.getElementByClass(
                View.CssClass.INTERVAL
            )
        };
    };
});  // goog.scope
