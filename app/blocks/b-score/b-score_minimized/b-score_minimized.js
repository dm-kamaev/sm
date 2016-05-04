goog.provide('sm.bScore.ScoreMinimized');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.labs.userAgent.device');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bScore.Score');

/**
 * Score component in school list view
 * @param {object} opt_params
 * @constructor
 * @extends {sm.bScore.Score}
 */
sm.bScore.ScoreMinimized = function(opt_params) {
    goog.base(this);
    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     * @private
     * @type {Array.<Number>}
     */
    this.score_ = this.params_.score ? this.params_.score : [];

    /**
     * @private
     * @type {number}
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
     * @type {Element}
     */
    this.tooltip_ = null;

    /**
     * Dom element with name of current criteria of sort
     * @private
     * @type {Element}
     */
    this.criterionNameElement_ = null;

    /**
     * Dom element with mark of current criteria of sort
     * @private
     * @type {Element}
     */
    this.criterionValueElement_ = null;

    /**
     * Indicates is tooltip showed or not
     * @private
     * @type {boolean}
     */
    this.tooltipShowed_ = false;
};
goog.inherits(sm.bScore.ScoreMinimized, sm.bScore.Score);

goog.scope(function() {
    var ScoreMinimized = sm.bScore.ScoreMinimized;

    /**
     * Css class enum
     * @enum {String}
     */
    ScoreMinimized.CssClass = {
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
    ScoreMinimized.Event = {
        CLICK: 'b-score-click'
    };

    /**
     * Internal decorates the DOM element
     * @param {Node} element
     * @public
     */
    ScoreMinimized.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.tooltip_ = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.TOOLTIP,
            element
        );

        this.criterionNameElement_ = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.CURRENT_CRITERION_NAME,
            element
        );

        this.criterionValueElement_ = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.CURRENT_CRITERION_VALUE,
            element
        );
    };

    /**
     * Sets up the component
     */
    ScoreMinimized.prototype.enterDocument = function() {
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
    ScoreMinimized.prototype.showCriterion_ = function() {
        if (!this.tooltipShowed_) {
            goog.dom.classes.remove(
                this.criterionNameElement_,
                ScoreMinimized.CssClass.HIDDEN
            );
        }
    };

    /**
     * shows current criteria
     * @private
     */
    ScoreMinimized.prototype.hideCriterion_ = function() {
        if (!this.tooltipShowed_) {
            goog.dom.classes.add(
                this.criterionNameElement_,
                ScoreMinimized.CssClass.HIDDEN
            );
        }
    };

    /**
     * Handles a click over criteria value element
     * @param {Object} event
     * @private
     */
    ScoreMinimized.prototype.criterionClickHandler_ = function(event) {
        event.preventDefault();

        this.dispatchEvent({
            'type': ScoreMinimized.Event.CLICK
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
    ScoreMinimized.prototype.documentClickHandler_ = function(event) {
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
    ScoreMinimized.prototype.hideTooltip_ = function() {
        goog.dom.classes.add(
            this.tooltip_,
            ScoreMinimized.CssClass.HIDDEN
        );
        this.tooltipShowed_ = false;
        this.hideCriterion_();
    };

    /**
     * Shows tooltip
     * @private
     */
    ScoreMinimized.prototype.showTooltip_ = function() {
        goog.dom.classes.remove(
            this.tooltip_,
            ScoreMinimized.CssClass.HIDDEN
        );
        this.showCriterion_();
        this.tooltipShowed_ = true;
    };
});
