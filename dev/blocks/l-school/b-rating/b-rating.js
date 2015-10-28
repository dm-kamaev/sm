goog.provide('sm.lSchool.bRating.Rating');

goog.require('sm.lSchool.bRating.Template');
goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');

/**
 * Comment component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSchool.bRating.Rating = function(opt_params){
    goog.base(this);

    /**
     * @private
     * @type{object}
     */
    this.params_ = opt_params || {};
};

goog.inherits(sm.lSchool.bRating.Rating, goog.ui.Component);

goog.scope(function(){
    var Rating = sm.lSchool.bRating.Rating;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Rating.CssClass={
        ROOT: 'b-rating',
        MARK: 'b-rating__mark',
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
        this.marks_ = goog.dom.getElementsByClass(
            Rating.CssClass.MARK, element
        );

        this.averageRatingEvaluate_.bind(this)();
    };

    /**
     * Sets up the Component.
     */
    Rating.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
     * sets mark value
     * @param {number} index index of mark (from 1 to 4)
     * @param {number} value value of mark
     * @return {boolean} true if mark exists, false in other case
     * @public
     */
    Rating.prototype.setValue = function(index, value) {
        if(this.marks_[index] == undefined || index ==0) {
            return false;
        } else {
            this.marks_[index].innerHTML = this.zeroReplacer_(value);

            this.averageRatingEvaluate_.bind(this)();
            return true;
        }
    };

    /**
     * sets marks values
     * @param {array.<number>} values values of marks
     * @public
     */
    Rating.prototype.setValues = function(values) {
        for(var i = 0; i < values.length; i++){
            if(this.marks_[i+1] !== undefined){
                this.marks_[i+1].innerHTML = this.zeroReplacer_(values[i]);
            }
        }
        this.averageRatingEvaluate_.bind(this)();
    };

    /**
     * evaluate average rating
     * @private
     */
    Rating.prototype.averageRatingEvaluate_ = function() {
        var averageRating = 0;

        for(var i = 1; i < this.marks_.length; i++) {
            averageRating+= parseFloat(this.zeroReplacer_(this.marks_[i].innerHTML));
        }
        averageRating/= (this.marks_.length-1);

        this.marks_[0].innerHTML = this.zeroReplacer_(parseFloat(averageRating.toFixed(2)));
    };

    /**
     * Replace 0 by -- and backward or return string with no changes
     * @param {string} string
     * @return {string}
     * @private
     */
    Rating.prototype.zeroReplacer_ = function(string) {
        switch(string) {
            case 0:
                return '—';
            case '—':
                return 0;
            default:
                return string;
        }
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
});
