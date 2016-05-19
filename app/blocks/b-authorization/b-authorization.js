goog.provide('sm.bAuthorization.Authorization');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('sm.bAuthorization.View');



/**
 * Authorization
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bAuthorization.Authorization = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * Auth modal window
     * @type {sm.gModal.ModalAuth}
     * @private
     */
    this.socialModal_ = null;
};
goog.inherits(sm.bAuthorization.Authorization, cl.iControl.Control);



goog.scope(function() {
    var Authorization = sm.bAuthorization.Authorization,
        View = sm.bAuthorization.View,
        factoryManager = cl.iFactory.FactoryManager.getInstance();


    /**
     * Singleton getter
     * @return {sm.bAuthorization.Authorization}
     */
    Authorization.getInstance = function() {
        if (!Authorization.instance_) {
            Authorization.instance_ = factoryManager.decorate(
                'stendhal',
                'authorization',
                goog.dom.getElementByClass(View.CssClass.ROOT)
            );
        }

        return Authorization.instance_;
    };

    /**
     * @override
     * @param {Element} element
     */
    Authorization.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.initSocialModal_();
    };


    /**
     * show authorization modal
     */
    Authorization.prototype.login = function() {
        this.socialModal_.show();
    };


    /**
     * logout
     */
    Authorization.prototype.logout = function() {
    };


    /**
     * init Social Modal
     * @private
     */
    Authorization.prototype.initSocialModal_ = function() {
        this.socialModal_ = this.decorateChild(
            'auth-social-modal',
            this.getView().getDom().socialModal
        );
    };


    jQuery(function() {
        Authorization.getInstance();
    });
});  // goog.scope
