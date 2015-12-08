goog.provide('sm.lSearchResult.bSchoolList.SchoolList');


goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.lSearchResult.bSchoolList.Template');
goog.require('sm.lSearchResult.bSchoolListItem.SchoolListItem');


/**
 * School list component
 * @param {object=} opt_params
 * @constructor
 * @extends {goog.ui.Component}
 */
sm.lSearchResult.bSchoolList.SchoolList = function(opt_params) {
    goog.base(this);

    /**
     * Parameters
     * @private
     * @type {Object}
     */
    this.params_ = opt_params || {};

    /**
     * Array of instances of list elements
     * @private
     * @type {Array.<sm.lSearchResult.bSchoolListItem.SchoolListItem>}
     */
    this.schoolListItems_ = [];

    /**
     *
     * @type {?Element}
     * @private
     */
    this.bodyElement_ = null;
};
goog.inherits(sm.lSearchResult.bSchoolList.SchoolList, goog.ui.Component);

goog.scope(function() {
    var SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        SchoolListItem = sm.lSearchResult.bSchoolListItem.SchoolListItem;

    /**
     * CSS-class enum
     * @enum {string}
     */
    SchoolList.CssClass = {
        ROOT: 'b-school-list',
        SCHOOL_LIST_BODY: 'b-school-list__body'
    };

    /**
     * Event enum
     * @enum
     */
    SchoolList.Event = {
        'ITEM_CLICK': SchoolListItem.Event.CLICK
    };

    /**
     * Template-based dom element creation.
     * @public
     */
    SchoolList.prototype.createDom = function() {
        goog.base(this, 'createDom');

        var element = goog.soy.renderAsElement(
            sm.lSearchResult.bSchoolList.Template.base,
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
    SchoolList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        var schoolListItemInstance,
            schoolListItemElements,
            params,
            length;

        //dom elements of schools
        schoolListItemElements = goog.dom.getElementsByClass(
            SchoolListItem.CssClass.ROOT,
            element
        );

        length = schoolListItemElements.length;
        for (var i = 0, item; i < length; i++) {
            item = schoolListItemElements[i];

            params = JSON.parse(
                item.getAttribute('data-params')
            );

            schoolListItemInstance = new SchoolListItem({
                'id': params.id,
                'score': params.score,
                'totalScore': params.totalScore
            });

            this.addChild(schoolListItemInstance);
            this.schoolListItems_.push(schoolListItemInstance);
            schoolListItemInstance.decorate(item);
        }

        this.bodyElement_ = this.getElementByClass(
            SchoolList.CssClass.SCHOOL_LIST_BODY
        );
    };

    /**
     * @override
     */
    SchoolList.prototype.getContentElement = function() {
        goog.base(this, 'getContentElement');
        return this.bodyElement_;
    };

    /**
     * Schools sort maker
     * @param {string} sortKey
     * @public
     */
    SchoolList.prototype.sort = function(sortKey) {
        var compareByTotalScore = function(a, b) {
                return b.getTotalScore() - a.getTotalScore();
            };
        var compareByScore = function(a, b) {
                return b.getScore(sortKey - 1) - a.getScore(sortKey - 1);
            };
        var compare = (sortKey > 0) ? compareByScore : compareByTotalScore;

        var schoolListElements = this.removeChildren();
        schoolListElements.sort(compare);

        for (var i = 0; i < schoolListElements.length; i++) {
            this.addChild(schoolListElements[i]);
        }
    };
});
