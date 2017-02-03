goog.provide('sm.gDropdown.DropdownListLinks');

goog.require('sm.bSmLink.SmLink');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.gDropdown.TemplateListLinks');
goog.require('sm.gDropdown.ViewListLinks');
goog.require('sm.gList.ListLinks');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Dropdown control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.gDropdown.DropdownSelect}
 */
sm.gDropdown.DropdownListLinks = function(view, opt_params, opt_domHelper) {
    sm.gDropdown.DropdownListLinks.base(
        this, 'constructor', view, opt_params, opt_domHelper
    );


    /**
     * @type {sm.gDropdown.DropdownSelect.Params}
     * @override
     * @protected
     */
    this.params = view.getParams() || {};


    /**
     * Instance link
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.openerLink_ = null;


    /**
     * Instance list links
     * @type {sm.gList.ListLinks}
     * @protected
     * @override
     */
    this.list = null;
};
goog.inherits(sm.gDropdown.DropdownListLinks, sm.gDropdown.DropdownSelect);


goog.scope(function() {
    var Dropdown = sm.gDropdown.DropdownListLinks,
        View = sm.gDropdown.ViewListLinks;

    /**
     * Name of this element in factory
     */
    Dropdown.NAME = sm.gDropdown.TemplateListLinks.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Dropdown.NAME, {
        control: Dropdown,
        view: View
    });

    /**
     * Event enum
     * @enum {string}
     */
    Dropdown.Event = {
        OPENER_CLICK: sm.gDropdown.DropdownSelect.Event.OPENER_CLICK,
        CONTENT_CLICK: sm.gDropdown.DropdownSelect.Event.CONTENT_CLICK,
        CLOSE_DROPDOWN: sm.gDropdown.DropdownSelect.Event.CLOSE_DROPDOWN,
        ITEM_SELECT: sm.gDropdown.DropdownSelect.Event.ITEM_SELECT
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    Dropdown.prototype.decorateInternal = function(element) {
        Dropdown.base(this, 'decorateInternal', element);

        this.initLinkOpener_();
    };


    /**
     * @public
     * @override
     */
    Dropdown.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };


    /**
     * Initializes instance of list links
     * @protected
     * @override
     */
    Dropdown.prototype.initList = function() {
        this.list = this.decorateChild(
            sm.gList.ListLinks.NAME,
            this.getView().getDom().list
        );
    };


    /**
     * Initializes instance of link - opener
     * @private
     */
    Dropdown.prototype.initLinkOpener_ = function() {
        this.openerLink_ = this.decorateChild(
            sm.bSmLink.SmLink.NAME,
            this.getView().getDom().openerLink
        );
    };
});  // goog.scope
