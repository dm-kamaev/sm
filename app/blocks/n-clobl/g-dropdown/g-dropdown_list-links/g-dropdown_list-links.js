goog.provide('sm.gDropdown.DropdownListLinks');

goog.require('cl.gDropdown.Dropdown');
goog.require('sm.gDropdown.ViewListLinks');



/**
 * Dropdown control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gDropdown.Dropdown}
 */
sm.gDropdown.DropdownListLinks = function(view, opt_params, opt_domHelper) {
    sm.gDropdown.DropdownListLinks.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * Instance link
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.openerLink_ = null;


    /**
     * Instance list links
     * @type {sm.gList.ListLinks}
     * @private
     */
    this.listLinks_ = null;


    /**
     * array of possible values
     * @type {Array<Object>}
     * @private
     */
    this.valueData_ = null;


    /**
     * is changing opener text
     * @type {boolean}
     * @private
     */
    this.isChangingOpenerText_ = null;
};
goog.inherits(sm.gDropdown.DropdownListLinks, cl.gDropdown.Dropdown);


goog.scope(function() {
    var Dropdown = sm.gDropdown.DropdownListLinks,
        View = sm.gDropdown.ViewListLinks;

    /**
     * Event enum
     * @enum {string}
     */
    Dropdown.Event = {
        OPENER_CLICK: cl.gDropdown.Dropdown.Event.OPENER_CLICK,
        SELECT: goog.events.getUniqueId('select'),
        CLOSE_DROPDOWN: cl.gDropdown.Dropdown.Event.CLOSE_DROPDOWN
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    Dropdown.prototype.decorateInternal = function(element) {
        Dropdown.base(this, 'decorateInternal', element);

        this.initLinkOpener_();
        this.initListLinks_();

        this.params = this.getView().transformParams(this.params);
        this.valueData_ = this.params.values;
        this.isChangingOpenerText_ = this.params.isChangingOpenerText;
        this.opener_ = this.params.opener;
    };


    /**
     * Set dropdown to initial value and clear it
     * @public
     */
    Dropdown.prototype.clear = function() {
        this.listLinks_.deselectAll();

        this.changeOpenerText_();
    };


    /**
     * @public
     * @override
     */
    Dropdown.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.listLinks_,
            cl.gList.List.Event.ITEM_SELECT,
            this.onListItemSelect_
        );
    };


    /**
     * Initializes instance of link - opener
     * @private
     */
    Dropdown.prototype.initLinkOpener_ = function() {
        this.openerLink_ = this.decorateChild(
            'smLink',
            this.getView().getDom().openerLink
        );
    };


    /**
     * Initializes instance of list links
     * @private
     */
    Dropdown.prototype.initListLinks_ = function() {
        this.listLinks_ = this.decorateChild(
            'list-links',
            this.getView().getDom().listLinks
        );
    };


    /**
     * Handler for click on list items
     * @param {goog.events.Event} event
     * @private
     */
    Dropdown.prototype.onListItemSelect_ = function(event) {
        var itemId = event['itemId'];

        this.dispatchEvent({
            'type': Dropdown.Event.SELECT,
            'data': this.getValue(itemId)
        });

        this.changeOpenerText_(itemId);
    };


    /**
     * Calculate new opener text and set it
     * @param {number=} opt_itemId
     * @private
     */
    Dropdown.prototype.changeOpenerText_ = function(opt_itemId) {
        if (this.isChangingOpenerText_) {
            var itemId = opt_itemId || 0;
            var opener = this.opener_ + this.getLabel(itemId);
            this.getView().changeOpenerText(opener);
        }
    };


    /**
     * Get value on list item
     * @param {number} itemId
     * @return {number|string}
     */
    Dropdown.prototype.getValue = function(itemId) {
        return this.valueData_[itemId].value;
    };


    /**
     * Get label on list item
     * @param {number} itemId
     * @return {number|string}
     */
    Dropdown.prototype.getLabel = function(itemId) {
        return this.valueData_[itemId].label;
    };
});  // goog.scope
