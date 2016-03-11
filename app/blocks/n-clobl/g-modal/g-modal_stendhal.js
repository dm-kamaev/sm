goog.provide('sm.gModal.ModalStendhal');

goog.require('cl.gModal.Modal');


/**
 * Modal control
 * @param {Object=} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gModal.Modal}
 */
sm.gModal.ModalStendhal = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    /**
     * List
     * @type {cl.gList.List}
     * @private
     */
    this.list_ = null;
};
goog.inherits(sm.gModal.ModalStendhal, cl.gModal.Modal);


goog.scope(function() {
    var Modal = sm.gModal.ModalStendhal;

    /**
     * @override
     */
    Modal.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.getView().getDom().closer,
            goog.events.EventType.CLICK,
            this.hide
        );
    };
});
