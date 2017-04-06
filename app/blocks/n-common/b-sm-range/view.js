goog.provide('sm.bSmRange.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.style');


goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmRange.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmRange.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);


        /**
         * @type {sm.bSmRange.View.Params}
         * @protected
         */
        this.params = null;


        /**
         * Mouse position x on thumb - in moment click on thumb
         * @type {?number}
         * @private
         */
        this.mouseOffsetXOnThumb_ = null;
    };
    goog.inherits(sm.bSmRange.View, cl.iControl.View);
    var View = sm.bSmRange.View;


    /**
     * @typedef {{
     *     name: (string|undefined),
     *     value: (string|number),
     *     minValue: number,
     *     maxValue: number,
     *     defaultValue: number,
     *     step: ?number
     * }}
     */
    sm.bSmRange.View.Params;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-range',
        THUMB: 'b-sm-range__thumb',
        PROGRESS_BAR: 'b-sm-range__bar-progress'
    };



    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CHANGE: goog.events.getUniqueId('change')
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDomListeners_();
    };


    /**
     * Get value
     * @return {number}
     * @public
     */
    View.prototype.getValue = function() {
        var progressPosition = goog.style.getSize(this.dom.progressBar).width;

        return this.calculateValueFromPosition_(progressPosition);
    };


    /**
     * Set value
     * @param {number} value
     * @public
     */
    View.prototype.setValue = function(value) {
        var progressPosition = this.calculatePositionFromValue_(value);

        this.update_(progressPosition);
    };


    /**
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * Return data-params from dom element
     * @return {sm.bSmRange.View.Params}
     * @override
     * @protected
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');

        this.params = rawParams ? this.transformParams_(rawParams) : null;
        return this.params;
    };


    /**
     * Initializes listeners for dom element
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        this.getHandler().listen(
            this.dom.thumb,
            [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART],
            this.onThumbMouseDown_
        );

        this.getHandler().listen(
            this.dom.thumb,
            goog.events.EventType.ONDRAGSTART,
            this.onThumbDrangStart_
        );

        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClick_
        );
    };


    /**
     * Range click handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
        var progressPosition = this.getProgressPosition_(event);

        this.update_(progressPosition);

        this.dispatchEvent(View.Event.CHANGE);
    };


    /**
     * Thumb mouse down handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onThumbMouseDown_ = function(event) {
        this.setMouseOffsetXOnThumb_(event);
        this.setMoveListeners_();
    };


    /**
     * Set mouse offset x on thumb
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.setMouseOffsetXOnThumb_ = function(event) {
        var thumbBounds = goog.style.getBounds(this.dom.thumb),
            mouseOffsetXOnPage = event.clientX + document.body.scrollLeft;

        this.mouseOffsetXOnThumb_ = mouseOffsetXOnPage - thumbBounds.left;
    };


    /**
     * Thumb move handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onThumbMove_ = function(event) {
        var progressPosition = this.getProgressPosition_(event);

        this.update_(progressPosition, this.mouseOffsetXOnThumb_);
    };



    /**
     * Get progress position from event
     * @param {goog.events.Event} event
     * @return {number}
     * @private
     */
    View.prototype.getProgressPosition_ = function(event) {
        var rangeBounds = goog.style.getBounds(this.getElement()),
            mouseOffsetXOnPage = event.clientX + document.body.scrollLeft;

        return mouseOffsetXOnPage - rangeBounds.left;
    };


    /**
     * Update range - set thumb and progress bar
     * @param {number} progressPosition
     * @param {number=} opt_mouseOffsetXOnThumb
     * @private
     */
    View.prototype.update_ = function(progressPosition, opt_mouseOffsetXOnThumb
    ) {
        var positions = this.getElementsPosition_(
            progressPosition,
            opt_mouseOffsetXOnThumb
        );

        this.dom.thumb.style.left = positions.thumbLeft + 'px';
        this.dom.progressBar.style.width = positions.progressBar + 'px';
    };


    /**
     * Trumb up handler
     * @private
     */
    View.prototype.onThumbUp_ = function() {
        this.unsetMoveListeners_();

        this.dispatchEvent(View.Event.CHANGE);
    };


    /**
     * Thumb drang start handler
     * brouser event disable to not conflict with mousemove event
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onThumbDrangStart_ = function(event) {
        event.preventDefault();
    };


    /**
     * Document mouse down handler
     * it disable to not conflict with mousemove event
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onDocumentMouseDown_ = function(event) {
        event.preventDefault();
    };


    /**
     * Set listeners for move Thumb
     * @private
     */
    View.prototype.setMoveListeners_ = function() {
        this.getHandler().listen(
            goog.dom.getDocument(),
            [goog.events.EventType.MOUSEMOVE, goog.events.EventType.TOUCHMOVE],
            this.onThumbMove_
        );

        this.getHandler().listen(
            goog.dom.getDocument(),
            [goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHEND],
            this.onThumbUp_
        );

        this.getHandler().listen(
            goog.dom.getDocument(),
            [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART],
            this.onDocumentMouseDown_
        );
    };


    /**
     * Unset listeners for move Thumb
     * @private
     */
    View.prototype.unsetMoveListeners_ = function() {
        this.getHandler().unlisten(
            goog.dom.getDocument(),
            [goog.events.EventType.MOUSEMOVE, goog.events.EventType.TOUCHMOVE],
            this.onThumbMove_
        );

        this.getHandler().unlisten(
            goog.dom.getDocument(),
            [goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHEND],
            this.onThumbUp_
        );

        this.getHandler().unlisten(
            goog.dom.getDocument(),
            [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART],
            this.onDocumentMouseDown_
        );
    };


     /**
     * Get elements position
     * @param {number} progressPosition
     * @param {number=} opt_mouseOffsetXOnThumb
     * @return {{
     *     thumbLeft: number,
     *     progressBar: number
     * }}
     * @private
     */
    View.prototype.getElementsPosition_ = function(progressPosition,
        opt_mouseOffsetXOnThumb) {

        var rangeWidth = goog.style.getSize(this.getElement()).width,
            thumbWidth = goog.style.getSize(this.dom.thumb).width;

        var mouseOffsetXOnThumb = opt_mouseOffsetXOnThumb || (thumbWidth / 2);

        var thumbLeftPosition = progressPosition - mouseOffsetXOnThumb,
            rightEdge = rangeWidth - thumbWidth;

        return {
            thumbLeft: this.normalizePosition_(thumbLeftPosition, rightEdge),
            progressBar: this.normalizePosition_(progressPosition, rangeWidth)
        };
    };


    /**
     * Normalize position in range
     * @param {number} position
     * @param {number} max
     * @param {number=} opt_min
     * @return {number}
     * @private
     */
    View.prototype.normalizePosition_ = function(position, max, opt_min) {
        var min = opt_min || 0,
            value = position;

        if (value < min) {
            value = min;
        } else if(value > max) {
            value = max;
        }

        return value;
    };


    /**
     * Calculate position from value
     * @param {number} value
     * @return {number}
     * @private
     */
    View.prototype.calculatePositionFromValue_ = function(value) {
        var position = 0,
            roundedValue = this.roundValue_(value - this.params.minValue);

        if (roundedValue > 0) {

            var length = this.params.maxValue - this.params.minValue,
                rangeWidth = goog.style.getSize(this.getElement()).width;

            var valueInPercent = (roundedValue * 100) / length;
            position = (rangeWidth * valueInPercent) / 100;
        }

        return position;
    };


    /**
     * Calculate value in range from position
     * @param {number} position
     * @return {number}
     * @private
     */
    View.prototype.calculateValueFromPosition_ = function(position) {
        var rangeWidth = goog.style.getSize(this.getElement()).width,
            length = this.params.maxValue - this.params.minValue;

        var valueInPercent = (position * 100) / rangeWidth;
        var value = (valueInPercent * length) / 100;

        return this.roundValue_(value + Number(this.params.minValue));
    };


    /**
     * Round up value to step
     * @param {number} value
     * @return {number}
     * @private
     */
    View.prototype.roundValue_ = function(value) {
        var step = this.params.step || 1;

        return Math.round(value / step) * step;
    };


    /**
     * Dom elements initialization
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.thumb = this.getElementByClass(
            View.CssClass.THUMB
        );

        this.dom.progressBar = this.getElementByClass(
            View.CssClass.PROGRESS_BAR
        );
    };


    /**
     * Transform params to compressed ones
     * @param {sm.bSmRange.View.Params} rawParams
     * @return {sm.bSmRange.View.Params}
     * @private
     */
    View.prototype.transformParams_ = function(rawParams) {
        var minValue = rawParams['minValue'] || 0;

        return {
            name: rawParams['name'],
            value: rawParams['value'],
            minValue: minValue,
            maxValue: rawParams['maxValue'],
            defaultValue: rawParams['defaultValue'] || minValue,
            step: rawParams['step']
        };
    };
});  // goog.scope
