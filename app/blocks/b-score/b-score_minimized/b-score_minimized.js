goog.provide('sm.bScore.ScoreMinimized');

goog.require('cl.iUtils.Utils');
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
 * @param {Object=} opt_params
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
     * Defines clickable visible mark or not
     * @type {boolean}
     * @private
     */
    this.isActive_ = false;


    /**
     * Defines whether visible name of visible mark
     * @type {boolean}
     * @private
     */
    this.isNameVisible_ = false;


    /**
     * Collection of dom elements
     * @type {Object.<string, Element>}
     * @private
     */
    this.elements_ = {};


    /**
     * Indicates is tooltip showed or not
     * @private
     * @type {boolean}
     */
    this.isHiddenMarksShowed_ = false;
};
goog.inherits(sm.bScore.ScoreMinimized, sm.bScore.Score);

goog.scope(function() {
    var ScoreMinimized = sm.bScore.ScoreMinimized,
        Utils = cl.iUtils.Utils;


    /**
     * Css class enum
     * @enum {string}
     */
    ScoreMinimized.CssClass = {
        ROOT: 'b-score_minimized',
        HIDDEN_MARKS: 'b-score__hidden-marks',
        VISIBLE_MARK: 'b-score__visible_mark',
        MARK_NAME: 'b-score__mark-name',
        MARK_VALUE: 'b-score__mark-value',
        HOVERABLE: 'b-score_hoverable',
        ACTIVE_STATE: 'b-score_active'
    };


    /**
     * Event enum
     * @enum {string}
     */
    ScoreMinimized.Event = {
        CLICK: 'b-score-click'
    };


    /**
     * Internal decorates the DOM element
     * @param {Element} element
     * @public
     */
    ScoreMinimized.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.detectHoverability_();
        this.initDomElements_();
        this.initState_();
        this.initNameVisibility_();
    };


    /**
     * Sets up the component
     */
    ScoreMinimized.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        if (this.isActive_) {
            this.initVisibleMarkNameListeners_();
            this.initVisibleMarkValueListeners_();

            this.initDocumentListeners_();
        }
    };


    /**
     * Initializes listeners for document
     * @private
     */
    ScoreMinimized.prototype.initDocumentListeners_ = function() {
        this.getHandler().listen(
            document,
            goog.events.EventType.CLICK,
            this.documentClickHandler_
        );
    };


    /**
     * Check hoverability for block and
     * if it hoverable, add to it corresponding modifier
     * @private
     */
    ScoreMinimized.prototype.detectHoverability_ = function() {
        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classlist.add(
                this.getElement(),
                ScoreMinimized.CssClass.HOVERABLE
            );
        }
    };


    /**
     * Init dom elements
     * @private
     */
    ScoreMinimized.prototype.initDomElements_ = function() {
        var element = this.getElement();

        this.elements_.hiddenMarks = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.HIDDEN_MARKS,
            element
        );

        var visibleMark = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.VISIBLE_MARK,
            element
        );
        this.elements_.visibleMarkName = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.MARK_NAME,
            visibleMark
        );
        this.elements_.visibleMarkValue = goog.dom.getElementByClass(
            ScoreMinimized.CssClass.MARK_VALUE,
            visibleMark
        );
    };


    /**
     * Detect whether control active:
     * hidden score items can be showed
     * @private
     */
    ScoreMinimized.prototype.initState_ = function() {
        this.isActive_ = goog.dom.classlist.contains(
            this.getElement(),
            ScoreMinimized.CssClass.ACTIVE_STATE
        );
    };


    /**
     * Detect whether name of visible score mark is hidden
     * @private
     */
    ScoreMinimized.prototype.initNameVisibility_ = function() {
        this.isNameVisible_ = !goog.dom.classlist.contains(
            this.elements_.visibleMarkName,
            Utils.CssClass.HIDDEN
        );
    };


    /**
     * Initializes listeners for visible mark name
     * @private
     */
    ScoreMinimized.prototype.initVisibleMarkNameListeners_ = function() {
        if (this.elements_.visibleMarkName &&
            this.isNameVisible_
        ) {
            this.getHandler().listen(
                this.elements_.visibleMarkName,
                goog.events.EventType.CLICK,
                this.onVisibleMarkNameClick_
            );
        }
    };


    /**
     * Initializes listeners for visible mark value
     * @private
     */
    ScoreMinimized.prototype.initVisibleMarkValueListeners_ = function() {
        if (this.elements_.visibleMarkValue) {
            if (goog.labs.userAgent.device.isDesktop() &&
                !this.isNameVisible_) {
                this.getHandler().listen(
                    this.elements_.visibleMarkValue,
                    goog.events.EventType.MOUSEENTER,
                    this.onVisibleMarkMouseEnter_
                ).listen(
                    this.elements_.visibleMarkValue,
                    goog.events.EventType.MOUSELEAVE,
                    this.onVisibleMarkMouseLeave_
                );
            }

            this.getHandler().listen(
                this.elements_.visibleMarkValue,
                goog.events.EventType.CLICK,
                this.onVisibleMarkValueClick_
            );
        }
    };


    /**
     * Mouse enter to visible name event handler
     * @private
     */
    ScoreMinimized.prototype.onVisibleMarkMouseEnter_ = function() {
        if (!this.isHiddenMarksShowed_) {
            this.setNameVisibility_(true);
        }
    };


    /**
     * Mouse leave to visible name event handler
     * @private
     */
    ScoreMinimized.prototype.onVisibleMarkMouseLeave_ = function() {
        if (!this.isHiddenMarksShowed_) {
            this.setNameVisibility_(false);
        }
    };


    /**
     * Mouse click to visible mane handler
     * @private
     */
    ScoreMinimized.prototype.onVisibleMarkNameClick_ = function() {
        this.isHiddenMarksShowed_ ?
            this.setHiddenMarksVisibility_(false) :
            this.setHiddenMarksVisibility_(true);
    };


    /**
     * Hide or show name of visible score, if name not visible on init
     * @param {boolean} visibility
     * @private
     */
    ScoreMinimized.prototype.setNameVisibility_ = function(visibility) {
        if (!this.isNameVisible_) {
            visibility ?
                goog.dom.classes.remove(
                    this.elements_.visibleMarkName,
                    Utils.CssClass.HIDDEN
                ) :
                goog.dom.classes.add(
                    this.elements_.visibleMarkName,
                    Utils.CssClass.HIDDEN
                );
        }
    };


    /**
     * Handles a click over criteria value element
     * @param {Object} event
     * @private
     */
    ScoreMinimized.prototype.onVisibleMarkValueClick_ = function(event) {
        event.preventDefault();

        if (this.isHiddenMarksShowed_) {
            this.setHiddenMarksVisibility_(false);
            this.setNameVisibility_(false);
        }
        else {
            this.setHiddenMarksVisibility_(true);
            this.setNameVisibility_(true);
        }

        this.dispatchEvent({
            'type': ScoreMinimized.Event.CLICK
        });
    };


    /**
     * Handles a click over a document and if click occurs not in hidden marks
     * or in visible mark name, hide hidden marks
     * @param {Object} event
     * @private
     */
    ScoreMinimized.prototype.documentClickHandler_ = function(event) {
        var domHelper = this.getDomHelper(),

        /** check if click target in hidden marks dom element **/
        inTooltipElement = domHelper.contains(
            this.elements_.hiddenMarks,
            event.target
        ),

        /** check if click target in visible mark value dom element **/
        inVisibleMark = domHelper.contains(
            this.elements_.visibleMarkValue,
            event.target
        ) || domHelper.contains(
            this.elements_.visibleMarkName,
            event.target
        );

        if (!inTooltipElement &&
            !inVisibleMark &&
            this.isHiddenMarksShowed_) {
            this.setHiddenMarksVisibility_(false);
            this.setNameVisibility_(false);
        }
    };


    /**
     * Show and hide element with hidden marks
     * @param {boolean} visibility
     * @private
     */
    ScoreMinimized.prototype.setHiddenMarksVisibility_ = function(visibility) {
        visibility ?
            goog.dom.classes.remove(
                this.elements_.hiddenMarks,
                Utils.CssClass.HIDDEN
            ) :
            goog.dom.classes.add(
                this.elements_.hiddenMarks,
                Utils.CssClass.HIDDEN
            );
        this.isHiddenMarksShowed_ = visibility;
    };
});  // goog.scope
