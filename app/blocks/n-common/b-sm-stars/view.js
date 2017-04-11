goog.provide('sm.bSmStars.View');

goog.require('cl.gInput.View');
goog.require('cl.iControl.View');
goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');



/**
 * Stars View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmStars.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmStars.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /**
     * It defines active stars or not
     * @type {boolean}
     * @private
     */
    this.isActive_ = false;
};
goog.inherits(sm.bSmStars.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmStars.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-stars',
        ACTIVE_STATE: 'b-sm-stars_active',
        STAR: 'b-sm-stars__star',
        STAR_SELECTED: 'b-sm-stars__star_selected'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initState_();
        this.initDom_();
        this.initSelectedStars_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        if (this.isActive_) {
            this.initStarsListeners_();
        }
    };


    /**
     * Get value
     * @return {number}
     */
    View.prototype.getValue = function() {
        return this.getSelectedStarsAmount_();
    };


    /**
     * Set value
     * @param {number} amount
     */
    View.prototype.setValue = function(amount) {
        this.setSelectedStarsAmount_(amount);
    };


    /**
     * Initializes listeners for stars
     * @private
     */
    View.prototype.initStarsListeners_ = function() {
        for (var i = 0; i < this.dom.stars.length; i++) {
            this.getHandler().listen(
                this.dom.stars[i],
                goog.events.EventType.CLICK,
                this.onStarClick_.bind(this, i)
            );
        }
    };


    /**
     * Star heandler
     * @param {number} index
     * @private
     */
    View.prototype.onStarClick_ = function(index) {
        this.setSelectedStarsAmount_(index + 1);
    };


    /**
     * Get selected stars amount
     * @return {number}
     * @private
     */
    View.prototype.getSelectedStarsAmount_ = function() {
        return this.dom.selectedStars ? this.dom.selectedStars.length : null;
    };


    /**
     * Set amount selected stars
     * @param {number} amount
     * @private
     */
    View.prototype.setSelectedStarsAmount_ = function(amount) {
        var stars = this.dom.stars;

        for (var i = 0; i < stars.length; i++) {
            i < amount ?
                this.selectStar_(stars[i]) :
                this.unselectStar_(stars[i]);
        }

        this.initSelectedStars_();
    };


    /**
     * Add class with modifier selected
     * @param {Object} star
     * @private
     */
    View.prototype.selectStar_ = function(star) {
        goog.dom.classlist.add(
            star,
            View.CssClass.STAR_SELECTED
        );
    };


    /**
     * Remove class with modifier selected
     * @param {Object} star
     * @private
     */
    View.prototype.unselectStar_ = function(star) {
        goog.dom.classlist.remove(
            star,
            View.CssClass.STAR_SELECTED
        );
    };


    /**
     * Initializes stars selected elements
     * @private
     */
    View.prototype.initSelectedStars_ = function() {
        this.dom.selectedStars = this.getElementsByClass(
            View.CssClass.STAR_SELECTED
        );
    };


    /**
     * Initializes dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            input: this.getElementByClass(
                cl.gInput.View.CssClass.ROOT
            ),
            stars: this.getElementsByClass(
                View.CssClass.STAR
            )
        };
    };


    /**
     * It defines active badge or not
     * @private
     */
    View.prototype.initState_ = function() {
        this.isActive_ = goog.dom.classlist.contains(
            this.getElement(),
            View.CssClass.ACTIVE_STATE
        );
    };
});  // goog.scope
