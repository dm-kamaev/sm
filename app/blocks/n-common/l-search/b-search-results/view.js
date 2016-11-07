goog.provide('sm.lSearch.bSearchResults.View');

goog.require('cl.iControl.View');
goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.object');



goog.scope(function() {
    /**
     * View for SearchResults block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
    sm.lSearch.bSearchResults.View = function(
        opt_params, opt_type, opt_modifier) {
        sm.lSearch.bSearchResults.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );

        /**
         * @type {sm.lSearch.bSearchResults.View.Params}
         * @protected
         */
        this.params = null;

        /**
         * Current state
         * @type {sm.lSearch.bSearchResults.View.State}
         * @private
         */
        this.state_ = sm.lSearch.bSearchResults.View.DEFAULT;
    };
    goog.inherits(sm.lSearch.bSearchResults.View, cl.iControl.View);
    var View = sm.lSearch.bSearchResults.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-search-results',
        HEADER: 'b-search-results__header',
        SORT: 'b-search-results__sort-control',
        ITEM_LIST: 'b-search-results__item-list',
        SHOW_MORE_BUTTON: 'b-search-results__show-more-button',
        LOADER: 'b-search-results__loader',
        SEARCH_IN_PROGRESS: 'b-search-results_search-in-progress',
        SORT_IN_PROGRESS: 'b-search-results_sort-in-progress',
        EMPTY_RESULTS: 'b-search-results_empty-results'
    };


    /**
     * Possible state enum
     * @enum {string}
     */
    View.State = {
        DEFAULT: 'default',
        EMPTY_RESULTS: 'emptyResults',
        SEARCH_IN_PROGRESS: 'ssearchInProgress',
        SORT_IN_PROGRESS: 'sortInProgress'
    };


    /**
     * @typedef {{
     *     declensionEntityType: {
     *         nom: string,
     *         gen: string,
     *         plu: string
     *     }
     * }}
     */
    View.Params;


    /**
     * @override
     * @public
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * Update headers size s and l for results list
     * @param {number} countResults
     * @param {string} searchText
     * @public
     */
    View.prototype.updateListHeader = function(countResults, searchText) {
        goog.soy.renderElement(
            this.dom.header,
            sm.lSearch.Template.listHeaderText, {
                params: {
                    data: {
                        countResults: countResults,
                        searchText: searchText,
                        declensionEntityType:
                            this.params.declensionEntityType
                    }
                }
            }
        );
    };


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
        this.initDom_()
            .initState_();
    };


    /**
     * Return data-params from dom element
     * @return {sm.lSearch.bSearchResults.View.DataParams}
     * @protected
     * @override
     */
    View.prototype.getParams = function() {
        var rawParams = View.base(this, 'getParams');
        return rawParams ? this.transformParams(rawParams) : null;
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object} rawParams
     * @return {sm.lSearch.bSearchResults.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            declensionEntityType: {
                nom: rawParams['declensionEntityType']['nom'],
                gen: rawParams['declensionEntityType']['gen'],
                plu: rawParams['declensionEntityType']['plu']
            }
        };
    };


    /**
     * Change if is possible and needed state to given one
     * @param {sm.lSearch.bSearchResults.View.State} state
     */
    View.prototype.changeState = function(state) {
        if (this.isCorrectState_(state) && this.state_ != state) {
            this.switchState_(state);
        }
    };


    /**
     * Check that give state is in possible states enum
     * @param {sm.lSearch.bSearchResults.View.State} state
     * @return {boolean}
     * @private
     */
    View.prototype.isCorrectState_ = function(state) {
        var possibleStates = goog.object.getKeys(View.State);

        return ~goog.array.findIndex(possibleStates, function(possibleState) {
            return possibleState == state;
        });
    };


    /**
     * Switch state to given one
     * @param {sm.lSearch.bSearchResults.View.State} state
     * @private
     */
    View.prototype.switchState_ = function(state) {
        this.removeOldState_();
        this.setState_();
    };


    /**
     * Set given state
     * @param {sm.lSearch.bSearchResults.View.State} state
     * @private
     */
    View.prototype.setState_ = function(state) {
        this.state_ = state;
        var cssClass;

        switch (state) {
            case View.State.DEFAULT:
                cssClass = View.CssClass.DEFAULT;
                break;

            case View.State.SEARCH_IN_PROGRESS:
                cssClass = View.CssClass.SEARCH_IN_PROGRESS;
                break;

            case View.State.SORT_IN_PROGRESS:
                cssClass = View.CssClass.SORT_IN_PROGRESS;
                break;

            case View.State.EMPTY_RESULTS:
                cssClass = View.CssClass.EMPTY_RESULTS;
                break;
        }

        goog.dom.classlist.add(
            this.getElement(),
            cssClass
        );
    };

    /**
     * Remove state css class from dom element
     * @private
     */
    View.prototype.removeOldState_ = function() {
        var stateCssClasses = [
            View.CssClass.SEARCH_IN_PROGRESS,
            View.CssClass.SORT_IN_PROGRESS,
            View.CssClass.EMPTY_RESULTS,
            View.CssClass.DEFAULT
        ];
         goog.dom.classlist.removeAll(
             this.getElement(),
             stateCssClasses
         );
    };


    /**
     * Init dom elements
     * @return {sm.lSearch.bSearchResults.View}
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            header: this.getElementByClass(View.CssClass.HEADER),
            sort: this.getElementByClass(View.CssClass.SORT),
            itemList: this.getElementByClass(View.CssClass.ITEM_LIST),
            showMore: this.getElementByClass(View.CssClass.SHOW_MORE_BUTTON),
            loader: this.getElementByClass(View.CssClass.LOADER)
        };

        return this;
    };


    /**
     * Init current state
     * @return {sm.lSearch.bSearchResults.View}
     * @private
     */
    View.prototype.initState_ = function() {
        var isEmptyResultsState = goog.dom.classlist.has(
            this.getElement(),
            View.CssClass.EMPTY_RESULTS
        );

        if (isEmptyResultsState) {
            this.state_ = View.State.EMPTY_RESULTS;
        } else {
            this.state_ = View.State.DEFAULT;
        }

        return this;
    };
});  // goog.scope
