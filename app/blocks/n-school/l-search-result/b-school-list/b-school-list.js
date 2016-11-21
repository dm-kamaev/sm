goog.provide('sm.lSearchResult.bSchoolList.SchoolList');

goog.require('goog.dom.classlist');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('sm.bSchoolListItem.SchoolListItem');
goog.require('sm.iFactory.FactoryStendhal');
goog.require('sm.lSearchResult.bSchoolList.Template');



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
     * @type {Array.<sm.bSchoolListItem.SchoolListItem>}
     * @private
     */
    this.schoolListItems_ = [];


    /**
     * Body element
     * @type {?Element}
     * @private
     */
    this.bodyElement_ = null;


    /**
     * Loader element
     * @type {?Element}
     * @private
     */
    this.loaderElement_ = null;


    /**
     * Instance
     * @type {sm.lSearchResult.bSort.Sort}
     * @private
     */
    this.sort_ = null;


    /**
     * @type {number}
     * @private
     */
    this.sortKey_ = 0;
};
goog.inherits(sm.lSearchResult.bSchoolList.SchoolList, goog.ui.Component);


goog.scope(function() {
    var SchoolList = sm.lSearchResult.bSchoolList.SchoolList,
        SchoolListItem = sm.bSchoolListItem.SchoolListItem;


    /**
     * CSS-class enum
     * @enum {string}
     */
    SchoolList.CssClass = {
        ROOT: 'b-school-list',
        SCHOOL_LIST_BODY: 'b-school-list__body',
        SHOW_MORE_BUTTON: 'b-school-list__show-more-button',
        LOADER: 'b-school-list__loader'
    };


    /**
     * Event enum
     * @enum
     */
    SchoolList.Event = {
        SORT_CLICK: sm.gDropdown.DropdownSelectLegacy.Event.ITEM_SELECT,
        FAVORITE_ADDED: SchoolListItem.Event.FAVORITE_ADDED,
        FAVORITE_REMOVED: SchoolListItem.Event.FAVORITE_REMOVED,
        SHOW_MORE: 'show-more-items'
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
            length;

        //dom elements of schools
        schoolListItemElements = goog.dom.getElementsByClass(
            SchoolListItem.CssClass.ROOT,
            element
        );

        length = schoolListItemElements.length;
        for (var i = 0, item; i < length; i++) {
            item = schoolListItemElements[i];

            schoolListItemInstance = new SchoolListItem();

            this.addChild(schoolListItemInstance);
            this.schoolListItems_.push(schoolListItemInstance);
            schoolListItemInstance.decorate(item);
        }

        this.bodyElement_ = this.getElementByClass(
            SchoolList.CssClass.SCHOOL_LIST_BODY
        );

        this.loaderElement_ = this.getElementByClass(
            SchoolList.CssClass.LOADER
        );

        this.showMoreButtonElement_ = this.getElementByClass(
            SchoolList.CssClass.SHOW_MORE_BUTTON
        );

        //sort
        var sortElement = goog.dom.getElementByClass(
            cl.gDropdown.View.CssClass.ROOT,
            element
        );

        this.sort_ = sm.iFactory.FactoryStendhal.getInstance().decorate(
            'dropdown-select-legacy',
            sortElement,
            this
        );
    };


    /**
     * @override
     */
    SchoolList.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initListeners_();
    };


    /**
     * Show more items handler
     * @private
     */
    SchoolList.prototype.showMoreHandler_ = function() {
        this.dispatchEvent(SchoolList.Event.SHOW_MORE);
    };


    /**
     * Checks is bottom of the page
     * @private
     */
    SchoolList.prototype.scrollHandler_ = function() {
        if (goog.dom.getViewportSize().height +
                goog.dom.getDocumentScroll().y >=
                goog.dom.getDocumentHeight()) {

            this.dispatchEvent(SchoolList.Event.SHOW_MORE);
        }
    };


    /**
     * Shows loader
     */
    SchoolList.prototype.showLoader = function() {
        goog.dom.classlist.remove(
            this.loaderElement_,
            gorod.iUtils.CssClass.HIDDEN
        );
        this.hideShowMoreButton_();
    };


    /**
     * Hides loader
     * @private
     */
    SchoolList.prototype.hideLoader_ = function() {
        goog.dom.classlist.add(
            this.loaderElement_,
            gorod.iUtils.CssClass.HIDDEN
        );
        this.showShowMoreButton_();
    };


    /**
     * Show show more button
     * @private
     */
    SchoolList.prototype.showShowMoreButton_ = function() {
        goog.dom.classlist.remove(
            this.showMoreButtonElement_,
            gorod.iUtils.CssClass.HIDDEN
        );
    };

    /**
     * Hides show more button
     * @private
     */
    SchoolList.prototype.hideShowMoreButton_ = function() {
        goog.dom.classlist.add(
            this.showMoreButtonElement_,
            gorod.iUtils.CssClass.HIDDEN
        );
    };


    /**
     * Hides loader and more button
     * @private
     */
    SchoolList.prototype.hideLoaderAndButton_ = function() {
        goog.dom.classlist.add(
            this.showMoreButtonElement_,
            gorod.iUtils.CssClass.HIDDEN
        );
        goog.dom.classlist.add(
            this.loaderElement_,
            gorod.iUtils.CssClass.HIDDEN
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
     * Set school list
     * @param {Array.<Object>=} opt_listData
     */
    SchoolList.prototype.setItems = function(opt_listData) {
        this.removeItemChildren_(true);
        this.schoolListItems_ = [];
        this.addItems(opt_listData);
    };


    /**
     * Add school list items
     * @param {Array.<Object>=} opt_listData
     */
    SchoolList.prototype.addItems = function(opt_listData) {
        var data = opt_listData || [];

        data.forEach(function(itemData) {
            var params = SchoolListItem.transformParams(itemData),
                item = new SchoolListItem(params);
            this.addChild(item, true);
            this.schoolListItems_.push(item);
        }, this);

        if (data.length < 10) {
            this.disable_();
        } else {
            this.hideLoader_();
        }
    };


    /**
     * Get impression data of list items
     * @return {Array<Object>}
     */
    SchoolList.prototype.getImpressionData = function() {
        return this.schoolListItems_.map(function(item) {
            return item.getImpressionData();
        });
    };


    /**
     * Listen events
     * @private
     */
    SchoolList.prototype.initListeners_ = function() {
        this.getHandler().listen(
            this.showMoreButtonElement_,
            goog.events.EventType.CLICK,
            this.showMoreHandler_
        );

        if (!goog.dom.classes.has(
                this.showMoreButtonElement_,
                gorod.iUtils.CssClass.HIDDEN
        )) {
            this.getHandler().listen(
                goog.dom.getWindow(),
                goog.events.EventType.SCROLL,
                this.scrollHandler_
            );
        }
    };


    /**
     * Reset uploading controlls
     */
    SchoolList.prototype.reset = function() {
        this.hideLoader_();
        this.initListeners_();
    };


    /**
     * Turn off uploading controlls
     * @private
     */
    SchoolList.prototype.disable_ = function() {
        this.getHandler().removeAll();
        this.hideLoaderAndButton_();
    };


    /**
     * Remove school list item children
     * @param {bool=} opt_unrender
     * @return {Array.<sm.bSchoolListItem.SchoolListItem>}
     * @private
     */
    SchoolList.prototype.removeItemChildren_ = function(opt_unrender) {
        var that = this;
        var res = [];

        this.schoolListItems_.forEach(function(item) {
            res.push(that.removeChild(item, opt_unrender));
        });

        return res;
    };

});  // goog.scope
