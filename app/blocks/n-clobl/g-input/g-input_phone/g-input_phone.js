goog.provide('sm.gInput.InputPhone');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.object');
goog.require('sm.gInput.InputStendhal');
goog.require('sm.gInput.TemplatePhone');
goog.require('sm.gInput.ViewPhone');
goog.require('sm.iNewFactory.FactoryStendhal.INSTANCE');


goog.scope(function() {
    var View = sm.gInput.ViewPhone;



    /**
     * Phone input block
     * @param {cl.iControl.View} view
     * @param {goog.dom.DomHelper=} opt_domHelper
     * @constructor
     * @extends {sm.gInput.InputStendhal}
     */
    sm.gInput.InputPhone = function(view, opt_domHelper) {
        sm.gInput.InputPhone.base(
            this, 'constructor', view, opt_domHelper
        );


        this.setSupportedState(goog.ui.Component.State.ALL, false);


        /**
         * Current value
         * @type {Array<number>}
         * @private
         */
        this.numbers_ = [];


        /**
         * Init phone validation
         */
        this.validationTypeHandlers['phone'] = this.validatePhone_.bind(this);
    };
    goog.inherits(sm.gInput.InputPhone, sm.gInput.InputStendhal);
    var InputPhone = sm.gInput.InputPhone;

    /**
     * Name of this element in factory
     */
    InputPhone.NAME = sm.gInput.TemplatePhone.NAME();

    sm.iNewFactory.FactoryStendhal.INSTANCE.register(InputPhone.NAME, {
        control: InputPhone,
        view: View
    });

    /**
     * Phone prefix value
     * @const {string}
     */
    InputPhone.PHONE_PREFIX = '+7';


    /**
     * Phone number delimiter
     * @const {string}
     */
    InputPhone.NUMBER_DELIMITER = '-';


    /**
     * Symbol, which displayed on empty number
     * @const {string}
     */
    InputPhone.EMPTY_NUMBER_FILLER = '_';


    /**
     * Phone mask template
     * @const {string}
     */
    InputPhone.PHONE_MASK = '(xxx) xxx-xx-xx';


    /**
     * Amount numbers in phone
     * @const {number}
     */
    InputPhone.NUMBER_AMOUNT = 10;


    /**
     * Special symbols position on result value
     * Special symbols is: phone prefix, '-', ' '
     * @const {Array<number>}
     */
    InputPhone.SPECIAL_SYMBOLS_POSITION = [0, 1, 2, 3, 7, 8, 12, 15];


    /**
     * Type of removing number
     * @enum {string}
     */
    InputPhone.RemoveType = {
        DELETE: 'delete',
        BACKSPACE: 'backspace'
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    InputPhone.prototype.decorateInternal = function(element) {
        InputPhone.base(this, 'decorateInternal', element);

        this.initEmptyPhoneValue_();
    };


    /**
     * @protected
     * @override
     */
    InputPhone.prototype.enterDocument = function() {
        InputPhone.base(this, 'enterDocument');

        this.viewListen(
            View.Event.KEYPRESS,
            this.onKeypress_
        )
        .viewListen(
            View.Event.DELETE_PRESS,
            this.onDeletePress_
        )
        .viewListen(
            View.Event.BACKSPACE_PRESS,
            this.onBackspacePress_
        )
        .viewListen(
            View.Event.CLICK,
            this.onClick_
        )
        .viewListen(
            View.Event.PASTE,
            this.onPaste_
        );
    };


    /**
     * Clear input
     * @override
     */
    InputPhone.prototype.clear = function() {
        this.getView().setValue('');
        this.initEmptyPhoneValue_();
    };


    /**
     * @protected
     * @override
     */
    InputPhone.prototype.onBlur = function() {
        if (this.isEmptyValue_(this.getValue())) {
            this.setValue('');
        }

        InputPhone.base(this, 'onBlur');
    };


    /**
     * Keypress event handler
     * @param {sm.gInput.InputPhone.KeypressEvent} event
     * @private
     */
    InputPhone.prototype.onKeypress_ = function(event) {
        var char = event.getChar();

        if (!goog.isNull(char) && this.validateDigits_(char)) {
            this.insert_(char);
        }
    };


    /**
     * Delete press event handler
     * @private
     */
    InputPhone.prototype.onDeletePress_ = function() {
        this.remove_(InputPhone.RemoveType.DELETE);
    };


    /**
     * Backspace press event handler
     * @private
     */
    InputPhone.prototype.onBackspacePress_ = function() {
        this.remove_(InputPhone.RemoveType.BACKSPACE);
    };


    /**
     * Click event handler
     * @private
     */
    InputPhone.prototype.onClick_ = function() {
        if (this.isEmptyValue_(this.getValue())) {
            this.setFocused();

            this.updateValue_();
            this.increaseCursorPosition_(0);
        }
    };


    /**
     * Paste into input event handler
     * @param  {sm.gInput.Event.PasteEvent} event
     * @private
     */
    InputPhone.prototype.onPaste_ = function(event) {
        var pastedText = event.getText();

        var formattedText = this.formatPastedText_(pastedText);
        this.setNumbers_(formattedText);
        this.updateValue_();
    };


    /**
     * Build value from stored numbers_ and write it to input
     * @private
     */
    InputPhone.prototype.updateValue_ = function() {
        this.setValue(this.buildPhoneNumber_());
    };


    /**
     * Insert number into input value
     * @param {number} number
     * @private
     */
    InputPhone.prototype.insert_ = function(number) {
        var cursorPosition = this.getView().getCursorStartPositon();

        var numberIndex =
            this.calculateNumberIndex_(cursorPosition);
        this.insertNumberAt_(number, numberIndex);

        this.updateValue_();
        this.increaseCursorPosition_(cursorPosition);
    };


    /**
     * Remove number by given way
     * @param {sm.gInput.InputPhone.RemoveType} removeType
     * @private
     */
    InputPhone.prototype.remove_ = function(removeType) {
        var startPosition = this.getView().getCursorStartPositon();
        var endPosition = this.getView().getCursorEndPosition();
        var deleteOptions = this.generateDeleteOptions_({
            startPosition: startPosition,
            endPosition: endPosition,
            type: removeType
        });
        this.deleteNumbers_(deleteOptions);

        this.updateValue_();

        if (removeType == InputPhone.RemoveType.BACKSPACE) {
            this.decreaseCursorPosition_(startPosition);
        } else {
            this.getView().setCursorPosition(startPosition);
        }
    };


    /**
     * Generate positions of numbers which need to be deleted
     * @param {{
     *     startPosition: number,
     *     endPosition: number,
     *     type: sm.gInput.InputPhone.RemoveType
     * }} data
     * @return {{
     *     startIndex: number,
     *     amount: number
     * }}
     * @private
     */
    InputPhone.prototype.generateDeleteOptions_ = function(data) {
        var amount;
        var startNumberIndex = this.calculateNumberIndex_(
                data.startPosition
            );

        if (data.startPosition == data.endPosition) {
            // In case single selection
            if (data.type == InputPhone.RemoveType.BACKSPACE) {
                startNumberIndex--;
            }

            amount = 1;
        } else {
            //In case range selected
            var endNumberIndex = this.calculateNumberIndex_(
                data.endPosition
            );
            amount = endNumberIndex + 1 - startNumberIndex;
        }

        return {
            startIndex: startNumberIndex,
            amount: amount
        };
    };


    /**
     * Delete numbers on given positions array
     * @param {{
     *     startIndex: number,
     *     amount: number
     * }} options
     * @private
     */
    InputPhone.prototype.deleteNumbers_ = function(options) {
        goog.array.splice(this.numbers_, options.startIndex, options.amount);
        this.normalizeNumbersAmount_();
    };


    /**
     * Fill numbers_ array with null values to NUMBER_AMOUNT length
     * @private
     */
    InputPhone.prototype.normalizeNumbersAmount_ = function() {
        var numbersAmount = this.numbers_.length;
        for (var i = numbersAmount; i <= InputPhone.NUMBER_AMOUNT; i++) {
            this.numbers_.push(null);
        }
    };


    /**
     * Fill numbers_ with given numbers array
     * @param {Array<number>} numbers
     * @private
     */
    InputPhone.prototype.setNumbers_ = function(numbers) {
        if (numbers.length > InputPhone.NUMBER_AMOUNT) {
            goog.array.splice(numbers, 0, InputPhone.NUMBER_AMOUNT);
        }

        goog.array.forEach(numbers, this.insertNumberAt_, this);
    };


    /**
     * Set given number on given position
     * @param {number} number
     * @param {number} position
     * @private
     */
    InputPhone.prototype.insertNumberAt_ = function(number, position) {
        if (position < InputPhone.NUMBER_AMOUNT) {
            this.numbers_[position] = number;
        }
    };


    /**
     * Delete from pasted input all exept numbers.
     * Also delete first 8 and +7 too and transform filtered text to array
     * @param  {string} text
     * @return {Array<string>}
     * @private
     */
    InputPhone.prototype.formatPastedText_ = function(text) {
        var result = this.filterValue_(text);
        return goog.array.toArray(result);
    };


    /**
     * Calculate new position from current position by increasing it.
     * New position depends of position of special symbols in result value
     * @param {number} position
     * @private
     */
    InputPhone.prototype.increaseCursorPosition_ = function(position) {
        var specialSymbolsPosition = InputPhone.SPECIAL_SYMBOLS_POSITION;

        var newPosition = specialSymbolsPosition.reduce(
            function(previuosValue, currentValue) {
                return (previuosValue == currentValue) ?
                    previuosValue + 1 :
                    previuosValue;
            }, position + 1);

        this.getView().setCursorPosition(newPosition);
    };


    /**
     * Calculate new position from current position. New position depends of
     * position of special symbols in result value and decreases
     * @param {number} position
     * @private
     */
    InputPhone.prototype.decreaseCursorPosition_ = function(position) {
        var specialSymbolsPosition = InputPhone.SPECIAL_SYMBOLS_POSITION;

        var newPosition = goog.array.reduceRight(
            specialSymbolsPosition,
            function(previuosValue, currentValue) {
                return (previuosValue == currentValue) ?
                    previuosValue - 1 :
                    previuosValue;
            }, position - 1);

        this.getView().setCursorPosition(newPosition);
    };


    /**
     * Calculate number position related to cursor position
     * for add to numbers_ array
     * By decreasing number position for amount of special symbols in mask
     * before it
     * @param {number} cursorPosition
     * @return {number}
     * @private
     */
    InputPhone.prototype.calculateNumberIndex_ = function(cursorPosition) {
        var specialSymbolsAmount = goog.array.findIndexRight(
            InputPhone.SPECIAL_SYMBOLS_POSITION,
            function(symbolPosition) {
                return cursorPosition >= symbolPosition;
            }
        ) + 1;
        return cursorPosition < specialSymbolsAmount ?
            0 :
            cursorPosition - specialSymbolsAmount;
    };


    /**
     * Check that value in input is empty
     * @param {string} value
     * @return {boolean}
     * @private
     */
    InputPhone.prototype.isEmptyValue_ = function(value) {
        return !this.filterValue_(value);
    };


    /**
     * Format value
     * @param {string} value
     * @return {string}
     * @private
     */
    InputPhone.prototype.formatValue_ = function(value) {
        return InputPhone.PHONE_PREFIX + ' ' + this.buildPhoneNumber_(value);
    };


    /**
     * Build phone value in format (xxx) xxx-xx-xx, replacing empty numbers
     * by filler
     * @return {string}
     * @private
     */
    InputPhone.prototype.buildPhoneNumber_ = function() {
        var result = InputPhone.PHONE_PREFIX + ' ' + InputPhone.PHONE_MASK;

        //Replace numbers by their position in array
        goog.array.forEach(this.numbers_, function(number) {
            if (!goog.isNull(number)) {
                result = result.replace('x', number);
            } else {
                result = result.replace('x', InputPhone.EMPTY_NUMBER_FILLER);
            }
        }, this);

        return result;
    };


    /**
     * Validate phone input
     * @param {string} text
     * @return {boolean}
     * @private
     */
    InputPhone.prototype.validatePhone_ = function(text) {
        var filteredValue = this.filterValue_(text);

        return this.validateDigits_(filteredValue) &&
            filteredValue.length == InputPhone.NUMBER_AMOUNT;
    };


    /**
     * Filter given text from input, remove following sybols from value:
     * '+', '7', '(', ')', '_'
     * @param {string} text
     * @return {string}
     * @private
     */
    InputPhone.prototype.filterValue_ = function(text) {
        return text.replace(/^\+7|^8|[^\d]/ig, '');
    };


    /**
     * Init numbers with default values
     * @return {sm.gInput.InputPhone}
     * @private
     */
    InputPhone.prototype.initEmptyPhoneValue_ = function() {
        this.numbers_ = [];

        for (var i = 0; i < InputPhone.NUMBER_AMOUNT; i++) {
            this.numbers_.push(null);
        }

        return this;
    };
});  // goog.scope
