goog.provide('sm.lSchool.bRating.Rating');

goog.require('sm.lSchool.bRating.Template');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Rating component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bRating.Rating = function(opt_params) {
    goog.base(this);

    /**
     * @private
     * @type{object}
     */
    this.params_ = opt_params || {};

    /**
     * @private
     * @type{array.<element>}
     */
    this.marks_ = [];

    /**
     * @private
     * @type{?element}
     */
    this.averageMark_ = null;

    /**
     * @private
     * @type{array.<number>}
     */
    this.values_ = [];

    /**
     * @private
     * @type{number}
     */
    this.averageValue_ = 0;
};
goog.inherits(sm.lSchool.bRating.Rating, goog.ui.Component);

goog.scope(function() {
    var Rating = sm.lSchool.bRating.Rating;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Rating.CssClass = {
        ROOT: 'b-rating',
        ORDINARY_MARK: 'b-rating__mark_ordinary',
        AVERAGE_MARK: 'b-rating__mark_average'
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    Rating.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var el = goog.soy.renderAsElement(sm.lSchool.bRating.Template.base, {
            params: this.params_
        });

        this.decorateInternal(el);
    };

    /**
     * Internal decorates the DOM element
     * @param {Node} element
     */
    Rating.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.marks_ = goog.dom.getElementsByClass(
            Rating.CssClass.ORDINARY_MARK, element
        );

        this.averageMark_ = goog.dom.getElementByClass(
            Rating.CssClass.AVERAGE_MARK, element
        );

        this.initValues_();

        this.setValues(this.values_, this.averageValue_);
    };

    /**
     * Sets up the Component.
     */
    Rating.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
     * set and render marks values
     * @param {array.<number>=} opt_values values of marks
     * @param {number=} opt_averageValue
     * @public
     */
    Rating.prototype.setValues = function(opt_values, opt_averageValue) {
        if (opt_values) {
            this.changeValues_(opt_values);
        }

        for(var i = 0, value; i < this.values_.length; i++){
            value = this.values_[i];
            this.renderValue_(i, value);
        }

        this.averageValue_ = opt_averageValue || this.averageRatingEvaluate_();
        this.renderAverageValue_(this.averageValue_);
    };

    /**
     * get mark value
     * @param {number} index of value
     * @return {number}
     * @public
     */
    Rating.prototype.getValue = function(index) {
        return this.values_[index];
    };

    /**
     * Cleans up the Component.
     */
    Rating.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };

    /**
     * Delete label component and dom elements
     */
    Rating.prototype.dispose = function() {
        goog.base(this, 'dispose');
    };

    /**
     * evaluate average rating
     * @return {number}
     * @private
     */
    Rating.prototype.averageRatingEvaluate_ = function() {
        var averageRating = 0;

        for(var i = 0; i < this.values_.length; i++) {
            averageRating += this.values_[i];
        }
        averageRating /= this.values_.length;

        return averageRating;
    };

    /**
     * init marks values
     * @private
     */
    Rating.prototype.initValues_ = function() {
        var values = [];

        if(this.params_.values) {
            values = this.params_.values;
        } else {
            for(var i = 0; i < this.marks_.length; i++){
                values.push(this.stringToValue_(this.marks_[i].innerHTML));
            }
        }

        this.values_ = values;
        this.averageValue_ = this.params_.averageValue ||
            this.stringToValue_(this.averageMark_.innerHTML);
    };

    /**
     * render average mark value
     * @param {number} averageValue
     * @private
     */
    Rating.prototype.renderAverageValue_ = function(averageValue) {
        this.averageMark_.innerHTML = this.valueToString_(averageValue);
    };

    /**
     * render mark value
     * @param {number} index of mark value
     * @param {number} value of mark
     * @private
     */
    Rating.prototype.renderValue_ = function(index, value) {
        if (this.marks_[index]) {
            this.marks_[index].innerHTML = this.valueToString_(value);
        }
    };

    /**
     * sets mark value
     * @param {number} index of mark
     * @param {number} value of mark
     * @return {boolean} true if mark exists, false in other case
     * @private
     */
    Rating.prototype.changeValue_ = function(index, value) {
        var isChanged = (this.getValue(index) !== value);

        if (isChanged) {
            this.values_[index] = value;
        }

        return isChanged;
    };

    /**
     * sets mark values
     * @param {array.<number>} values of marks
     * @return {boolean} true if mark exists, false in other case
     * @private
     */
    Rating.prototype.changeValues_ = function(values) {
        var isChanged = false;

        for(var i = 0; i < values.length; i++) {
            if (this.changeValue_(i, values[i])) {
                isChanged = true;
            }
        }

        return isChanged;
    };

    /**
     * value to string cast
     * @param {string=} opt_strValue
     * @return {number}
     * @private
     */
    Rating.prototype.stringToValue_ = function(opt_strValue) {
        var value = 0;

        if (opt_strValue !== '—') {
            value = parseFloat(opt_strValue);
        }
        return value;
    };

    /**
     * value to string cast
     * @param {number=} opt_value
     * @return {string}
     * @private
     */
    Rating.prototype.valueToString_ = function(opt_value) {
        var strValue = '—';

        if (opt_value) {
            strValue = parseFloat(opt_value.toFixed(2));
        }

        return strValue;
    };
});
