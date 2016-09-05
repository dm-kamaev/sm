goog.provide('sm.bSmBalloon.SmBalloon');

goog.require('cl.iControl.Control');
goog.require('sm.bSmBalloon.View');


goog.scope(function() {
    var View = sm.bSmBalloon.View;



    /**
     * Ymaps ballon content template block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmBalloon.SmBalloon = function(view, opt_domHelper) {
        sm.bSmBalloon.SmBalloon.base(
            this, 'constructor', view, opt_domHelper
        );


    };
    goog.inherits(sm.bSmBalloon.SmBalloon, cl.iControl.Control);
    var Balloon = sm.bSmBalloon.SmBalloon;


    /**
     * List of Balloon events
     * @enum {string}
     * @const
     */
    Balloon.Event = {
        CLOSE_BUTTON_CLICK: View.Event.CLOSE_BUTTON_CLICK,
        TITLE_LINK_CLICK: View.Event.TITLE_LINK_CLICK
    };


    /**
     * @override
     * @param {Element} element
     */
    Balloon.prototype.decorateInternal = function(element) {
        Balloon.base(this, 'decorateInternal', element);

        this.initComponents_();
    };


    /**
     * Inner components initialization
     * @private
     */
    Balloon.prototype.initComponents_ = function() {
        var titleLink = this.getView().getDom().titleLink;
        if (goog.isDefAndNotNull(titleLink)) {
            this.decorateChild(
                'smLink',
                titleLink
            );
        }
    };

    /**
     * @override
     */
    Balloon.prototype.enterDocument = function() {
        Balloon.base(this, 'enterDocument');
        this.autoDispatch(
            View.Event.CLOSE_BUTTON_CLICK, Balloon.Event.CLOSE_BUTTON_CLICK
        );
    };

});  // goog.scope
