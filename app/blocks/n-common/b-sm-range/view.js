goog.provide('sm.bSmRange.View');

goog.require('cl.iControl.View');
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
        this.mousePositionXOnThumb_ = null;
    };
    goog.inherits(sm.bSmRange.View, cl.iControl.View);
    var View = sm.bSmRange.View;


    /**
     * @typedef {{
     *     id: (string|undefined),
     *     name: (string|undefined),
     *     label: ?string,
     *     value: string,
     *     minValue: number,
     *     maxValue: number,
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
        CLICK: goog.events.getUniqueId('click')
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
        return this.getValueInRange_();
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
        var eventData = this.getDataOnChange_(event);

        this.mousePositionXOnThumb_ = eventData.thumbBounds.width / 2;

        this.update_(eventData);
    };


    /**
     * Thumb mouse down handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onThumbMouseDown_ = function(event) {
        var eventData = this.getDataOnChange_(event);

        this.mousePositionXOnThumb_ =
            eventData.mouseOffsetXOnPage - eventData.thumbBounds.left;

        this.setMoveListeners_();
    };


    /**
     * Thumb move handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onThumbMove_ = function(event) {
        var eventData = this.getDataOnChange_(event);

        this.update_(eventData);
    };


    /**
     * Get event data on change
     * @param {goog.events.Event} event
     * @return {{
     *     mouseOffsetXOnPage: number,
     *     thumbBounds: {
     *         left: number,
     *         top: number,
     *         width: number,
     *         height: number
     *     },
     *     rangeBounds: {
     *         left: number,
     *         top: number,
     *         width: number,
     *         height: number
     *     }
     * }}
     * @private
     */
    View.prototype.getDataOnChange_ = function(event) {
        return {
            mouseOffsetXOnPage: event.clientX + document.body.scrollLeft,
            thumbBounds: goog.style.getBounds(this.dom.thumb),
            rangeBounds: goog.style.getBounds(this.getElement())
        };
    };


    /**
     * Trumb up handler
     * @private
     */
    View.prototype.onThumbUp_ = function() {
        this.unsetMoveListeners_();
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
     * Update range - set thumb and progress bar
     * @param {{
     *     mouseOffsetXOnPage: number,
     *     thumbBounds: {
     *         left: number,
     *         top: number,
     *         width: number,
     *         height: number
     *     },
     *     rangeBounds: {
     *         left: number,
     *         top: number,
     *         width: number,
     *         height: number
     *     }
     * }} data
     * @private
     */
    View.prototype.update_ = function(data) {
        var positions = this.getProgressPositions_(data);

        this.dom.thumb.style.left = positions.thumbLeft + 'px';
        this.dom.progressBar.style.width = positions.progressBar + 'px';
    };


    /**
     * Set listeners for move Thumb
     * @private
     */
    View.prototype.setMoveListeners_ = function() {
        this.getHandler().listen(
            document,
            [goog.events.EventType.MOUSEMOVE, goog.events.EventType.TOUCHMOVE],
            this.onThumbMove_
        );

        this.getHandler().listen(
            document,
            [goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHEND],
            this.onThumbUp_
        );

        this.getHandler().listen(
            document,
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
            document,
            [goog.events.EventType.MOUSEMOVE, goog.events.EventType.TOUCHMOVE],
            this.onThumbMove_
        );

        this.getHandler().unlisten(
            document,
            [goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHEND],
            this.onThumbUp_
        );

        this.getHandler().unlisten(
            document,
            [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART],
            this.onDocumentMouseDown_
        );
    };


    /**
     * Get progress positions
     * @param {{
     *     mouseOffsetXOnPage: number,
     *     thumbBounds: {
     *         left: number,
     *         top: number,
     *         width: number,
     *         height: number
     *     },
     *     rangeBounds: {
     *         left: number,
     *         top: number,
     *         width: number,
     *         height: number
     *     }
     * }} data
     * objects params left, top was given relative to page
     * @return {{
     *     thumbLeft: number,
     *     progressBar: number
     * }}
     * @private
     */
    View.prototype.getProgressPositions_ = function(data) {
        var progressPosition = data.mouseOffsetXOnPage - data.rangeBounds.left;

        var thumbLeftPosition = progressPosition - this.mousePositionXOnThumb_,
            rightEdge = data.rangeBounds.width - data.thumbBounds.width;

        return {
            thumbLeft: this.normalizePosition_(thumbLeftPosition, rightEdge),
            progressBar: this.normalizePosition_(
                progressPosition,
                data.rangeBounds.width
            )
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
     * Get value in range
     * @return {number}
     * @private
     */
    View.prototype.getValueInRange_ = function() {
        var step = this.params.step || 1,
            valueInPercent = this.getValueInPercent_();

        var value = (valueInPercent *
            (this.params.maxValue - this.params.minValue)) / 100;

        var roundedValue = Math.round(value / step) * step;

        return roundedValue + Number(this.params.minValue);
    };


    /**
     * Get value in Percent
     * @return {number}
     * @private
     */
    View.prototype.getValueInPercent_ = function() {
        var range = this.getElement();

        var rangeWidth = goog.style.getBounds(range).width,
            progressPosition = goog.style.getSize(this.dom.progressBar).width;

        return (progressPosition * 100) / rangeWidth;
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
        return {
            id: rawParams['id'],
            name: rawParams['name'],
            label: rawParams['label'],
            value: rawParams['value'],
            minValue: rawParams['minValue'],
            maxValue: rawParams['maxValue'],
            step: rawParams['step']
        };
    };
});  // goog.scope
