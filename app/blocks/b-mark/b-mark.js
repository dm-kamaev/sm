goog.provide('sm.bMark.bMark');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.soy');
goog.require('goog.ui.Component');

/**
 * Mark component
 * @param {Object} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bMark.bMark = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     * Value
     * @type {Number}
     * @private
     */
    this.value_ = this.params_.value;

    /**
     * Color modifier
     * @type {String}
     * @private
     */
    this.colorModifier_ = null;

    /**
     * Dom element with value
     * @type {Node}
     * @private
     */
    this.valueElement_ = null;

    /**
     * Dom element with colored circle
     * @type {Node}
     * @private
     */
    this.circleElement_ = null;
};
goog.inherits(sm.bMark.bMark, goog.ui.Component);

goog.scope(function() {
    var Mark = sm.bMark.bMark;

    /**
     * Css class enum
     * @enum {String}
     */
    Mark.CssClass = {
        ROOT: 'b-mark',
        VALUE: 'b-mark__mark',
        CIRCLE: 'b-mark__circle',
        MODIFIER_RED: 'b-mark_red',
        MODIFIER_YELLOW: 'b-mark_yellow',
        MODIFIER_GREEN: 'b-mark_green',
        MODIFIER_GRAY: 'b-mark_gray',
        MODIFIER_EMPTY: 'b-mark_empty'
    };

    /**
     * Get value
     * @return {Number}
     * @public
     */
    Mark.prototype.getValue = function() {
        return this.value_;
    };

    /**
     * Set value
     * @param {Number} value
     * @public
     */
    Mark.prototype.setValue = function(value) {
        var modifier;
        this.value_ = value;

        if (value >= 4) {
            modifier = Mark.CssClass.MODIFIER_GREEN;
        }
        else if (value >= 3) {
            modifier = Mark.CssClass.MODIFIER_YELLOW;
        }
        else if (value > 0) {
            modifier = Mark.CssClass.MODIFIER_RED;
        }
        else {
            modifier = Mark.CssClass.MODIFIER_GRAY;
        }
        this.changeModifier_(modifier);

        (value === 0) ?
            this.changeModifier_(Mark.CssClass.MODIFIER_EMPTY, 'add') :
            this.changeModifier_(Mark.CssClass.MODIFIER_EMPTY, 'remove');

        this.valueElement_.innerHTML = this.formatValue_(this.value_);
    };

    /**
     * Internal decorates the DOM element
     * @param {Node} element
     */
    Mark.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.valueElement_ = goog.dom.getElementByClass(
            Mark.CssClass.VALUE,
            element
        );

        this.circleElement_ = goog.dom.getElementByClass(
            Mark.CssClass.CIRCLE,
            element
        );

        this.colorModifier_ = this.getColorModifier_(element);

        this.value_ = this.valueElement_.innerHTML;
    };

    /**
     * Returns color modifier
     * @param {Node} element
     * @return {String}
     * @private
     */
    Mark.prototype.getColorModifier_ = function(element) {
        var mod;

        if (goog.dom.classlist.contains(element, Mark.CssClass.MODIFIER_RED)) {
            mod = Mark.CssClass.MODIFIER_RED;
        }

        if (
            goog.dom.classlist.contains(element, Mark.CssClass.MODIFIER_GREEN)
        ) {
            mod = Mark.CssClass.MODIFIER_GREEN;
        }

        if (
            goog.dom.classlist.contains(element, Mark.CssClass.MODIFIER_YELLOW)
        ) {
            mod = Mark.CssClass.MODIFIER_YELLOW;
        }

        return mod;
    };

    /**
     * Changes, adds or removes modifier of block
     * @param {String} modifier
     * @param {String} opt_action
     * @private
     */
    Mark.prototype.changeModifier_ = function(modifier, opt_action) {
        var element = this.getElement();

        switch (opt_action) {
            case 'add':
                goog.dom.classlist.add(
                    element,
                    modifier
                );
                break;
            case 'remove':
                goog.dom.classlist.remove(
                    element,
                    modifier
                );
                break;
            default:
            goog.dom.classlist.addRemove(
                element,
                this.colorModifier_,
                modifier
            );
            this.colorModifier_ = modifier;
        }
    };

    /**
     * @param {Number} value
     * @return {String}
     * @private
     */
    Mark.prototype.formatValue_ = function(value) {
        var res = '';

        if (value > 0) {
            res = value.toFixed(1);
            res = res.replace('.', ',');
        }
        else {
            res = '—';
        }

        return res;
    };

});
