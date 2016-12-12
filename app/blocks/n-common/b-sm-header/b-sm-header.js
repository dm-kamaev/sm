goog.provide('sm.bSmHeader.SmHeader');

goog.require('cl.iControl.Control');


goog.scope(function() {



    /**
     * Header block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmHeader.SmHeader = function(view, opt_domHelper) {
        sm.bSmHeader.SmHeader.base(
            this, 'constructor', view, opt_domHelper
        );

        /**
         * Array of link instances
         * @type {array<sm.bSmLink.SmLink>}
         * @private
         */
        this.links_ = [];

        /**
         * Side menu instance (actually it's a modal)
         * @type {cl.gModal.Modal}
         * @private
         */
        this.sideMenu_ = null;
    };
    goog.inherits(sm.bSmHeader.SmHeader, cl.iControl.Control);
    var Header = sm.bSmHeader.SmHeader;


    /**
     * List of Header events
     * @enum {string}
     * @const
     */
    Header.Event = {
    };


    /**
     * @override
     * @param {Element} element
     */
    Header.prototype.decorateInternal = function(element) {
        Header.base(this, 'decorateInternal', element);

        this.initLinks_();
        this.initSideMenu_();
    };


    /**
     * Link instanses initialization
     * @private
     */
    Header.prototype.initLinks_ = function() {
        var links = this.getView().getLinks();
        this.links_ = this.decorateChildren('smLink', links);
    };

    /**
     * @private
     */
    Header.prototype.initSideMenu_ = function() {
        var dom = this.getView().getDom();
        this.sideMenu_ =
            this.decorateChild('sideMenuModal', dom.sideMenu);
    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        Header.base(this, 'enterDocument');
    };

    /**
     * Shows or hides the menu
     * @public
     */
    Header.prototype.toggleMenu = function() {
        this.sideMenu_.show();
    };

});  // goog.scope
