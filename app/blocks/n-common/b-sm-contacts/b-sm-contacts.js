goog.provide('sm.bSmContacts.SmContacts');

goog.require('cl.iControl.Control');
goog.require('sm.bSmContacts.Template');
goog.require('sm.bSmContacts.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iCloblFactory.FactoryStendhal');


goog.scope(function() {




    /**
     * Contacts block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmContacts.SmContacts = function(view, opt_domHelper) {
        sm.bSmContacts.SmContacts.base(
            this, 'constructor', view, opt_domHelper
        );

        /**
         * Link instance
         * @type {sm.bSmLink.SmLink}
         * @private
         */
        this.helperLink_ = null;
    };
    goog.inherits(sm.bSmContacts.SmContacts, cl.iControl.Control);
    var Contacts = sm.bSmContacts.SmContacts,
        View = sm.bSmContacts.View;


    /**
     * Name of this element in factory
     */
    Contacts.NAME = sm.bSmContacts.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(Contacts.NAME, {
        control: Contacts,
        view: View
    });


    /**
     * @param {Element} element
     * @override
     * @protected
     */
    Contacts.prototype.decorateInternal = function(element) {
        Contacts.base(this, 'decorateInternal', element);

        this.initLink_();
    };


    /**
     * Link init
     * @private
     */
    Contacts.prototype.initLink_ = function() {
        var helperLink = this.getView().getDom().helperLink;

        if (helperLink) {
            this.helperLink_ = this.decorateChild(
                sm.bSmLink.SmLink.NAME,
                helperLink
            );
        }
    };
});  // goog.scope
