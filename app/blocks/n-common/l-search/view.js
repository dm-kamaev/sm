goog.provide('sm.lSearch.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('sm.iLayout.ViewStendhal');
goog.require('sm.lSearch.Template');


goog.scope(function() {



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
        RESULTS_LIST_HEADER: 'l-search__list-header',
        RESULTS_LIST: 'l-search__results-list',
        LOADER: 'l-search__loader',
        SHOW_MORE_BUTTON: 'l-search__show-more-button',
        SHOW_MORE_BUTTON_WRAP: 'l-search__show-more-button-wrap',
        SEARCH: 'l-search__search-field'
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
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);
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
                resultsListHeaders: this.getElementsByClass(
                    View.CssClass.RESULTS_LIST_HEADER
                ),
                resultsList: this.getElementByClass(
                    View.CssClass.RESULTS_LIST
                ),
                sectionMap: this.getElementByClass(
                    View.CssClass.SECTION_MAP
                ),
                map: this.getElementByClass(
                    sm.bSmMap.View.CssClass.ROOT
                ),
                loader: this.getElementByClass(
                    View.CssClass.LOADER
                ),
                showMoreButton: this.getElementByClass(
                    View.CssClass.SHOW_MORE_BUTTON
                ),
                showMoreButtonWrap: this.getElementByClass(
                    View.CssClass.SHOW_MORE_BUTTON_WRAP
                )
            }
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
            declensionEntityType: {
                nom: rawParams['declensionEntityType']['nom'],
                gen: rawParams['declensionEntityType']['gen'],
                plu: rawParams['declensionEntityType']['plu']
            },
            countResults: rawParams['countResults']
        });

        return params;
    };
});  // goog.scope
