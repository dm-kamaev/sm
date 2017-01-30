/**
 * @fileoverview Brief score block
 */

goog.provide('sm.bSmScore.SmScoreBrief');

goog.require('sm.bSmScore.SmScore');
goog.require('sm.bSmScore.TemplateBrief');
goog.require('sm.bSmScore.ViewBrief');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');

goog.scope(function() {



    /**
     * Constructor
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {cl.iControl.Control}
     */
    sm.bSmScore.SmScoreBrief = function(view, opt_domHelper) {
        sm.bSmScore.SmScoreBrief.base(
            this, 'constructor', view, opt_domHelper
        );

        this.setSupportedState(goog.ui.Component.State.ALL, false);
    };
    goog.inherits(sm.bSmScore.SmScoreBrief, sm.bSmScore.SmScore);


    var Score = sm.bSmScore.SmScoreBrief,
        View = sm.bSmScore.ViewBrief;

    /**
     * Name of this element in factory
     */
    Score.NAME = sm.bSmScore.TemplateBrief.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(Score.NAME, {
        control: Score,
        view: View
    });

    /**
     * Event enum
     * @enum
     */
    Score.Event = {
        PRIMARY_NAME_SHOW: View.Event.PRIMARY_NAME_SHOW,
        PRIMARY_NAME_HIDE: View.Event.PRIMARY_NAME_HIDE
    };


    /**
     * @typedef {sm.bSmScore.ViewBrief.RenderParams}
     */
    sm.bSmScore.SmScoreBrief.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, Object>} rawParams
     * @return {sm.bSmScore.SmScoreBrief.RenderParams}
     */
    Score.getRenderParams = function(rawParams) {
        return View.getRenderParams(rawParams);
    };


    /**
     * @override
     */
    Score.prototype.enterDocument = function() {
        Score.base(this, 'enterDocument');

        this.initViewListeners_();
    };


     /**
     * Initializes listeners for view
     * @private
     */
    Score.prototype.initViewListeners_ = function() {
        this.autoDispatch(
            Score.Event.PRIMARY_NAME_SHOW
        );

        this.autoDispatch(
            Score.Event.PRIMARY_NAME_HIDE
        );
    };
});  // goog.scope
