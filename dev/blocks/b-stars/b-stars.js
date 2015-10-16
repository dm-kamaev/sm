goog.provide('sm.bStars.Stars');

goog.require('sm.bStars.Template');
goog.require('goog.ui.Control');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.soy');


/**
 * Stars Component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Control}
 */
sm.bStars.Stars = function(opt_params) {
    goog.base(this);

    /**
     * @private
     * @type{object}
     */
    this.params_ = opt_params;
    /**
     * @private
     * @type{number}
     */
    this.starsMark_ = this.params_.data.mark || 1;

    /**
     * @private
     * @type {bool}
     */
    this.isClickable_ = this.params_.isClickable || false;

    /**
     * @private
     * @type {object}
     */
    this.stars_ = [];
};
goog.inherits(sm.bStars.Stars, goog.ui.Control);


goog.scope(function() {
    var Stars = sm.bStars.Stars;

    /**
     * CSS-class enum
     * @enum {string}
     */
    Stars.CssClass = {
        ROOT: 'b-stars',
        STAR: 'b-stars__star',
        STAR_SELECTED: 'b-stars__star_selected'
    };


    /**
     * Template-based dom element creation.
     * @return {!Node}
     * @public
     */
    Stars.prototype.createDom = function() {
        console.log("rendering template, params: "+JSON.stringify(this.params_));
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
        this.stars_= goog.dom.getElementsByClass(
            Stars.CssClass.STAR, element
        );
    };


    /**
     * Sets up the Component.
     * @inheritDoc
     */
    Stars.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        if (this.isClickable_) {
            for (var i = 0; i < this.stars_.length; i++)
            {
                var star = this.stars_[i];
                goog.events.listen(
                    star,
                    goog.events.EventType.CLICK,
                    this.onClick_.bind(this)
                );
            }
        }
    };

    /**
     * star onclick handler
     * @param {object}
     * @private
     */
    Stars.prototype.onClick_ = function(event) {
        //console.log(event);
        var starNumber = this.getStarNumber_(event.target);
        this.recolorStars_(starNumber);
    };


    /**
     * Gets clicked star number
     * @param {node}
     * @return {number}
     * @private
     */
    Stars.prototype.getStarNumber_ = function(element) {
        for (var i = 0; i< this.stars_.length; i++)
        {
            if (element ===  this.stars_[i])
                return i;
        }
        return -1;
    }

    /**
     * Clearing selection
     * @private
     */
    Stars.prototype.clearSelection_ = function (){
        for (var i = 0; i< this.stars_.length; i++)
        {
            if (goog.dom.classes.has(this.stars_[i], Stars.CssClass.STAR_SELECTED))
                goog.dom.classes.remove(this.stars_[i], Stars.CssClass.STAR_SELECTED);
        }
    }

    /**
     * Recoloring stars
     * @param {number}
     * @private
     */
    Stars.prototype.recolorStars_ = function (count){
        this.clearSelection_();
        for (var i = 0; i<= count; i++)
        {
            if (! goog.dom.classes.has(this.stars_[i], Stars.CssClass.STAR_SELECTED)) {
                goog.dom.classes.add(this.stars_[i], Stars.CssClass.STAR_SELECTED);
            }
        }
        this.starsMark_ = i;
        console.log('Stars.mark is now:' + this.starsMark_);
    }

    /**
     * Cleans up the Component.
     * @inheritDoc
     */
    Stars.prototype.exitDocument = function() {
        goog.base(this, 'exitDocument');
    };


    /**
     * Delete labal component and dom elements
     */
    Stars.prototype.dispose = function() {
        goog.base(this, 'dispose');
        this.exitDocument.bind(this);
    };
});
