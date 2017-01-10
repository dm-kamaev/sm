/**
 * @fileoverview View for phone input
 *
 * It differs from default input view by processing keypress event.
 */
goog.provide('sm.gInput.ViewPhone');


goog.require('sm.gInput.Event.KeypressEvent');
goog.require('sm.gInput.Event.PasteEvent');
goog.require('sm.gInput.ViewStendhal');


goog.scope(function() {
    var KeypressEvent = sm.gInput.Event.KeypressEvent;
    var PasteEvent = sm.gInput.Event.PasteEvent;



    /**
     * View for Phone input block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {sm.gInput.ViewStendhal}
     */
    sm.gInput.ViewPhone = function(opt_params, opt_type, opt_modifier) {
        sm.gInput.ViewPhone.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.gInput.ViewPhone, sm.gInput.ViewStendhal);
    var View = sm.gInput.ViewPhone;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'g-input_phone'
    };


    /**
     * Text clipboard data format handling paste event
     * @const {string}
     */
    View.TEXT_CLIPBOARD_DATA_FORMAT = 'Text';


    /**
     * Possible events
     * @enum {string}
     * @const
     */
    View.Event = {
        INPUT: sm.gInput.ViewStendhal.Event.INPUT,
        FOCUS: sm.gInput.ViewStendhal.Event.FOCUS,
        PASTE: PasteEvent.Type,
        DELETE_PRESS: goog.events.getUniqueId('deletePress'),
        BACKSPACE_PRESS: goog.events.getUniqueId('backspacePress'),
        CLICK: goog.events.getUniqueId('click'),
        KEYPRESS: KeypressEvent.Type
    };


    /**
     * Symbols with this key code and less are special symbols
     * @type {number}
     * @const
     */
    View.SPECIAL_SYBOL_CODE = 31;


    /**
     * @protected
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.getHandler()
            .listen(
                this.dom.input,
                goog.events.EventType.KEYDOWN,
                this.onKeydown_
            ).listen(
                this.dom.input,
                goog.events.EventType.CLICK,
                this.onClick_
            ).listen(
                this.dom.input,
                goog.events.EventType.PASTE,
                this.onPaste_
            );
    };


    /**
     * Return current cursor position
     * @return {number}
     * @public
     */
    View.prototype.getCursorStartPositon = function() {
        return this.dom.input.selectionStart;
    };


    /**
     * Return selection end position
     * @return {number}
     * @public
     */
    View.prototype.getCursorEndPosition = function() {
        return this.dom.input.selectionEnd;
    };


    /**
     * Set cursor to given position
     * @param {number} position
     * @public
     */
    View.prototype.setCursorPosition = function(position) {
        if (position >= 0) {
            this.dom.input.setSelectionRange(position, position);
        }
    };


    /**
     * Focus event handler
     * @param {goog.events.BrowserEvent} event
     * @protected
     * @override
     */
    View.prototype.onFocus = function(event) {
        event.preventDefault();
        View.base(this, 'onFocus');
    };


    /**
     * Keypress event handler
     * Make preventDefault to disable adding entered char to input
     * @param {goog.events.BrowserEvent} event
     * @protected
     * @override
     */
    View.prototype.onKeyPress = function(event) {
        View.base(this, 'onKeyPress', event);
        var char = this.getChar_(event);
        var keyPressEvent = new KeypressEvent(char, this);

        this.dispatchEvent(keyPressEvent);
        event.preventDefault();
    };


    /**
     * Keydown event handler
     * Make preventDefault to disable deleting data in input
     * @param {goog.events.BrowserEvent} event
     * @private
     */
    View.prototype.onKeydown_ = function(event) {
        if (event.keyCode == goog.events.KeyCodes.DELETE) {
            this.dispatchEvent(View.Event.DELETE_PRESS);
            event.preventDefault();
        } else if (event.keyCode == goog.events.KeyCodes.BACKSPACE) {
            this.dispatchEvent(View.Event.BACKSPACE_PRESS);
            event.preventDefault();
        }
    };


    /**
     * Input click event handler
     * @param {goog.events.BrowserEvent} event
     * @private
     */
    View.prototype.onClick_ = function(event) {
        event.preventDefault();
        this.dispatchEvent(View.Event.CLICK);
    };


    /**
     * Paste event handler
     * @param  {goog.events.BrowserEvent} event
     * @private
     */
    View.prototype.onPaste_ = function(event) {
        var clipboardData = event
            .getBrowserEvent()
            .clipboardData
            .getData(View.TEXT_CLIPBOARD_DATA_FORMAT);

        var pasteEvent = new PasteEvent(clipboardData, this);
        this.dispatchEvent(pasteEvent);
    };


    /**
     * Transform keycode of pressed key to char
     * @param {goog.events.BrowserEvent} event
     * @return {?string}
     * @private
     */
    View.prototype.getChar_ = function(event) {
        var result = null,
            browserEvent = event.getBrowserEvent(),
            keyCode = browserEvent.keyCode || browserEvent.which;

        if (keyCode > View.SPECIAL_SYBOL_CODE) {
            result = String.fromCharCode(event.charCode);
        }

        return result;
    };
});  // goog.scope
