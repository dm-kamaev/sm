goog.provide('sm.bSmBalloon.SmBalloon');

goog.require('cl.iControl.Control');
goog.require('sm.bSmBalloon.Event.Open');
goog.require('sm.bSmBalloon.Template');
goog.require('sm.bSmBalloon.View');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.bSmListPaged.SmListPaged');
goog.require('sm.iAnalytics.Analytics');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');


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

    var Balloon = sm.bSmBalloon.SmBalloon,
        Analytics = sm.iAnalytics.Analytics;

    /**
     * Name of this element in factory
     */
    Balloon.NAME = sm.bSmBalloon.Template.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Balloon.NAME, {
        control: Balloon,
        view: View
    });

    /**
     * List of Balloon events
     * @enum {string}
     * @const
     */
    Balloon.Event = {
        CLOSE_BUTTON_CLICK: View.Event.CLOSE_BUTTON_CLICK,
        LIST_PAGE_CHANGE: sm.bSmListPaged.SmListPaged.Event.PAGE_CHANGE,
        OPEN: sm.bSmBalloon.Event.Open.Type
    };


    /**
     * @typedef {sm.bSmBalloon.View.RenderParams}
     */
    sm.bSmBalloon.SmBalloon.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {sm.bSmBalloon.Template.Params.Data} rawParams
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

        this.initListListeners_();
        this.initDescriptionListeners_();

        this.dispatchOpenBalloonEvent_();
        this.autoDispatch(View.Event.CLOSE_BUTTON_CLICK);
    };


    /**
     * Init list paged listeners
     * @private
     */
    Balloon.prototype.initListListeners_ = function() {
        if (goog.isDefAndNotNull(this.listPaged_)) {
            this.getHandler().listen(
                this.listPaged_,
                sm.bSmListPaged.SmListPaged.Event.ITEM_CLICK,
                this.sendAnalyticsItemClick_
            );
        }
    };


    /**
     * Init description link listeners
     * @private
     */
    Balloon.prototype.initDescriptionListeners_ = function() {
        this.viewListen(
            View.Event.DESCRIPTION_LINK_CLICK,
            this.onDescriptionLinkClick_
        );
    };


    /**
     * Dispatch event of ballonn open
     * @private
     */
    Balloon.prototype.dispatchOpenBalloonEvent_ = function() {
        this.dispatchEvent(
            new sm.bSmBalloon.Event.Open(this.params.data)
        );
    };


    /**
     * Description link click handler
     * @private
     */
    Balloon.prototype.onDescriptionLinkClick_ = function() {
        this.sendAnalyticsDescriptionLinkClick_();
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
     * Send analytics description link click
     * @private
     */
    Balloon.prototype.sendAnalyticsDescriptionLinkClick_ = function() {
        var data = this.params.data;

        var list = 'map balloon';

        var params = {
            id: data.id,
            name: data.header.title,
            list: list,
            position: 1
        };

        Analytics.getInstance().clickProduct(params, list);

        Analytics.getInstance().sendEvent(
            list,
            'click',
            0
        );
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
