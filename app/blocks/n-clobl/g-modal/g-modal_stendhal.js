goog.provide('sm.gModal.ModalStendhal');

goog.require('cl.gModal.Modal');
goog.require('goog.dom');
goog.require('sm.gModal.TemplateStendhal');
goog.require('sm.gModal.ViewStendhal');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');



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


    /**
     * Determines whether self destroy instance
     * @type {bool}
     * @private
     */
    this.selfDestroy_ = false;
};
goog.inherits(sm.gModal.ModalStendhal, cl.gModal.Modal);


goog.scope(function() {
    var Modal = sm.gModal.ModalStendhal,
        View = sm.gModal.ViewStendhal,
        Factory = sm.iNewFactory.FactoryStendhal.INSTANCE;

    /**
     * Name of this element in factory
     */
    Modal.NAME = sm.gModal.TemplateStendhal.NAME();

    Factory.register(Modal.NAME, {
        control: Modal,
        view: View
    });

    /**
     * Events enum
     * @enum {string}
     * @const
     */
    Modal.Event = {
        SHOW: cl.gModal.Modal.Event.SHOW,
        HIDE: cl.gModal.Modal.Event.HIDE
    };


    /**
     * render modal
     * @param {Object=} opt_params
     * @param {bool=} opt_selfDestroy
     * @return {sm.gModal.ModalStendhal}
     */
    Modal.render = function(opt_params, opt_selfDestroy) {
        var instance = Factory.render(
            Modal.NAME,
            goog.dom.getDocument().body,
            opt_params
        );

        instance.selfDestroy_ = opt_selfDestroy;

        return instance;
    };


    /**
     * @override
     */
    Modal.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        this.getHandler().listen(
            this.getView(),
            View.Event.CLOSE,
            this.onCloseClick_
        );
    };


    /**
     * @override
     * @param {Element} element
     */
    Modal.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };


    /**
     * render content
     * @param {string} templateType
     * @param {Object} templateParams
     * @return {Object}
     */
    Modal.prototype.renderContent = function(templateType, templateParams) {

        return Factory.render(
            templateType,
            this.getView().getDom().content,
            templateParams,
            this
        );
    };


    /**
     * remove modal and content
     */
    Modal.prototype.remove = function() {
        this.hide();
        this.dispose();
    };


    /**
     * close click
     * @private
     */
    Modal.prototype.onCloseClick_ = function() {
        if (this.selfDestroy_) {
            this.remove();
        } else {
            this.hide();
        }
    };
});  // goog.scope
