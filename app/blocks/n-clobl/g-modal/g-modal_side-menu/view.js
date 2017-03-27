goog.provide('sm.gModal.ViewSideMenu');

goog.require('goog.events');
goog.require('sm.gModal.ViewStendhal');



/**
 * Modal View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.gModal.ViewStendhal}
 */
sm.gModal.ViewSideMenu =
    function(opt_params, opt_template, opt_modifier) {
        sm.gModal.ViewSideMenu.base(
            this, 'constructor', opt_params, opt_template, opt_modifier
        );


        /**
         * Dom elements
         * @type {Object}
         */
        this.dom = {};
    };
goog.inherits(sm.gModal.ViewSideMenu, sm.gModal.ViewStendhal);


goog.scope(function() {
    var View = sm.gModal.ViewSideMenu;

    /**
     * Css Class
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-modal_side-menu',
        MENU_LINK: 'g-modal__menu-link',
        FOOTER_LINK: 'g-modal__footer-link'
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Dom elements initialization
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.menuLinks = this.getElementsByClass(
            View.CssClass.MENU_LINK
        );

        this.dom.footerLinks = this.getElementsByClass(
            View.CssClass.FOOTER_LINK
        );

        this.dom.authorizationLink = this.getElementByClass(
            sm.bAuthorizationLink.View.CssClass.ROOT
        );

        this.dom.contacts = this.getElementByClass(
            sm.bSmContacts.View.CssClass.ROOT
        );
    };
});  // goog.scope
