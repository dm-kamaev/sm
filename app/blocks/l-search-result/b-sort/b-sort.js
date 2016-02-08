goog.provide('sm.lSearchResult.bSort.Sort');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.iFactory.FactoryStendhal');
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
     * @type {cl.gDropdown.Dropdown}
     * @private
     */
    this.dropdown_ = null;

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
        DropdownView = cl.gDropdown.View,
        List = cl.gList.List;

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

        this.switcherCustomTextElement_ = this.getElementByClass(
            Sort.CssClass.SWITCHER_CUSTOM_TEXT
        );

        this.dropdown_ = sm.iFactory.FactoryStendhal.getInstance().decorate(
            'dropdown',
            this.getElementByClass(DropdownView.CssClass.ROOT),
            this
        );
    };

    /**
     * Set up the Component.
     */
    Sort.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dropdown_,
            List.Event.ITEM_SELECT,
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
     * @private
     */
    Sort.prototype.itemClickHandler_ = function(event) {
        var itemId = event.itemId;

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
