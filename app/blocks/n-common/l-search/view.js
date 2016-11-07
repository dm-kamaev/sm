goog.provide('sm.lSearch.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('sm.iAnimate.Animate');
goog.require('sm.iLayout.ViewStendhal');
goog.require('sm.lSearch.Template');


goog.scope(function() {
    var Animate = sm.iAnimate.Animate;



    /**
     * Search View
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {string=} opt_modifier
     * @constructor
     * @extends {sm.iLayout.ViewStendhal}
     */
    sm.lSearch.View = function(opt_params, opt_type, opt_modifier) {
        sm.lSearch.View.base(this, 'constructor', opt_params,
            opt_type, opt_modifier);


            /**
             * @type {sm.lSearch.View.Params}
             * @protected
             */
            this.params = null;
    };
    goog.inherits(sm.lSearch.View, sm.iLayout.ViewStendhal);
    var View = sm.lSearch.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'l-search',
        SECTION_MAP: 'l-search__section_map',
        SECTION_HIDDEN: 'l-search__section_hidden',
        SORT: 'l-search__sort',
        SEARCH_RESULTS: 'l-search__search-results',
        SEARCH: 'l-search__search-field',
        ANIMATION_ON: 'l-search_animation_on',
        ANIMATION_OFF: 'l-search_animation_off',
        RESULTS_LIST_WRAP_HIDDEN: 'l-search__list-results_hidden',
        RESULTS_LIST_WRAP_SHOWED: 'l-search__list-results_showed',
        RESULTS_LIST_HIDDEN: 'l-search__results-list_hidden',
        RESULTS_LIST_SHOWED: 'l-search__results-list_showed',
        LOADER_SHOWED: 'l-search__loader_showed',
        LOADER_HIDDEN: 'l-search__loader_hidden'
    };


    /**
     * Data parameters from dom element. Please note, that field 'searchParams'
     * is uncompressed by closure compiler, as this parameters sends to backend
     * and forms from filters.
     * @typedef {{
     *     searchParams: Object<string, (number|string)>,
     *     isUserAuthorzed: boolean,
     *     authSocialLinks:  {
     *             vk: (string|undefined),
     *             fb: (string|undefined)
     *     },
     *     declensionEntityType: {
     *         nom: string,
     *         gen: string,
     *         plu: string
     *     },
     *     type: string
     * }}
     */
    sm.lSearch.View.Params;


    /**
     * @param {Element} element
     * @protected
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.detectAnimationSupportion_();
    };


    /**
     * Show or hide map section
     * @param {boolean} visibility
     */
    View.prototype.setSectionMapVisibility = function(visibility) {
        visibility ?
            goog.dom.classlist.remove(
                this.dom.sectionMap,
                View.CssClass.SECTION_HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.sectionMap,
                View.CssClass.SECTION_HIDDEN
            );
    };


    /**
     * Show or hide sorter
     * @param {boolean} visibility
     */
    View.prototype.setSortVisibility = function(visibility) {
        visibility ?
            goog.dom.classlist.remove(
                this.dom.sectionSort,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.sectionSort,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Show or hide loader
     * @param {boolean} visibility
     */
    View.prototype.setLoaderVisibility = function(visibility) {
        visibility ?
            goog.dom.classlist.remove(
                this.dom.loader,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.loader,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Show or hide show more button
     * @param {boolean} visibility
     */
    View.prototype.setShowMoreButtonVisibility = function(visibility) {
        visibility ?
            goog.dom.classlist.remove(
                this.dom.showMoreButtonWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            ) :
            goog.dom.classlist.add(
                this.dom.showMoreButtonWrap,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
    };


    /**
     * Update headers size s and l for results list
     * @param {number} countResults
     * @param {string} searchText
     */
    View.prototype.updateListHeader = function(countResults,
        searchText) {

        var headers = this.dom.resultsListHeaders;

        for (var i = 0; i < headers.length; i++) {
            goog.soy.renderElement(
                headers[i],
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
        }
    };


    /**
     * Init dom elements
     * @protected
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(
            this.dom,
            {
                sectionSort: this.getElementByClass(
                    View.CssClass.SORT
                ),
                sort: this.getElementByClass(
                    sm.gDropdown.ViewSelect.CssClass.ROOT
                ),
                search: this.getElementByClass(
                    View.CssClass.SEARCH
                ),
                filterPanel: this.getElementByClass(
                    sm.lSearch.bFilterPanel.View.CssClass.ROOT
                ),
                sectionMap: this.getElementByClass(
                    View.CssClass.SECTION_MAP
                ),
                map: this.getElementByClass(
                    sm.bSmMap.View.CssClass.ROOT
                ),
                searchResults: this.getElementByClass(
                    View.CssClass.SEARCH_RESULTS
                )
            }
        );
    };


    /**
     * Hide results list
     * @public
     */
    View.prototype.hideResultsListWrap = function() {
        goog.dom.classlist.remove(
            this.dom.resultsListWrap,
            View.CssClass.RESULTS_LIST_WRAP_SHOWED
        );
        goog.dom.classlist.add(
            this.dom.resultsListWrap,
            View.CssClass.RESULTS_LIST_WRAP_HIDDEN
        );

        this.getHandler().listenOnce(
            this.dom.resultsListWrap,
            goog.events.EventType.ANIMATIONEND,
            this.onResultListWrapAnimationEnd_
        );
    };

    /**
     * Hide results list, show-hide loader, show results list with new results
     * @public
     */
    View.prototype.hideResultsList = function() {
        goog.dom.classlist.remove(
            this.dom.resultsList,
            View.CssClass.RESULTS_LIST_SHOWED
        );
        goog.dom.classlist.add(
            this.dom.resultsList,
            View.CssClass.RESULTS_LIST_HIDDEN
        );

        this.getHandler().listenOnce(
            this.dom.resultsListWrap,
            goog.events.EventType.ANIMATIONEND,
            this.onResultListAnimationEnd_
        );
    };


    /**
     * Transform raw params from dom element to sm.lSearch.View.Params
     * @param  {Object} rawParams
     * @return {sm.lSearch.View.Params}
     * @protected
     * @override
     */
    View.prototype.transformParams = function(rawParams) {
        var params = View.base(this, 'transformParams', rawParams);

        goog.object.extend(params, {
            searchParams: rawParams['searchParams'],
            countResults: rawParams['countResults']
        });

        return params;
    };


    /**
     * Result list animation end event handler
     * @private
     */
    View.prototype.onLoaderAnimationEnd_ = function() {
        goog.dom.classlist.swap(
            this.dom.loader,
            View.CssClass.LOADER_SHOWED,
            View.CssClass.LOADER_HIDDEN
        );

        if (goog.dom.classlist.contains(
            this.dom.resultsListWrap,
            View.CssClass.RESULTS_LIST_WRAP_HIDDEN
        )) {
            goog.dom.classlist.swap(
                this.dom.resultsListWrap,
                View.CssClass.RESULTS_LIST_WRAP_HIDDEN,
                View.CssClass.RESULTS_LIST_WRAP_SHOWED
            );

            goog.style.setStyle(
                this.dom.resultsListWrap,
                'display',
                'block'
            );
        }

        if (goog.dom.classlist.contains(
            this.dom.resultsList,
            View.CssClass.RESULTS_LIST_HIDDEN
        )) {
            goog.dom.classlist.swap(
                this.dom.resultsList,
                View.CssClass.RESULTS_LIST_HIDDEN,
                View.CssClass.RESULTS_LIST_SHOWED
            );

            goog.style.setStyle(
                this.dom.resultsList,
                'display',
                'block'
            );
        }
    };


    /**
     * Result list animation end event handler
     * @private
     */
    View.prototype.onResultListWrapAnimationEnd_ = function() {
        if (goog.dom.classlist.contains(
            this.dom.resultsListWrap,
            View.CssClass.RESULTS_LIST_WRAP_HIDDEN
        )) {
            goog.dom.classlist.swap(
                this.dom.loader,
                View.CssClass.LOADER_HIDDEN,
                View.CssClass.LOADER_SHOWED
            );
            goog.style.setStyle(
                this.dom.resultsListWrap,
                'display',
                'none'
            );
            this.getHandler().listenOnce(
                this.dom.loader,
                goog.events.EventType.ANIMATIONEND,
                this.onLoaderAnimationEnd_
            );
        }
    };


    /**
     * Result list animation end event handler
     * @private
     */
    View.prototype.onResultListAnimationEnd_ = function() {
        if (goog.dom.classlist.contains(
            this.dom.resultsList,
            View.CssClass.RESULTS_LIST_HIDDEN
        )) {
            goog.dom.classlist.swap(
                this.dom.loader,
                View.CssClass.LOADER_HIDDEN,
                View.CssClass.LOADER_SHOWED
            );
            goog.style.setStyle(
                this.dom.resultsList,
                'display',
                'none'
            );
            this.getHandler().listenOnce(
                this.dom.loader,
                goog.events.EventType.ANIMATIONEND,
                this.onLoaderAnimationEnd_
            );
        }
    };


    /**
     * Detect animation support and add correspnding css class to element
     * @return {sm.lSearch.View}
     * @private
     */
    View.prototype.detectAnimationSupportion_ = function() {
        var animateCssClass = Animate.isSupported() ?
            View.CssClass.ANIMATION_ON :
            View.CssClass.ANIMATION_OFF;

        goog.dom.classlist.add(
            this.getElement(),
            animateCssClass
        );

        return this;
    };
});  // goog.scope
