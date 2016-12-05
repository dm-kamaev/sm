goog.provide('sm.bSmBalloon.SmBalloon');

goog.require('cl.iControl.Control');
goog.require('sm.bSmBalloon.View');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.bSmListPaged.SmListPaged');


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


        /**
         * Instance list paged
         * @type {sm.bSmListPaged.SmListPaged}
         * @private
         */
        this.listPaged_ = null;
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
        LIST_PAGE_CHANGE: sm.bSmListPaged.SmListPaged.Event.PAGE_CHANGE
    };


    /**
     * @typedef {sm.bSmBalloon.View.RenderParams}
     */
    sm.bSmBalloon.SmBalloon.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number, Array)>} rawParams
     * @return {sm.bSmBalloon.SmBalloon.RenderParams}
     */
    Balloon.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
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
     * @override
     */
    Balloon.prototype.enterDocument = function() {
        Balloon.base(this, 'enterDocument');

        if (goog.isDefAndNotNull(this.listPaged_)) {

            this.getHandler().listen(
                this.listPaged_,
                sm.bSmListPaged.SmListPaged.Event.ITEM_CLICK,
                this.sendAnalyticsItemClick_
            );
        }

        this.autoDispatch(
            View.Event.CLOSE_BUTTON_CLICK, Balloon.Event.CLOSE_BUTTON_CLICK
        );
    };


    /**
     * Send analytics item click
     * @param {goog.events.Event} event
     * @private
     */
    Balloon.prototype.sendAnalyticsItemClick_ = function(event) {
        this.listPaged_.sendAnalyticsItemClick(event.data.itemId,
            'map balloon');
    };


    /**
     * Inner components initialization
     * @private
     */
    Balloon.prototype.initComponents_ = function() {
        var dom = this.getView().getDom();

        if (goog.isDefAndNotNull(dom.itemList)) {
            this.listPaged_ =
                this.decorateChild('smListPaged', dom.itemList);
        }

        if (goog.isDefAndNotNull(dom.descriptionLink)) {
            this.descriptionLink_ =
                this.decorateChild('smLink', dom.descriptionLink);
        }
    };
});  // goog.scope
