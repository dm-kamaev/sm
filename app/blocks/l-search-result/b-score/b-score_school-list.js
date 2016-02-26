goog.provide('sm.bScoreSchoolList.ScoreSchoolList');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.labs.userAgent.device');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bMark.bMark');
goog.require('sm.bScore.Score');
goog.require('sm.bScoreSchoolList.Template');


/**
 * Score component in school list view
 * @param {object} opt_params
 * @constructor
 * @extends {sm.bScore.Score}
 */
sm.bScoreSchoolList.ScoreSchoolList = function(opt_params) {
    goog.base(this);
    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     * @private
     * @type {array.<Number>}
     */
    this.score_ = this.params_.score ? this.params_.score : [];

    /**
     * @private
     * @type {Number}
     */
    this.currentCriterion_ = this.params_.currentCriterion.value ?
        this.params_.currentCriterion.value :
        0;
    /**
     * Defines clickable or not
     * @type {boolean}
     * @private
     */
    this.isClickable_ = this.params_.isClickable;

    /**
     * Tooltip dom element
     * @private
     * @type {Node}
     */
    this.tooltip_ = null;

    /**
     * Dom element with name of current criteria of sort
     * @private
     * @type {Node}
     */
    this.criterionNameElement_ = null;

    /**
     * Dom element with mark of current criteria of sort
     * @private
     * @type {Node}
     */
    this.criterionValueElement_ = null;

    /**
     * Dom element with names of criterias in tooltip
     * @private
     * @type {Node}
     */
    this.tooltipNameElements_ = [];

    /**
     * Indicates is tooltip showed or not
     * @private
     * @type {boolean}
     */
    this.tooltipShowed_ = false;

    /**
     * B-mark Instances
     * @private
     * @type {sm.bMark.bMark}
     */
    this.markInstances_ = [];
};
goog.inherits(sm.bScoreSchoolList.ScoreSchoolList, sm.bScore.Score);

goog.scope(function() {
    var Score = sm.bScoreSchoolList.ScoreSchoolList,
        Mark = sm.bMark.bMark;

    /**
     * Css class enum
     * @enum {String}
     */
    Score.CssClass = {
        ROOT: 'b-score',
        TOOLTIP: 'b-score__other-marks',
        TOOLTIP_NAME: 'b-score__mark-name',
        MARK_NAME: 'b-score__mark-name',
        CURRENT_CRITERION_NAME: 'b-score__current-criterion-name',
        CURRENT_CRITERION_VALUE: 'b-score__current-criterion-value',
        HIDDEN: 'i-utils__hidden'
    };

    /**
     * Event enum
     * @enum {String}
     */
    Score.Event = {
        CLICK: 'b-score-click'
    };

    /**
     * Internal decorates the DOM element
     * @param {Node} element
     * @public
     */
    Score.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.tooltip_ = goog.dom.getElementByClass(
            Score.CssClass.TOOLTIP,
            element
        );

        this.criterionNameElement_ = goog.dom.getElementByClass(
            Score.CssClass.CURRENT_CRITERION_NAME,
            element
        );

        this.criterionValueElement_ = goog.dom.getElementByClass(
            Score.CssClass.CURRENT_CRITERION_VALUE,
            element
        );

        this.tooltipNameElements_ = goog.dom.getElementsByClass(
            Score.CssClass.TOOLTIP_NAME,
            element
        );
    };

    /**
     * Sets up the component
     */
    Score.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        if (this.isClickable_) {
            var handler = this.getHandler();

            if (goog.labs.userAgent.device.isDesktop()) {
                handler.listen(
                    this.getElement(),
                    goog.events.EventType.MOUSEENTER,
                    this.showCriterion_
                );

                handler.listen(
                    this.criterionValueElement_,
                    goog.events.EventType.MOUSELEAVE,
                    this.hideCriterion_
                );
            }

            handler.listen(
                this.criterionValueElement_,
                goog.events.EventType.CLICK,
                this.criterionClickHandler_
            );

            handler.listen(
                document,
                goog.events.EventType.CLICK,
                this.documentClickHandler_
            );
        }
    };

    /**
     * shows current criterion
     * @private
     */
    Score.prototype.showCriterion_ = function() {
        if (!this.tooltipShowed_) {
            goog.dom.classes.remove(
                this.criterionNameElement_,
                Score.CssClass.HIDDEN
            );
        }
    };

    /**
     * shows current criteria
     * @private
     */
    Score.prototype.hideCriterion_ = function() {
        if (!this.tooltipShowed_) {
            goog.dom.classes.add(
                this.criterionNameElement_,
                Score.CssClass.HIDDEN
            );
        }
    };

    /**
     * Handles a click over criteria value element
     * @param {Object} event
     * @private
     */
    Score.prototype.criterionClickHandler_ = function(event) {
        this.dispatchEvent({
            'type': Score.Event.CLICK
        });

        if (this.tooltipShowed_) {
            this.hideTooltip_();
        }
        else {
            this.showTooltip_();
        }
    };

    /**
     * Handles a click over a document
     * @param {Object} event
     * @private
     */
    Score.prototype.documentClickHandler_ = function(event) {
        var domHelper = this.getDomHelper(),

        /*check if click target in tooltip dom element*/
        inTooltipElement = domHelper.contains(
            this.tooltip_,
            event.target
        ),

        /*check if click target in criteria value dom element*/
        inCriterionElement = domHelper.contains(
            this.criterionValueElement_,
            event.target
        );

        if (!inTooltipElement && !inCriterionElement && this.tooltipShowed_) {
            this.hideTooltip_();
        }
    };

    /**
     * Hide tooltip
     * @private
     */
    Score.prototype.hideTooltip_ = function() {
        goog.dom.classes.add(
            this.tooltip_,
            Score.CssClass.HIDDEN
        );
        this.tooltipShowed_ = false;
        this.hideCriterion_();
    };

    /**
     * Shows tooltip
     * @private
     */
    Score.prototype.showTooltip_ = function() {
        goog.dom.classes.remove(
            this.tooltip_,
            Score.CssClass.HIDDEN
        );
        this.showCriterion_();
        this.tooltipShowed_ = true;
    };
});
