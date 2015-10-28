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
     * @type{object}
     */
    this.markElements_ = {};

    /**
     * @private
     * @type{array.<object>}
     */
    this.marks_ = [];

    /**
     * @private
     * @type{array.<number>}
     */
    this.values_ = [];

    /**
     * @private
     * @type{number}
     */
    this.averageValue_;
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
        MARK: 'b-rating__mark'
    };

    /**
     * Template-based dom element creation.
     * @return {!Node}
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

        this.markElements_ = goog.dom.getElementsByClass(
            Rating.CssClass.MARK, element
        );

        this.initMarks_();

        this.initValues_();

        this.renderValues(this.values_,this.averageValue_);
    };

    /**
     * Sets up the Component.
     */
    Rating.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
     * render marks values
     * @param {array.<number>=} opt_values values of marks
     * @param {number=} opt_averageValue
     * @public
     */
    Rating.prototype.renderValues = function(opt_values, opt_averageValue) {
        if (opt_values) {
            this.setValues_(opt_values);
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
     * @inheritDoc
     */
    Rating.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };

    /**
     * Delete label component and dom elements
     */
    Rating.prototype.dispose = function() {
        goog.base(this, 'dispose');

        this.exitDocument.bind(this);
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
     * init marks elements
     * @private
     */
    Rating.prototype.initMarks_ = function() {
        for(index in this.markElements_) {
            if(index !== 'length' && index !== 'item'){
                this.marks_.push(this.markElements_[index]);
            }
        }

        this.averageMark_ = this.marks_.splice(0,1)[0];
    };

    /**
     * init marks values
     * @private
     */
    Rating.prototype.initValues_ = function() {
        var values = [];
        var func =this.stringToValue_;

        if(this.params_.values) {
            values = this.params_.values;
        } else {
            this.marks_.forEach(function(mark) {
               values.push(func(mark.innerHTML))
            });
        }

        this.values_ = values;

        this.averageValue_ = this.params_.averageValue || this.stringToValue_(this.averageMark_.innerHTML);
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
    Rating.prototype.setValue_ = function(index, value) {
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
    Rating.prototype.setValues_ = function(values) {
        var isChanged = false;

        for(var i = 0; i < values.length; i++) {
            if (this.setValue_(i, values[i])) {
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
