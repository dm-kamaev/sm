/**
 * @fileoverview Brief type of score.
 * In this type of score secondary marks are hidden by hint.
 * Name of primary mark can be hidden too and show by hover over primary mark.
 * If this score not active - secondary mark name not shown (if hidden)
 * on hover and secondary marks not shown on click.
 *
 * There are two themes: bold and thick;
 */

goog.provide('sm.bSmScore.ViewBrief');

goog.require('goog.dom');
goog.require('goog.labs.userAgent.device');
goog.require('sm.bSmScore.View');



goog.scope(function() {
    /**
     * View for ScoreBrief block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.bSmScore.View}
     */
    sm.bSmScore.ViewBrief = function(opt_params, opt_type, opt_modifier) {
        sm.bSmScore.ViewBrief.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );


        /**
         * Defines clickable visible mark or not
         * @type {boolean}
         * @private
         */
        this.isActive_ = false;


        /**
         * Defines hidden or showed hint
         * @type {boolean}
         * @private
         */
        this.secondaryMarksVisibility_ = false;
    };
    goog.inherits(sm.bSmScore.ViewBrief, sm.bSmScore.View);
    var View = sm.bSmScore.ViewBrief;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-score_brief',
        HOVERABLE: 'b-sm-score_hoverable',
        ACTIVE_STATE: 'b-sm-score_active',
        SECONDARY_MARKS_VISIBLE: 'b-sm-score_secondary-marks-visible',
        SECONDARY_MARKS_HIDDEN: 'b-sm-score_secondary-marks-hidden'
    };


    /**
     * Event enum
     * @enum
     */
    View.Event = {
        PRIMARY_NAME_SHOW: 'primary_name_show',
        PRIMARY_NAME_HIDE: 'primary_name_hide'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initActiveState_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDocumentListeners_()
            .detectHoverability_()
            .initElementListeners_();
    };


    /**
     * Initializes listeners for document
     * @return {sm.bSmScore.ViewBrief}
     * @private
     */
    View.prototype.initDocumentListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getDocument(),
            goog.events.EventType.CLICK,
            this.documentClickHandler_
        ).listen(
            goog.dom.getDocument(),
            goog.events.EventType.TOUCHSTART,
            this.documentClickHandler_
        );

        return this;
    };


    /**
     * Handles a click over a document and if click occurs not in score element
     * or secondary marks element, set not visible secondary marks
     * @param {goog.events.EventTarget} event
     * @private
     */
    View.prototype.documentClickHandler_ = function(event) {
        var inElement = goog.dom.contains(
            this.getElement(),
            event.target
        );

        if (!inElement && this.secondaryMarksVisibility_) {
            this.setSecondaryMarksVisibility_(false);
            this.dispatchEventPrimaryNameVisibility_(false);
        }
    };


    /**
     * Initializes listeners for element
     * @return {sm.bSmScore.ViewBrief}
     * @private
     */
    View.prototype.initElementListeners_ = function() {
        if (this.isActive_) {
            this.getHandler().listen(
                this.getElement(),
                goog.events.EventType.CLICK,
                this.onClick_
            ).listen(
                this.getElement(),
                goog.events.EventType.TOUCHSTART,
                this.onClick_
            ).listen(
                this.getElement(),
                goog.events.EventType.MOUSEOVER,
                this.onMouseover_
            ).listen(
                this.getElement(),
                goog.events.EventType.MOUSEOUT,
                this.onMouseout_
            );
        }
        return this;
    };


    /**
     * Element Mouseover
     * @private
     */
    View.prototype.onMouseover_ = function() {
        this.dispatchEventPrimaryNameVisibility_(true);
    };


    /**
     * Element Mouseout
     * @private
     */
    View.prototype.onMouseout_ = function() {
        if (!this.secondaryMarksVisibility_) {
            this.dispatchEventPrimaryNameVisibility_(false);
        }
    };


    /**
     * Dispatch event show or hide primary name
     * @param {boolean} visibility
     * @private
     */
    View.prototype.dispatchEventPrimaryNameVisibility_ = function(visibility) {
        var type = visibility ?
            View.Event.PRIMARY_NAME_SHOW :
            View.Event.PRIMARY_NAME_HIDE;

        this.dispatchEvent({
            'type': type
        });
    };


    /**
     * Handles click over element
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
        event.preventDefault();

        this.toggleSecondaryMarksVisibility_();
        this.dispatchEventPrimaryNameVisibility_(true);
    };


    /**
     * Toggle visibility of secondary marks
     * @private
     */
    View.prototype.toggleSecondaryMarksVisibility_ = function() {
        var visibility = !this.secondaryMarksVisibility_;

        this.setSecondaryMarksVisibility_(visibility);
    };


    /**
     * Set visibility of secondary marks
     * @param {boolean} visibility
     * @private
     */
    View.prototype.setSecondaryMarksVisibility_ = function(visibility) {
        if (visibility) {
            goog.dom.classlist.add(
                this.getElement(),
                cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
            );

            goog.dom.classlist.swap(
                this.getElement(),
                View.CssClass.SECONDARY_MARKS_HIDDEN,
                View.CssClass.SECONDARY_MARKS_VISIBLE
            );
        } else {
            goog.dom.classlist.remove(
                this.getElement(),
                cl.gHint.View.CssClass.INCLUDE_CLICK_MODE
            );

            goog.dom.classlist.swap(
                this.getElement(),
                View.CssClass.SECONDARY_MARKS_VISIBLE,
                View.CssClass.SECONDARY_MARKS_HIDDEN
            );
        }

        this.secondaryMarksVisibility_ = visibility;
    };


    /**
     * Check hoverability for block and
     * if it hoverable, add to it corresponding modifier
     * @return {sm.bSmScore.ViewBrief}
     * @private
     */
    View.prototype.detectHoverability_ = function() {
        if (goog.labs.userAgent.device.isDesktop()) {
            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.HOVERABLE
            );
        }

        return this;
    };


    /**
     * Detect whether control active:
     * hidden score items can be showed
     * @return {sm.bSmScore.ViewBrief}
     * @private
     */
    View.prototype.initActiveState_ = function() {
        this.isActive_ = goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.ACTIVE_STATE
        );

        return this;
    };
});  // goog.scope
