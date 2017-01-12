goog.provide('sm.gModal.ModalSideMenu');

goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.ViewSideMenu');



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
};
goog.inherits(sm.gModal.ModalSideMenu, sm.gModal.ModalStendhal);


goog.scope(function() {
    var Modal = sm.gModal.ModalSideMenu,
        View = sm.gModal.ViewSideMenu;


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
    };


    /**
     * Menu links initialization
     * @private
     */
    Modal.prototype.initMenuLinks_ = function() {
        this.menuLinks_ = this.decorateChildren(
            'smLink',
            this.getView().getDom().menuLinks
        );
    };


    /**
     * Footer links initialization
     * @private
     */
    Modal.prototype.initFooterLinks_ = function() {
        this.footerLinks_ = this.decorateChildren(
            'smLink',
            this.getView().getDom().footerLinks
        );
    };
});  // goog.scope
