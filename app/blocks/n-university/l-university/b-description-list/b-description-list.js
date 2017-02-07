goog.provide('sm.lUniversity.bDescriptionList.DescriptionList');

goog.require('cl.iControl.Control');



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
    var DescriptionList = sm.lUniversity.bDescriptionList.DescriptionList;


    /**
     * @protected
     * @override
     */
    DescriptionList.prototype.decorateInternal = function(element) {
        DescriptionList.base(this, 'decorateInternal', element);
        var dom = this.getView().getDom();
        if (dom.links) {
            this.decorateChildren(
                'smLink',
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
