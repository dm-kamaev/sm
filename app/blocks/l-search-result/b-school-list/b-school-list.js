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
     * @type {Array.<sm.lSearchResult.bSchoolListItem.SchoolListItem>}
     * @private
     */
    this.schoolListItems_ = [];

    /**
     *
     * @type {?Element}
     * @private
     */
    this.bodyElement_ = null;

    /**
     * @type {number}
     * @private
     */
    this.sortKey_ = 0;
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
     * @param {number=} opt_sortKey
     */
    SchoolList.prototype.sort = function(opt_sortKey) {
        var schoolListItems = this.removeChildren();
        var sortKey = (typeof opt_sortKey == 'undefined') ?
            this.sortKey_ :
            opt_sortKey;
        this.sortKey_ = sortKey;

        schoolListItems.sort(function(item1, item2) {
            return (sortKey > 0) ?
                item1.compareByScore(item2, sortKey - 1) :
                item1.compareByTotalScore(item2);
        });

        schoolListItems.forEach(function(item) {
            item.changeSorCriterion(sortKey);
        });

        for (var i = 0; i < schoolListItems.length; i++) {
            this.addChild(schoolListItems[i]);
        }
    };

    /**
     * Set school list
     * @param {Array.<Object>=} opt_listData
     */
    SchoolList.prototype.setItems = function(opt_listData) {
        var that = this;

        this.schoolListItems_.forEach(function(item) {
            that.removeChild(item, true);
        });
        this.schoolListItems_ = [];

        var data = opt_listData || [];

        data.forEach(function(itemData) {
            var item = new SchoolListItem(itemData);
            that.addChild(item, true);
            that.schoolListItems_.push(item);
        });

        this.sort();
    };
});
