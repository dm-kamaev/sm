goog.provide('sm.lSearchResult.bSchoolList.ListElement');

goog.require('goog.ui.Control');

/**
 * School list element component
 * @param {object=} params
 * @constructor
 * @extends {goog.ui.Control}
 */

sm.lSearchResult.bSchoolList.ListElement = function(params) {

    /**
     * Parameters
     * @private
     * @type {Number}
     */
    this.id_ = params.id || 0;

    /**
     *  @private
     *  @type {Array}
     */
    this.score_ = params.score || [];

    /**
     *  @private
     *  @type {Number}
     */
    this.totalScore_ = params.totalScore || 0;
};
goog.inherits(sm.lSearchResult.bSchoolList.ListElement, goog.ui.Component);

goog.scope(function() {
    var ListElement = sm.lSearchResult.bSchoolList.ListElement;

    /**
     *  Css class enum
     *  @enum {String}
     */
    ListElement.CssClass = {
        ROOT: 'b-school-list__school'
    };

    /**
     * Returns total score
     * @public
     * @return {Array.<String>}
     */
    ListElement.prototype.getScore = function() {
        return this.score_;
    };

    /**
     * Sets score
     * @public
     * @param {Array} score
     */
    ListElement.prototype.setScore = function(score) {
        this.score_ = score;
    };

    /**
     * Returns total score
     * @return  {Number}
     */
    ListElement.prototype.getTotalScore = function() {
        return this.totalScore_;
    };

    /**
     * Sets total score
     * @public
     * @param {Number} totalScore
     */
    ListElement.prototype.setTotalScore = function(totalScore) {
        this.score_ = totalScore;
    };

    /**
     * Returns params
     * @return  {Object}
     */
    ListElement.prototype.getId = function() {
        return this.id_;
    };
});

