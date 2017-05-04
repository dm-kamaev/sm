goog.provide('sm.gModal.ModalSideMenu');

goog.require('sm.bAuthorizationLink.AuthorizationLink');
goog.require('sm.bSmContacts.SmContacts');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.TemplateSideMenu');
goog.require('sm.gModal.ViewSideMenu');
goog.require('sm.iCloblFactory.FactoryStendhal');



/**
 * Modal control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {sm.gModal.ModalStendhal}
 */
sm.gModal.ModalSideMenu = function(view, opt_params, opt_domHelper) {
    sm.gModal.ModalSideMenu.base(
        this, 'constructor', view, opt_params, opt_domHelper);

    /**
     * Instances of menu links
     * @type {Array<sm.bSmLink.SmLink>}
     * @private
     */
    this.menuLinks_ = null;


    /**
     * Instances of footer links
     * @type {Array<sm.bSmLink.SmLink>}
     * @private
     */
    this.footerLinks_ = null;


    /**
     * Contacts block instance
     * @type {sm.bSmContacts.SmContacts}
     * @private
     */
    this.contacts_ = null;


    /**
     * Authorization Link instance
     * @type {sm.bAuthorizationLink.AuthorizationLink}
     * @private
     */
    this.authorizationLink_ = null;
};
goog.inherits(sm.gModal.ModalSideMenu, sm.gModal.ModalStendhal);


goog.scope(function() {
    var Modal = sm.gModal.ModalSideMenu,
        View = sm.gModal.ViewSideMenu;

    /**
     * Name of this element in factory
     */
    Modal.NAME = sm.gModal.TemplateSideMenu.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Modal.NAME, {
        control: Modal,
        view: View
    });

    /**
     * Events enum
     * @enum {string}
     * @const
     */
    Modal.Event = {
        SHOW: sm.gModal.ModalStendhal.Event.SHOW,
        HIDE: sm.gModal.ModalStendhal.Event.HIDE
    };


    /**
     * @override
     * @param {Element} element
     */
    Modal.prototype.decorateInternal = function(element) {
        Modal.base(this, 'decorateInternal', element);

        this.initMenuLinks_();
        this.initFooterLinks_();
        this.initContacts_();
        this.initAuthorizationLink_();
    };


    /**
     * Menu links initialization
     * @private
     */
    Modal.prototype.initMenuLinks_ = function() {
        this.menuLinks_ = this.decorateChildren(
            sm.bSmLink.SmLink.NAME,
            this.getView().getDom().menuLinks
        );
    };


    /**
     * Footer links initialization
     * @private
     */
    Modal.prototype.initFooterLinks_ = function() {
        this.footerLinks_ = this.decorateChildren(
            sm.bSmLink.SmLink.NAME,
            this.getView().getDom().footerLinks
        );
    };


    /**
     * Authorization Link instanse initialization
     * @private
     */
    Modal.prototype.initAuthorizationLink_ = function() {
        this.authorizationLink_ = this.decorateChild(
            sm.bAuthorizationLink.AuthorizationLink.NAME,
            this.getView().getDom().authorizationLink
        );
    };


    /**
     * Contacts instanse initialization
     * @private
     */
    Modal.prototype.initContacts_ = function() {
        this.contacts_ = this.decorateChild(
            sm.bSmContacts.SmContacts.NAME,
            this.getView().getDom().contacts
        );
    };
});  // goog.scope
