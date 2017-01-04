goog.provide('sm.gModal.ModalSideMenuView');

goog.require('cl.gModal.View');
goog.require('goog.events');



/**
 * Modal View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gModal.View}
 */
sm.gModal.ModalSideMenuView =
    function(opt_params, opt_template, opt_modifier) {
        sm.gModal.ModalSideMenuView.base(
            this, 'constructor', opt_params, opt_template, opt_modifier
        );


        /**
         * Dom elements
         * @type {Object}
         */
        this.dom = {};
    };
goog.inherits(sm.gModal.ModalSideMenuView, cl.gModal.View);


goog.scope(function() {
    var View = sm.gModal.ModalSideMenuView;

    /**
     * Css Class
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-modal-side-menu',
        CLOSE_ICON: 'g-modal-side-menu__close-icon'
    };

    /**
     * Event
     * @enum
     */
    View.Event = {
        CLOSE: goog.events.getUniqueId('closeSideMenu')
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.dom.closeIcon = this.getElementByClass(
            View.CssClass.CLOSE_ICON
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.closeIcon,
            goog.events.EventType.CLICK,
            this.onCloseIconClick
        );
    };

    /**
     * On close icon click
     */
    View.prototype.onCloseIconClick = function() {
        this.dispatchEvent(View.Event.CLOSE);
    };
});  // goog.scope
