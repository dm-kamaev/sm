goog.provide('sm.bSmListPaged.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * List Paged View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmListPaged.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmListPaged.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);
};
goog.inherits(sm.bSmListPaged.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSmListPaged.View,
        Utils = cl.iUtils.Utils;


     /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-list-paged',
        FOOTER: 'b-sm-list-paged__footer',
        COUNT: 'b-sm-list-paged__count',
        LINK_NEXT: 'b-sm-list-paged__link_next',
        LINK_PREVIOUS: 'b-sm-list-paged__link_previous',
        ACTIVE_LINK: 'b-sm-list-paged__link_active',
        INACTIVE_LINK: 'b-sm-list-paged__link_inactive',
        INTERVAL: 'b-sm-list-paged__interval-count'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        NEXT_PAGE_CLICK: 'next-page-click',
        PREVIOUS_PAGE_CLICK: 'previous-page-click'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initList_(element);
        this.initControlElements_(element);
        this.initContentElements_(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initControlElementsListeners_();
    };


    /**
     * Initializes links Listeners
     * @private
     */
    View.prototype.initControlElementsListeners_ = function() {
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
     * Link Next Click
     * @private
     */
    View.prototype.onLinkNextClick_ = function() {
        if (this.isActiveLink_(this.dom.linkNext)) {
            this.dispatchEvent({
                'type': View.Event.NEXT_PAGE_CLICK
            });
        }
    };


    /**
     * Link Previous Click
     * @private
     */
    View.prototype.onLinkPreviousClick_ = function() {
        if (this.isActiveLink_(this.dom.linkPrevious)) {
            this.dispatchEvent({
                'type': View.Event.PREVIOUS_PAGE_CLICK
            });
        }
    };


    /**
     * Adds or deletes class to show footer
     * @param {bool} visible
     */
    View.prototype.setFooterVisibility = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.footer,
                Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.footer,
                Utils.CssClass.HIDDEN
            );
    };


    /**
     * Set active or inactive Link
     * @param {bool} active
     * @param {Element} link
     */
    View.prototype.setActiveLink = function(active, link) {
        if (active) {
            goog.dom.classlist.addRemove(
                link,
                View.CssClass.INACTIVE_LINK,
                View.CssClass.ACTIVE_LINK
            );
        } else {
            goog.dom.classlist.addRemove(
                link,
                View.CssClass.ACTIVE_LINK,
                View.CssClass.INACTIVE_LINK
            );
        }
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
     * insert Count
     * @param {number} count
     */
    View.prototype.insertCount = function(count) {
        goog.soy.renderElement(
            this.dom.count,
            sm.bSmListPaged.Template.countText,
            {
                params: {
                    itemsCount: count
                }
            }
        );
    };


    /**
     * insert Interval
     * @param {{
     *     firstIndex: number,
     *     lastIndex: number
     * }} interval
     */
    View.prototype.insertInterval = function(interval) {
        goog.soy.renderElement(
            this.dom.interval,
            sm.bSmListPaged.Template.interval,
            {
                params: {
                    start: interval.firstIndex,
                    end: interval.lastIndex
                }
            }
        );
    };


    /**
     * Initializes dom elements of controls
     * @param {Element} element
     * @private
     */
    View.prototype.initControlElements_ = function(element) {
        this.dom.linkNext = this.getElementByClass(
            View.CssClass.LINK_NEXT,
            element
        );

        this.dom.linkPrevious = this.getElementByClass(
            View.CssClass.LINK_PREVIOUS,
            element
        );

        this.dom.interval = this.getElementByClass(
            View.CssClass.INTERVAL,
            element
        );
    };


    /**
     * Initializes dom elements (containers)
     * @param {Element} element
     * @private
     */
    View.prototype.initContentElements_ = function(element) {
        this.dom.footer = this.getElementByClass(
            View.CssClass.FOOTER,
            element
        );

        this.dom.count = this.getElementByClass(
            View.CssClass.COUNT,
            element
        );
    };


    /**
     * Initializes list of items (dom element)
     * @param {Element} element
     * @private
     */
    View.prototype.initList_ = function(element) {
        this.dom.list = this.getElementByClass(
            sm.bSmItemList.View.CssClass.ROOT,
            element
        );
    };
});  // goog.scope
