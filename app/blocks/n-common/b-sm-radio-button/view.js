goog.provide('sm.bSmRadioButton.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Radio Button View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmRadioButton.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmRadioButton.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);

    /**
     * @type {sm.bSmRadioButton.View.Params}
     * @override
     **/
    this.params = opt_params || {};


    /**
     * Determines previous radio button state is checked or not
     * @type {boolean}
     * @private
     **/
    this.isPreviousChecked_ = false;
};
goog.inherits(sm.bSmRadioButton.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSmRadioButton.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-radio-button',
        STATUS_ACTIVE: 'b-sm-radio-button_active',
        STATUS_INACTIVE: 'b-sm-radio-button_inactive',
        UNCHECKABLE: 'b-sm-radio-button_uncheckable',
        INPUT: 'b-sm-radio-button__input',
        LABEL: 'b-sm-radio-button__label'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        INPUT_CLICK: goog.events.getUniqueId('input-click')
    };


    /**
     * Status enum
     * @enum {string}
     */
    View.Status = {
        DEFAULT: 'default',
        ACTIVE: 'active',
        INACTIVE: 'inactive'
    };


    /**
     * @typedef {{
     *     name: string,
     *     label: string,
     *     value: string,
     *     isChecked: (boolean|undefined)
     * }}
     */
    sm.bSmRadioButton.View.Params;


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_(element);
        this.initParams_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDomListeners_();
    };


    /**
     * Set input checked true
     * @public
     */
    View.prototype.check = function() {
        this.dom.input.checked = true;
    };


    /**
     * Set input checked false
     * @public
     */
    View.prototype.uncheck = function() {
        this.dom.input.checked = false;
    };


    /**
     * Check marked input
     * @return {boolean}
     * @public
     */
    View.prototype.isChecked = function() {
        return this.dom.input.checked;
    };


    /**
     * Set status
     * @param {string} status
     * @public
     */
    View.prototype.setStatus = function(status) {
        if (status == View.Status.DEFAULT) {
            goog.dom.classlist.removeAll(
                this.getElement(), [
                    View.CssClass.STATUS_ACTIVE,
                    View.CssClass.STATUS_INACTIVE
                ]
            );
        } else if (status == View.Status.ACTIVE) {
            goog.dom.classlist.addRemove(
                this.getElement(),
                View.CssClass.STATUS_INACTIVE,
                View.CssClass.STATUS_ACTIVE
            );
        } else if (status == View.Status.INACTIVE) {
            goog.dom.classlist.addRemove(
                this.getElement(),
                View.CssClass.STATUS_ACTIVE,
                View.CssClass.STATUS_INACTIVE
            );
        }
    };


    /**
     * Initializes listeners for dom elements
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.getElement(),
            goog.events.EventType.MOUSEDOWN,
            this.onMouseDown_
        );

        handler.listen(
            this.dom.input,
            goog.events.EventType.CLICK,
            this.onInputClick_
        );
    };


    /**
     * Element handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onMouseDown_ = function(event) {
        this.isPreviousChecked_ = this.isChecked();
    };


    /**
     * Input handler
     * @param {goog.events.Event} event
     * @private
     */
    View.prototype.onInputClick_ = function(event) {
        if (this.isPreviousChecked_ && this.isUncheckable_()) {
            this.uncheck();
        }

        this.dispatchEvent({
            'type': View.Event.INPUT_CLICK
        });
    };


    /**
     * Return true if on click it can become unselected or false
     * @return {boolean}
     * @private
     */
    View.prototype.isUncheckable_ = function() {
        return goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.UNCHECKABLE
        );
    };

    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            input: goog.dom.getElementByClass(
                View.CssClass.INPUT,
                element
            )
        };
    };


    /**
     * Initializes params
     * @private
     */
    View.prototype.initParams_ = function() {
        this.params = JSON.parse(
            this.getElement().getAttribute('data-params')
        );
    };
});  // goog.scope
