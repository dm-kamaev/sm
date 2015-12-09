goog.provide('sm.lSearchResult.bSchoolListItem.SchoolListItem');

goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
goog.require('sm.lSearchResult.bSchoolListItem.Template');

/**
 * School list item component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bSchoolListItem.SchoolListItem = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @type {Object}
     * @private
     */
    this.params_ = opt_params || {};

    /**
     *  @private
     *  @type {Array.<Number>}
     */
    this.score_ = this.params_.score;

    /**
     *  @private
     *  @type {Number}
     */
    this.totalScore_ = this.params_.totalScore;

    /**
     *  @private
     *  @type {Number}
     */
    this.id_ = this.params_.id;
};
goog.inherits(sm.lSearchResult.bSchoolListItem.SchoolListItem,
    goog.ui.Component);

goog.scope(function() {
    var ListItem = sm.lSearchResult.bSchoolListItem.SchoolListItem,
        Rating = sm.bRating.Rating;

    /**
     *  Css class enum
     *  @enum {String}
     */
    ListItem.CssClass = {
        ROOT: 'b-school-list-item'
    };

    /**
     * Events enum
     * @enum {String}
     */
    ListItem.Event = {
        CLICK: 'click'
    };

    /**
     * Returns score
     * @public
     * @param {Number=} opt_index
     * @return {(Array.<Number>|Number)}
     */
    ListItem.prototype.getScore = function(opt_index) {
        return (typeof opt_index != 'undefined') ?
            this.score_[opt_index] :
            this.score_;
    };

    /**
     * Returns total score
     * @return  {Number}
     */
    ListItem.prototype.getTotalScore = function() {
        return this.totalScore_;
    };

    /**
     * Compare by total score
     * @param {sm.lSearchResult.bSchoolListItem.SchoolListItem} item
     * @return {number}
     */
    ListItem.prototype.compareByTotalScore = function(item) {
        return item.getTotalScore() - this.getTotalScore();
    };

    /**
     * Compare by score
     * @param {sm.lSearchResult.bSchoolListItem.SchoolListItem} item
     * @param {number} index
     * @returns {number}
     */
    ListItem.prototype.compareByScore = function(item, index) {
        return item.getScore(index) - this.getScore(index);
    };

    /**
     * @override
     */
    ListItem.prototype.createDom = function() {
        goog.base(this, 'createDom');

        /**
         * TODO: remove this when backend will send score
         */
        if (!this.params_.totalScore) {
            this.params_.totalScore = 0;
        }

        if (!this.params_.score) {
            this.params_.score = [0,0,0,0];
        }

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bSchoolListItem.Template.base,
            {
                params: this.params_
            }
        );

        this.decorateInternal(element);
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    ListItem.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var schoolRatingElement,
            schoolRatingInstance;

        schoolRatingElement = this.getElementByClass(Rating.CssClass.ROOT);

        schoolRatingInstance = new Rating();
        this.addChild(schoolRatingInstance);
        schoolRatingInstance.decorate(schoolRatingElement);
    };

    /**
     * Set up the Component.
     * @public
     */
    ListItem.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        this.getHandler().listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.itemClickHandler_
        );
    };

    /**
     * Click handler
     * @private
     */
    ListItem.prototype.itemClickHandler_ = function() {
        this.dispatchEvent({
            'type': ListItem.Event.CLICK,
            'itemId': this.id_
        });
    };
});
