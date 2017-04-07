goog.provide('sm.bSmInputRange.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');


goog.scope(function() {



    /**
     * View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.bSmInputRange.View = function(opt_params, opt_type, opt_modifier) {
        sm.bSmInputRange.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);


        /**
         * @type {sm.bSmInputRange.View.Params}
         * @protected
         */
        this.params = null;
    };
    goog.inherits(sm.bSmInputRange.View, cl.iControl.View);
    var View = sm.bSmInputRange.View;


    /**
     * @typedef {{
     *     name: ?string,
     *     value: ?number,
     *     minValue: number,
     *     maxValue: number,
     *     defaultValue: number
     *     step: ?number
     * }}
     */
    sm.bSmInputRange.View.Params;


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    View.Event = {
        FIELD_CLICK: goog.events.getUniqueId('field-click')
    };


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-input-range',
        FIELD: 'b-sm-input-range__field',
        INPUT_WRAP: 'b-sm-input-range__input-wrap',
        PLACEHOLDER_VALUE: 'b-sm-input-range__placeholder-value'
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initPlaceholder_();

        this.initDomListeners_();
    };


    /**
     * Update placeholder value
     * @param {(number|string)} value
     * @public
     */
    View.prototype.updatePlaceholder = function(value) {
        var formattedValue = this.formatPlaceholderValue_(value);

        goog.dom.setTextContent(this.dom.placeholderValue, formattedValue);
    };


    /**
     * Show input and hide placeholder value
     * @publick
     */
    View.prototype.activateInput = function() {
        this.setPlaceholderVisibility_(false);
        this.setInputVisibility_(true);
    };


    /**
     * Placeholder value and hide input
     * @publick
     */
    View.prototype.activatePlaceholder = function() {
        this.setInputVisibility_(false);
        this.setPlaceholderVisibility_(true);
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
     * @return {sm.bSmInputRange.View.Params}
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
            this.dom.field,
            goog.events.EventType.CLICK,
            this.onFieldClick_
        );

        this.getHandler().listen(
            goog.dom.getDocument(),
            goog.events.EventType.CLICK,
            this.onDocumentClick_
        );
    };


    /**
     * Click handler on document
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onDocumentClick_ = function(event) {
        var isContaints = goog.dom.contains(
            this.dom.field,
            event.target
        );

        if (!isContaints) {
            this.activatePlaceholder();
        }
    };


    /**
     * Field click handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onFieldClick_ = function(event) {
        event.stopPropagation();

        this.activateInput();
        this.dispatchEvent(View.Event.FIELD_CLICK);
    };


    /**
     * Initializes field state - show input or palseholder value
     * @private
     */
    View.prototype.initPlaceholder_ = function() {
        var value = this.params.value || this.params.defaultValue ||
            this.params.minValue;

        this.updatePlaceholder(value);
        this.activatePlaceholder();
    };


    /**
     * Dom elements initialization
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom.field = this.getElementByClass(
            View.CssClass.FIELD
        );

        this.dom.inputWrap = this.getElementByClass(
            View.CssClass.INPUT_WRAP
        );

        this.dom.input = this.getElementByClass(
            sm.gInput.ViewStendhal.CssClass.ROOT
        );

        this.dom.placeholderValue = this.getElementByClass(
            View.CssClass.PLACEHOLDER_VALUE
        );

        this.dom.range = this.getElementByClass(
            sm.bSmRange.View.CssClass.ROOT
        );
    };


    /**
     * Adds or deletes class to placeholder value visibility
     * @param {boolean} visible
     * @private
     */
    View.prototype.setPlaceholderVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.placeholderValue,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.placeholderValue,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Adds or deletes class to input wrap visibility
     * @param {boolean} visible
     * @private
     */
    View.prototype.setInputVisibility_ = function(visible) {
        visible ?
            goog.dom.classlist.remove(
                this.dom.inputWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.inputWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Format value to text for placeholder
     * @param {(number|string)} value
     * @return {string}
     * @private
     */
    View.prototype.formatPlaceholderValue_ = function(value) {
        var stringValue = String(value),
            result = '';

        var countChar = 0,
            length = stringValue.length;

        for (var i = length; i > 0; i--, countChar++) {
            if (i && !(i % 3)) {
                result = result + ' ';
            }
            result = result + stringValue[countChar];
        }

        return result;
    };


    /**
     * Transform params to compressed ones
     * @param {sm.bSmInputRange.View.Params} rawParams
     * @return {sm.bSmInputRange.View.Params}
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
