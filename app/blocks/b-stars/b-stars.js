goog.provide('sm.bStars.Stars');

goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bStars.Template');


/**
 * Stars Component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bStars.Stars = function(opt_params) {
    goog.base(this);

    /**
     * @private
     * @type {object}
     */
    this.params_ = opt_params || {data: {}};

    /**
     * @private
     * @type {object}
     */
    this.config_ = this.params_.config ? this.params_.config : {};
    /**
     * @private
     * @type {number}
     */
    this.starsMark_ = this.params_.data.mark || 0;

    /**
     * @private
     * @type {bool}
     */
    this.isClickable_ = this.config_.isClickable || false;

    /**
     * @private
     * @type {array}
     */
    this.stars_ = [];

    /**
     * @private
     * @type {node}
     */
    this.inputElem_ = null;
};
goog.inherits(sm.bStars.Stars, goog.ui.Component);


goog.scope(function() {
    var Stars = sm.bStars.Stars;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Stars.CssClass = {
        ROOT: 'b-stars',
        STAR: 'b-stars__star',
        STAR_SELECTED: 'b-stars__star_selected',
        STAR_NOT_SELECTED: 'b-star__star_not-selected',
        INPUT: 'b-stars__hidden-input'
    };

    /**
     * Event enum
     * @enum {string}
     */
    Stars.Event = {
        VALUE_CHANGED: 'VALUE_CHANGED'
    };


    /**
     * Template-based dom element creation.
     * @public
     */
    Stars.prototype.createDom = function() {
        var el = goog.soy.renderAsElement(sm.bStars.Template.base, {
            params: this.params_
        });
        this.decorateInternal(el);
    };


    /**
     * Internal decorates the DOM element
     * @param {Node} element
     * @inheritDoc
     */
    Stars.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.stars_ = goog.dom.getElementsByClass(
            Stars.CssClass.STAR, element
        );
        this.inputElem_ = goog.dom.getElementByClass(
            Stars.CssClass.INPUT, element
        );
    };


    /**
     * Sets up the Component.
     * @inheritDoc
     */
    Stars.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        if (this.isClickable_) {
            var handler = this.getHandler();
            for (var i = 0; i < this.stars_.length; i++)
            {
                handler.listen(
                    this.stars_[i],
                    goog.events.EventType.CLICK,
                    this.onClick_.bind(this, i)
                );
            }
        }
    };


    /**
     * Set stars value
     * @param {number} value
     * @return {boolean}
     */
    Stars.prototype.setValue = function(value) {
        var isChanged = (value != this.starsMark_);
        if (isChanged) {
            this.selectStars(value);
        }
        return isChanged;
    };


    /**
     * star onclick handler
     * @param {number} index
     * @private
     */
    Stars.prototype.onClick_ = function(index) {
        var starNumber = index + 1;
        if (this.starsMark_ != starNumber)
            this.selectStars(starNumber);
    };

    /**
     * Change value
     * @param {number} newValue
     * @private
     */
    Stars.prototype.changeValue_ = function(newValue) {
        var oldValue = this.starsMark_;
        this.starsMark_ = newValue;
        goog.dom.setProperties(
            this.inputElem_,
            {value: newValue}
        );
        var newEvent = new goog.events.Event(Stars.Event.VALUE_CHANGED, this);
        newEvent.newValue = newValue;
        newEvent.oldValue = oldValue;
        this.dispatchEvent(newEvent);
    };

    /**
     * Clearing selection
     * @private
     */
    Stars.prototype.clearSelection_ = function() {
        for (var i = 0, star; i < this.stars_.length; i++)
        {
            star = this.stars_[i];
            if (goog.dom.classes.has(star, Stars.CssClass.STAR_SELECTED)) {
                goog.dom.classes.remove(star, Stars.CssClass.STAR_SELECTED);
            }
            if (!goog.dom.classes.has(star, Stars.CssClass.STAR_NOT_SELECTED)) {
                goog.dom.classes.add(star, Stars.CssClass.STAR_NOT_SELECTED);
            }
        }
    };

    /**
     * Reselecting stars
     * @param {number} count
     */
    Stars.prototype.selectStars = function(count) {
        this.clearSelection_();
        var index = count - 1;
        for (var i = 0, star; i <= index; i++)
        {
            star = this.stars_[i];
            goog.dom.classes.add(star, Stars.CssClass.STAR_SELECTED);
            goog.dom.classes.remove(star, Stars.CssClass.STAR_NOT_SELECTED);
        }
        this.changeValue_(count);
    };
});
