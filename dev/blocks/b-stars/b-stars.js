goog.provide('sm.bStars.Stars');

goog.require('goog.ui.Component');
goog.require('goog.dom.classes');
goog.require('goog.events');

/**
 * Stars Component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.bStars.Stars = function(opt_params) {
    goog.base(this, opt_params);
    console.log('Stars');

    /**
     * @private {object}
     */
    var params_ = opt_params;

    /**
     * @private {number}
     */
    var starsMark = params_.data.mark || 1;

    /**
     * @private {object}
     */
    var stars_ = [];


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
        STAR_SELECTED: 'b-stars__star_selected'
    };





    /**
     * Internal decorates the DOM element
     * @param {Node} element
     * @inheritDoc
     */
    Stars.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.stars_= goog.dom.getElementsByClass(
            Stars.CssClass.ROOT, element
        );
    };


    /**
     * Sets up the Component.
     * @inheritDoc
     */
    Stars.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        if (this.params_.isClickable) {
            for (var i = 0; i< this.stars_.length; i++)
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

    Stars.prototype.onClick_ = function(event) {
        console.log(event);
        //this.changeActiveButton(event.target);
    };



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
