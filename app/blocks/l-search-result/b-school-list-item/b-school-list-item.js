goog.provide('sm.lSearchResult.bSchoolListItem.SchoolListItem');

goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('sm.bRating.Rating');
goog.require('sm.bScoreSchoolList.ScoreSchoolList');

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
    this.totalScore_ = this.params_.totalScore;

    /**
     *  @private
     *  @type {Number}
     */
    this.id_ = this.params_.id;

    /**
     * scoreInstance
     * @private
     * @type {sm.bScoreSchoolList.Template}
     */
    this.scoreInstance_ = null;
};
goog.inherits(sm.lSearchResult.bSchoolListItem.SchoolListItem,
    goog.ui.Component);

goog.scope(function() {
    var ListItem = sm.lSearchResult.bSchoolListItem.SchoolListItem,
        Score = sm.bScoreSchoolList.ScoreSchoolList;

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
     * @return {(Array.<Object>|Number)}
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
        return this.totalScore_;
    };

    /**
     * Returns item id
     * @return {Number}
     */
    ListItem.prototype.getId = function() {
        return this.id_;
    };

    /**
     * Compare by total score descending then by id asc
     * @param {sm.lSearchResult.bSchoolListItem.SchoolListItem} item
     * @return {number}
     */
    ListItem.prototype.compareByTotalScore = function(item) {
        var result;

        result = item.getTotalScore() - this.getTotalScore();

        if (result === 0) {
            result = this.compareById(item);
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

        scoreElement = this.getElementByClass(Score.CssClass.ROOT);
        this.scoreInstance_ = new Score({
            'score': this.score_,
            'totalScore': this.totalScore_
        });
        this.addChild(this.scoreInstance_);
        this.scoreInstance_.decorate(scoreElement);
    };

    /**
     * Set up the Component.
     * @public
     */
    ListItem.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        handler.listen(
            this.getElement(),
            goog.events.EventType.CLICK,
            this.itemClickHandler_
        );

        // handler.listen(
        //     this.scoreInstance_,
        //     Score.Event.CLICK,
        //     this.scoreClickHandler_
        // );
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
