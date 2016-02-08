goog.provide('sm.lSearchResult.bSort.Sort');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('gorod.bList.List');
goog.require('gorod.dropdown.Dropdown');
goog.require('gorod.iUIInstanceStorage.UIInstanceStorage');
goog.require('sm.lSearchResult.bSort.Template');

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
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Instance
     * @type {gorod.bList.List}
     * @private
     */
    this.dropdownList_ = null;

    /**
     * Switcher custom text element
     * @type {Element}
     * @private
     */
    this.switcherCustomTextElement_ = null;
};
goog.inherits(sm.lSearchResult.bSort.Sort, goog.ui.Component);

goog.scope(function() {
    var Sort = sm.lSearchResult.bSort.Sort,
        List = gorod.bList.List;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Sort.CssClass = {
        ROOT: 'b-sort',
        SWITCHER_CUSTOM_TEXT: 'b-dropdown__switcher-custom-text'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Sort.Event = {
        ITEM_CLICK: 'itemClick'
    };

    /**
     * Switcher text enum
     * @enum {string}
     */
    Sort.SwitcherCustomText = {
        AVERAGE_MARK: 'средней оценке',
        EDUCATION: 'образованию',
        TEACHERS: 'преподавателям',
        ATMOSPHERE: 'атмосфере',
        INFRASTRUCTURE: 'инфраструктуре'
    };

    /**
     * Decorate
     * @param {Element} element
     */
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

        this.switcherCustomTextElement_ = goog.dom.getElementByClass(
            Sort.CssClass.SWITCHER_CUSTOM_TEXT,
            element
        );

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
     * Set custom text content for switcher
     * @param {String} text
     * @private
     */
    Sort.prototype.setSwitcherCustomText_ = function(text) {
        goog.dom.setTextContent(
            this.switcherCustomTextElement_,
            text
        );
    };

    /**
     * Item click handler
     * @param {Object} event
     * @param {Object} data
     * @private
     */
    Sort.prototype.itemClickHandler_ = function(event, data) {
        var itemId = data.itemID;

        this.dispatchEvent({
            type: Sort.Event.ITEM_CLICK,
            itemId: itemId
        });
        this.dropdownList_.select(itemId, 0);
        switch (itemId) {
            case 1:
                this.setSwitcherCustomText_(
                    Sort.SwitcherCustomText.EDUCATION
                );
                break;
            case 2:
                this.setSwitcherCustomText_(
                    Sort.SwitcherCustomText.TEACHERS
                );
                break;
            case 3:
                this.setSwitcherCustomText_(
                    Sort.SwitcherCustomText.ATMOSPHERE
                );
                break;
            case 4:
                this.setSwitcherCustomText_(
                    Sort.SwitcherCustomText.INFRASTRUCTURE
                );
                break;
            default:
                this.setSwitcherCustomText_(
                    Sort.SwitcherCustomText.AVERAGE_MARK
                );
                break;
        }
    };
});
