goog.provide('sm.bBadge.Badge');

goog.require('cl.gHint.View');
goog.require('goog.dom.classlist');
goog.require('goog.ui.Component');
goog.require('goog.uri.utils');
goog.require('sm.bBadge.Template');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



/**
 * sm.bBadge.Badge component
 * @param {Object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bBadge.Badge = function(opt_params) {
    goog.base(this);


    /**
     * Elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};


    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};


    /**
     * Defines clickable badge or not
     * @type {boolean}
     * @private
     */
    this.isActive_ = false;
};
goog.inherits(sm.bBadge.Badge, goog.ui.Component);


goog.scope(function() {
    var Badge = sm.bBadge.Badge,
        HintView = cl.gHint.View;

    /**
     * Name of this element in factory
     */
    Badge.NAME = sm.bBadge.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Badge.NAME, {
        control: Badge,
        view: View
    });

    /**
     * Css class enum
     * @enum {string}
     */
    Badge.CssClass = {
        ROOT: 'b-badge',
        RATING: 'b-badge_rating',
        ITEM: 'b-badge__item',
        HINT_HREF: 'b-badge__hint-href',
        ACTIVE_STATE: 'b-badge_active'
    };


    /**
     * @override
     */
    Badge.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.bBadge.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };


    /**
     * @override
     * @param {Element} element
     */
    Badge.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initState_();

        if (this.isRating_()) {
            this.elements_.item = this.getElementByClass(
                Badge.CssClass.ITEM
            );
            this.elements_.hintHref = this.getElementByClass(
                Badge.CssClass.HINT_HREF
            );
        } else {
            this.elements_.itemActive = this.getElementsByClass(
                Badge.CssClass.ITEM
            );

            this.initMetroDataParams_();
        }
    };


    /**
     * @override
     */
    Badge.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        if (this.isActive_) {
            if (this.isRating_()) {
                this.initRatingListeners_();
            }
            else {
                this.initLocationsListeners_();
            }
        }
    };


    /**
     * Initializes listeners for Rating
     * @private
     */
    Badge.prototype.initRatingListeners_ = function() {
        this.getHandler().listen(
            this.elements_.item,
            goog.events.EventType.CLICK,
            this.onItemClickRatingMode_
        );

        this.getHandler().listen(
            this.elements_.hintHref,
            goog.events.EventType.CLICK,
            this.onHintHrefClick_
        );
    };


    /**
     * Initializes listeners for Locations
     * @private
     */
    Badge.prototype.initLocationsListeners_ = function() {
        var itemActiveElements = this.elements_.itemActive;

        if (itemActiveElements) {
            for (var i = 0; i < itemActiveElements.length; i++) {
                this.getHandler().listen(
                    itemActiveElements[i],
                    goog.events.EventType.CLICK,
                    this.onItemClickLocationMode_.bind(this, i)
                );
            }
        }
    };


    /**
     * @override
     */
    Badge.prototype.disposeInternal = function() {
        goog.base(this, 'disposeInternal');

        this.params_ = null;
        this.elements_ = null;
    };


    /**
     * Metro data-params initialization
     * @private
     */
    Badge.prototype.initMetroDataParams_ = function() {
        if (!this.params_.data) {
            this.params_.data = [];

            var itemActiveLength = this.elements_.itemActive.length;

            for (var i = 0, elem, data; i < itemActiveLength; i++) {
                elem = this.elements_.itemActive[i];
                data = JSON.parse(goog.dom.dataset.get(elem, 'params'));
                data['name'] = elem.textContent;

                this.params_.data.push(data);
            }
        }
    };


    /**
     * Detect whether control active
     * @private
     */
    Badge.prototype.initState_ = function() {
        this.isActive_ = goog.dom.classlist.contains(
            this.getElement(),
            Badge.CssClass.ACTIVE_STATE
        );
    };


    /**
     * Checks for display: rating
     * @return {boolean}
     * @private
     */
    Badge.prototype.isRating_ = function() {
        return goog.dom.classlist.contains(
            this.getElement(),
            Badge.CssClass.RATING
        );
    };


    /**
     * On hint href click
     * @private
     */
    Badge.prototype.onHintHrefClick_ = function() {
        window.open('http://dogm.mos.ru/rating/');
    };


    /**
     * On click for display: rating
     * @private
     */
    Badge.prototype.onItemClickRatingMode_ = function() {
        this.toggleHintInlude_();
        this.getHandler().listen(
            document,
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );
    };


    /**
     * On document click actions
     * @param  {Object} event
     * @private
     */
    Badge.prototype.onDocumentClick_ = function(event) {
        var ancestor = goog.dom.getAncestorByClass(
            event.target,
            Badge.CssClass.ITEM
        );

        if (ancestor !== this.elements_.item) {
            this.removeHintInlude_();

            this.getHandler().unlisten(
                document,
                goog.events.EventType.CLICK,
                this.onDocumentClick_
            );
        }
    };


    /**
     * Toggle hint include css class
     * @private
     */
    Badge.prototype.toggleHintInlude_ = function() {
        goog.dom.classlist.toggle(
            this.getElement(),
            HintView.CssClass.INCLUDE_CLICK_MODE
        );
    };


    /**
     * Remove hint include css class
     * @private
     */
    Badge.prototype.removeHintInlude_ = function() {
        goog.dom.classlist.remove(
            this.getElement(),
            HintView.CssClass.INCLUDE_CLICK_MODE
        );
    };


    /**
     * On item active click
     * @param  {number} itemId
     * @private
     */
    Badge.prototype.onItemClickLocationMode_ = function(itemId) {
        var data = this.params_.data[itemId];

        document.location.href = '/school?' +
            goog.uri.utils.buildQueryDataFromMap(data);
    };
});  // goog.scope
