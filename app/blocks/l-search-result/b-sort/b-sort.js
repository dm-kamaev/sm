goog.provide('sm.lSearchResult.bSort.Sort');

goog.require('sm.lSearchResult.bSort.Template');
goog.require('gorod.iUIInstanceStorage.UIInstanceStorage');
goog.require('gorod.dropdown.Dropdown');
goog.require('gorod.bBouton.Bouton');
goog.require('gorod.bList.List');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Sort component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bSort.Sort = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type{Object}
     */
    this.params_ = opt_params || {};

    /**
     * Instance
     * @type {gorod.bList.List}
     * @private
     */
    this.dropdownList_ = null;
};
goog.inherits(sm.lSearchResult.bSort.Sort, goog.ui.Component);

goog.scope(function() {
    var Sort = sm.lSearchResult.bSort.Sort,
        Bouton = gorod.bBouton.Bouton,
        List = gorod.bList.List;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Sort.CssClass = {
        ROOT: 'b-sort'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Sort.Event = {
        ITEM_CLICK: 'itemClick'
    };

    Sort.prototype.decorate = function(element) {
        goog.base(this, 'decorate', element);

        this.params_ = jQuery(element).data('params') || {};
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Sort.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bSort.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    Sort.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var dropdownListElement = goog.dom.getElementByClass(
            List.CSS_ROOT,
            element
        );

        var storage = gorod.iUIInstanceStorage.UIInstanceStorage.getInstance();

        this.dropdownList_ = storage.getInstanceByElement(dropdownListElement);
    };

    /**
     * Set up the Component.
     */
    Sort.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.dropdownList_.addEventListener(
            List.Event.ITEM_CLICK,
            this.itemClickHandler_,
            false,
            this
        );
    };

    /**
     * Clean up the Component.
     */
    Sort.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');

        this.dropdownList_.removeEventListener(
            List.Event.ITEM_CLICK,
            this.itemClickHandler_
        );
    };

    /**
     * Item click handler
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    Sort.prototype.itemClickHandler_ = function(event, data) {
        this.dispatchEvent({
            type: Sort.Event.ITEM_CLICK,
            itemId: data.itemID
        });
    };
});

