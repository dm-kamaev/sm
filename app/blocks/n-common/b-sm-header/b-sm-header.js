goog.provide('sm.bSmHeader.SmHeader');

goog.require('cl.iControl.Control');
goog.require('sm.bAuthorizationLink.AuthorizationLink');
goog.require('sm.bSmHeader.Template');
goog.require('sm.bSmHeader.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iCloblFactory.FactoryStendhal');


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
         * Authorization Link instance
         * @type {sm.bAuthorizationLink.AuthorizationLink}
         * @private
         */
        this.authorizationLink_ = null;
    };
    goog.inherits(sm.bSmHeader.SmHeader, cl.iControl.Control);
    var Header = sm.bSmHeader.SmHeader,
        View = sm.bSmHeader.View;

    /**
     * Name of this element in factory
     */
    Header.NAME = sm.bSmHeader.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Header.NAME, {
        control: Header,
        view: View
    });

    /**
     * @override
     * @public
     */
    Header.prototype.enterDocument = function() {
        Header.base(this, 'enterDocument');
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    Header.prototype.decorateInternal = function(element) {
        Header.base(this, 'decorateInternal', element);

        this.initLinks_();
        this.initAuthorizationLink_();
    };


    /**
     * Link instanses initialization
     * @private
     */
    Header.prototype.initLinks_ = function() {
        var links = this.getView().getLinks();
        this.links_ = this.decorateChildren(sm.bSmLink.SmLink.NAME, links);
    };


    /**
     * Authorization Link instanse initialization
     * @private
     */
    Header.prototype.initAuthorizationLink_ = function() {
        this.authorizationLink_ = this.decorateChild(
            sm.bAuthorizationLink.AuthorizationLink.NAME,
            this.getView().getDom().authorizationLink
        );
    };
});  // goog.scope
