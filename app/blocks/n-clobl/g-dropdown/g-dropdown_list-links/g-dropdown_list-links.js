goog.provide('sm.gDropdown.DropdownListLinks');

goog.require('cl.gDropdown.Dropdown');
goog.require('sm.gDropdown.ViewListLinks');



/**
 * Dropdown control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
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
        CONTENT_CLICK: cl.gDropdown.Dropdown.Event.CONTENT_CLICK,
        CLOSE_DROPDOWN: cl.gDropdown.Dropdown.Event.CLOSE_DROPDOWN
    };


    /**
     * @param {Element} element
     * @override
     */
    Dropdown.prototype.decorateInternal = function(element) {
        Dropdown.base(this, 'decorateInternal', element);

        this.initLinkOpener_();
        this.initListLinks_();
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
});  // goog.scope
