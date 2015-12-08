goog.provide('sm.lSearchResult.bSchoolListItem.SchoolListItem');

goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
goog.require('sm.lSearchResult.bSchoolListItem.Template');

/**
 * School list item component
 * @param {object=} params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bSchoolListItem.SchoolListItem = function(params) {
    goog.base(this);
    /**
     *  @private
     *  @type {Array.<Number>}
     */
    this.score_ = params.score || [];

    /**
     *  @private
     *  @type {Number}
     */
    this.totalScore_ = params.totalScore || 0;

    /**
     *  @private
     *  @type {Number}
     */
    this.id_ = params.id || 0;

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
        return opt_index ?
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
     * @override
     */
    ListItem.prototype.createDom = function() {
        goog.base(this, 'createDom');

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
