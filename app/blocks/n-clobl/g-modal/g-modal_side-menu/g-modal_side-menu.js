goog.provide('sm.gModal.ModalSideMenu');

goog.require('sm.gModal.ModalSideMenuView');



/**
 * Modal control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.gModal.ModalSideMenu = function(view, opt_params, opt_domHelper) {
    sm.gModal.ModalSideMenu.base(
        this, 'constructor', view, opt_params, opt_domHelper);
};
goog.inherits(sm.gModal.ModalSideMenu, cl.gModal.Modal);


goog.scope(function() {
    var Modal = sm.gModal.ModalSideMenu,
        View = sm.gModal.ModalSideMenuView;

    /**
     * @override
     * @param {Element} element
     */
    Modal.prototype.decorateInternal = function(element) {
        Modal.base(this, 'decorateInternal', element);
    };

    /**
     * @override
     * @param {Element} element
     */
    Modal.prototype.enterDocument = function() {
        Modal.base(this, 'enterDocument');

        this.viewListen(
            View.Event.CLOSE,
            this.hide
        );
    };
});  // goog.scope