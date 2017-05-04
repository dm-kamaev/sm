goog.provide('sm.bSmCheckbox.View');

goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Checkbox View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmCheckbox.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmCheckbox.View.base(this, 'constructor', opt_params, opt_type,
        opt_modifier);

    /**
     * @type {sm.bSmCheckbox.View.Params}
     * @override
     **/
    this.params = opt_params || {};
};
goog.inherits(sm.bSmCheckbox.View, cl.iControl.View);

goog.scope(function() {
    var View = sm.bSmCheckbox.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-checkbox',
        INPUT: 'b-sm-checkbox__input',
        LABEL: 'b-sm-checkbox__label'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        INPUT_CLICK: goog.events.getUniqueId('input-click')
    };


    /**
     * @typedef {{
     *     name: ?string,
     *     label: string,
     *     value: string,
     *     isChecked: (boolean|undefined)
     * }}
     */
    sm.bSmCheckbox.View.Params;


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
     */
    View.prototype.check = function() {
        this.dom.input.checked = true;
        if (!goog.dom.classlist.contains(
            this.getElement(),
            'b-sm-checkbox_checked'
        )) {
            this.changeState_();
        }
    };


    /**
     * Set input checked false
     */
    View.prototype.uncheck = function() {
        this.dom.input.checked = false;
        if (goog.dom.classlist.contains(
            this.getElement(),
            'b-sm-checkbox_checked'
        )) {
            this.changeState_();
        }
    };


    /**
     * Check marked input
     * @return {boolean}
     */
    View.prototype.isChecked = function() {
        return this.dom.input.checked;
    };


    /**
     * Initializes listeners for dom elements
     * @private
     */
    View.prototype.initDomListeners_ = function() {
        var handler = this.getHandler();

        handler.listen(
            this.dom.input,
            goog.events.EventType.CLICK,
            this.onInputClick_
        );
    };


    /**
     * Input handler
     * @param {Event} event
     * @private
     */
    View.prototype.onInputClick_ = function(event) {
        this.changeState_();

        this.dispatchEvent({
            'type': View.Event.INPUT_CLICK
        });
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


    /**
     * Change css class
     * @private
     */
    View.prototype.changeState_ = function() {
        goog.dom.classlist.toggle(
            this.getElement(),
            'b-sm-checkbox_checked'
        );
    };
});  // goog.scope
