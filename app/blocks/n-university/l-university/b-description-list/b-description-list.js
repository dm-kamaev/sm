goog.provide('sm.lUniversity.bDescriptionList.DescriptionList');

goog.require('cl.iControl.Control');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.iCloblFactory.FactoryStendhal');
goog.require('sm.lUniversity.bDescriptionList.Template');
goog.require('sm.lUniversity.bDescriptionList.View');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.lUniversity.bDescriptionList.DescriptionList = function(
    view, opt_domHelper
) {
    sm.lUniversity.bDescriptionList.DescriptionList.base(
        this, 'constructor', view, opt_domHelper
    );
};
goog.inherits(
    sm.lUniversity.bDescriptionList.DescriptionList, cl.iControl.Control
);


goog.scope(function() {
    var DescriptionList = sm.lUniversity.bDescriptionList.DescriptionList,
        View = sm.lUniversity.bDescriptionList.View;

    /**
     * Name of this element in factory
     */
    DescriptionList.NAME =
        sm.lUniversity.bDescriptionList.Template.NAME();

    sm.iCloblFactory.FactoryStendhal.getInstance().register(
        DescriptionList.NAME,
        {
            control: DescriptionList,
            view: View
        }
    );


    /**
     * @protected
     * @override
     */
    DescriptionList.prototype.decorateInternal = function(element) {
        DescriptionList.base(this, 'decorateInternal', element);
        var dom = this.getView().getDom();
        if (dom.links) {
            this.decorateChildren(
                sm.bSmLink.SmLink.NAME,
                dom.links
            );
        }
    };


    /**
     * @override
     * @protected
     */
    DescriptionList.prototype.enterDocument = function() {
        DescriptionList.base(this, 'enterDocument');
    };
});  // goog.scope
