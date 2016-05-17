goog.provide('sm.gModal.ModalStendhal');

goog.require('cl.gModal.Modal');
goog.require('sm.gModal.ViewStendhal');



/**
 * Modal control
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gModal.Modal}
 */
sm.gModal.ModalStendhal = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);


    /**
     * List
     * @type {cl.gList.List}
     * @private
     */
    this.list_ = null;
};
goog.inherits(sm.gModal.ModalStendhal, cl.gModal.Modal);


goog.scope(function() {
    var Modal = sm.gModal.ModalStendhal,
        View = sm.gModal.ViewStendhal;


    /**
     * @override
     */
    Modal.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        this.getHandler().listen(
            this.getView(),
            View.Event.CLOSE,
            this.hide
        );
    };
});  // goog.scope
