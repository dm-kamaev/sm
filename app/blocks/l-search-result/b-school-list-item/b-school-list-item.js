goog.provide('sm.lSearchResult.bSchoolListItem.SchoolListItem');

goog.require('goog.dom.dataset');
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
     * scoreInstance
     * @private
     * @type {sm.bScoreSchoolList.ScoreSchoolList}
     */
    this.scoreInstance_ = null;

    /**
     * defines whether score is clickable
     * @private
     * @type {boolean}
     */
    this.isScoreClickable_ = this.params_.isScoreClickable;

    /**
     * @private
     * @type {?array<object>}
     */
    this.metro_ = [];
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
        ROOT: 'b-school-list-item',
        LINK_NAME: 'b-school-list-item__name_bold'
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
     * Change criterion of sort
     * @param {Number} newCriterion
     */
    ListItem.prototype.changeSorCriterion = function(newCriterion) {
        var scoreInstance = this.getChildAt(0);

        scoreInstance.changeCriterion(newCriterion);
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
            'currentCriterion': this.currentCriterion_,
            'isClickable': this.isScoreClickable_
        });
        this.addChild(this.scoreInstance_);
        this.scoreInstance_.decorate(scoreElement);

        this.metro_ = this.getElementsByClass('b-badge__item_active');
    };

    /**
     * Set up the Component.
     * @public
     */
    ListItem.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var handler = this.getHandler();

        for (var i = 0; i < this.metro_.length; i++) {
            handler.listen(
                this.metro_[i],
                goog.events.EventType.CLICK,
                this.metroClickHandler_
            );
        }
    };

    /**
     * Metro click handler
     * @param {Object} event
     * @private
     */
    ListItem.prototype.metroClickHandler_ = function(event) {
        event.preventDefault();
        var params = JSON.parse(
            goog.dom.dataset.get(event.currentTarget, 'params')
        );

        document.location.href = '/search?name=' + event.target.textContent +
            '&metroId=' + params['id'];
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
});
