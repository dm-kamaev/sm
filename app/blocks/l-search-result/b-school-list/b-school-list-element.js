goog.provide('sm.lSearchResult.bSchoolList.ListElement');


/**
 * School list element component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */

sm.lSearchResult.bSchoolList.ListElement = function(opt_params) {

    /**
     *  @private
     *  @type {Array}
     */
    this.score_ = [];

    /**
     *  @private
     *  @type {Number}
     */
    this.totalScore_ = 0;
};
goog.inherits(sm.lSearchResult.bSchoolList.ListElement, goog.ui.Control);

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
     * @return {Array.<String>}
     */
    ListElement.prototype.getScore = function() {
        return this.score_;
    };

    /**
     * Returns total score
     * @return  {Number}
     */
    ListElement.prototype.getTotalScore = function() {
        return this.totalScore_;
    };

    /**
     * Internal decorates the DOM element
     * @param {Element} element
     */
    ListElement.prototype.decorateInternal = function() {
    };



});

