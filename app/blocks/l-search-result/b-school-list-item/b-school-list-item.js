goog.provide('sm.lSearchResult.bSchoolListItem.SchoolListItem');

goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bBadge.Badge');
goog.require('sm.bRating.Rating');
goog.require('sm.bScore.ScoreMinimized');

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
     *  @type {Array.<Object>}
     */
    this.score_ = this.params_.score;

    /**
     *  @private
     *  @type {Number}
     */
    this.currentCriterion_ = this.params_.currentCriterion;

    /**
     *  @private
     *  @type {Number}
     */
    this.id_ = this.params_.id;

    /**
     * @private
     * @type {string}
     */
    this.url_ = this.params_.url;

    /**
     * @private
     * @type {string}
     */
    this.name_ = this.params_.name.light + this.params_.name.bold;

    /**
     * scoreInstance
     * @private
     * @type {sm.bScore.ScoreMinimized}
     */
    this.scoreInstance_ = null;

    /**
     * defines whether score is clickable
     * @private
     * @type {boolean}
     */
    this.isScoreClickable_ = this.params_.isScoreClickable;

    /**
     * DOM elements
     * @type {Object}
     * @private
     */
    this.elements_ = {};
};
goog.inherits(sm.lSearchResult.bSchoolListItem.SchoolListItem,
    goog.ui.Component);

goog.scope(function() {
    var ListItem = sm.lSearchResult.bSchoolListItem.SchoolListItem,
        ScoreMinimized = sm.bScore.ScoreMinimized,
        Badge = sm.bBadge.Badge,
        Analytics = sm.iAnalytics.Analytics.getInstance();

    /**
     *  Css class enum
     *  @enum {String}
     */
    ListItem.CssClass = {
        ROOT: 'b-school-list-item',
        LINK_NAME: 'b-school-list-item__name_bold',
        SECTION_BADGES: 'b-school-list-item__section_badges'
    };


    /**
     * Returns score
     * @public
     * @param {Number=} opt_index
     * @return {(Array.<Number>|Number)}
     */
    ListItem.prototype.getScore = function(opt_index) {
        var res;
        if (typeof opt_index != 'undefined') {
            res = this.score_[opt_index].value;
        }
        else {
            res = this.score_.map(function(item) {
                return item.value;
            });
        }
        return res;
    };

    /**
     * Returns total score
     * @return  {Number}
     */
    ListItem.prototype.getTotalScore = function() {
        return this.currentCriterion_;
    };

    /**
     * Returns item id
     * @return {Number}
     */
    ListItem.prototype.getId = function() {
        return this.id_;
    };

    /**
     * Compare by total score descending
     * then by presence of score
     * then by id asc
     * @param {sm.lSearchResult.bSchoolListItem.SchoolListItem} item
     * @return {number}
     */
    ListItem.prototype.compareByTotalScore = function(item) {
        var result;

        result = item.getTotalScore() - this.getTotalScore();

        if (result === 0) {
            var itemZeroScore,
                thisZeroScore;

            itemZeroScore = this.checkScore_(item.getScore());
            thisZeroScore = this.checkScore_(this.getScore());

            if (itemZeroScore && !thisZeroScore) {
                result = -1;
            }
            else if (!itemZeroScore && thisZeroScore) {
                result = 1;
            }
            else {
                result = this.compareById(item);
            }
        }
        return result;
    };

    /**
     * Compare by score desc then by total score desc then by id asc
     * @param {sm.lSearchResult.bSchoolListItem.SchoolListItem} item
     * @param {number} index
     * @return {number}
     */
    ListItem.prototype.compareByScore = function(item, index) {
        var result;

        result = item.getScore(index) - this.getScore(index);

        if (result === 0) {
            result = this.compareByTotalScore(item);
        }

        return result;
    };

    /**
     * Compare by id ascending
     * @param {sm.lSearchResult.bSchoolListItem.SchoolListItem} item
     * @return {number}
     */
    ListItem.prototype.compareById = function(item) {
        return this.getId() - item.getId();
    };

    /**
    * @return {Object}
    */
    ListItem.prototype.getImpressionData = function() {
        return {
            id: this.id_,
            name: this.name_,
            position: this.params_.position,
            list: 'Search Results'
        };
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

        var scoreElement;
        scoreElement = this.getElementByClass(ScoreMinimized.CssClass.ROOT);
        this.scoreInstance_ = new ScoreMinimized();
        this.addChild(this.scoreInstance_);
        this.scoreInstance_.decorate(scoreElement);

        this.elements_.sectionBadges = this.getElementByClass(
            ListItem.CssClass.SECTION_BADGES
        );

        var badgeElements = this.getElementsByClass(
            Badge.CssClass.ROOT
        );

        if (badgeElements) {
            for (var i = 0, instance; i < badgeElements.length; i++) {
                instance = new Badge();
                this.addChild(instance);
                instance.decorate(badgeElements[i]);
            }
        }
    };

    /**
     * Set up the Component.
     * @public
     */
    ListItem.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        if (this.elements_.sectionBadges) {
            handler.listen(
                this.elements_.sectionBadges,
                goog.events.EventType.CLICK,
                this.onSectionBadgesClick_
            );
        }

        handler.listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.onClickListItem_
        );
    };

    /**
     * @param {Object} event
     * @private
     */
    ListItem.prototype.onClickListItem_ = function(event) {
        if (!event.defaultPrevented) {
            this.sendAnalyticsSchoolData_(event);
        }
    };

    /**
     * On section badges click
     * @param {Object} event
     * @private
     */
    ListItem.prototype.onSectionBadgesClick_ = function(event) {
        event.preventDefault();
    };

    /**
     * Compare input array with null score:[0, 0, 0, 0]
     * and return true if they equals
     * @param {Array} score
     * @return {boolean}
     * @private
     */
    ListItem.prototype.checkScore_ = function(score) {
        var nullScore = [0, 0, 0, 0],
            result = true;

        for (var i = 0, l = score.length; i < l; i++) {
            if (score[i] != nullScore[i]) {
                result = false;
            }
        }
        return result;
    };

    /**
     * send Analytics data school
     * @param {Object} event
     * @private
     */
    ListItem.prototype.sendAnalyticsSchoolData_ = function(event) {

        var ecData = {
            id: this.params_.id,
            name: this.name_,
            position: this.params_.position
        };

        Analytics.clickProduct(ecData, 'Search Results');

        var dataAnalytics = {
            hitType: 'event',
            eventCategory: 'search',
            eventAction: 'results click',
            eventLabel: this.name_
        };

        Analytics.send(dataAnalytics);
    };
});
