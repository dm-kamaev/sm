goog.provide('sm.bSmFooter.SmFooter');

goog.require('cl.iControl.Control');



/**
 * Constructor
 * @param {Object} view
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sm.bSmFooter.SmFooter = function(view, opt_domHelper) {
    sm.bSmFooter.SmFooter.base(this, 'constructor', view, opt_domHelper);


    /**
     * Links instances
     * @type {sm.bSmLink.SmLink}
     * @private
     */
    this.links_ = [];
};
goog.inherits(sm.bSmFooter.SmFooter, cl.iControl.Control);


goog.scope(function() {
    var Footer = sm.bSmFooter.SmFooter,
        View = sm.bSmFooter.View;

    /**
     * @override
     */
    Footer.prototype.decorateInternal = function(element) {
        Footer.base(this, 'decorateInternal', element);

        this.initLinks_();
    };


    /**
     * Init links instances
     * @private
     */
    Footer.prototype.initLinks_ = function() {
        this.links_ = this.decorateChildren(
            'smLink',
            this.getView().getDom().links
        );
    };
});  // goog.scope
