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
         */
        this.links = [];
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
    };


    /**
     * Link instanses initialization
     * @private
     */
    Header.prototype.initLinks_ = function() {
        var links = this.getView().getLinks();
        this.links = this.decorateChildren('smLink', links);
    };


    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        Header.base(this, 'enterDocument');
    };

});  // goog.scope
