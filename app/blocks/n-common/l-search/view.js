goog.provide('sm.lSearch.View');

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
        RESULTS_LIST_HEADER: 'l-search__list-header',
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
        this.initDom_(element);

        this.initParams_();
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

        var headers = this.dom.headersResults;

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
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            sort: this.getElementByClass(
                sm.gDropdown.ViewSelect.CssClass.ROOT,
                element
            ),
            headersResults: this.getElementsByClass(
                View.CssClass.RESULTS_LIST_HEADER,
                element
            ),
            search: this.getElementByClass(
                View.CssClass.SEARCH,
                element
            ),
            filterPanel: this.getElementByClass(
                sm.lSearch.bFilterPanel.View.CssClass.ROOT,
                element
            ),
            resultsList: this.getElementByClass(
                sm.bSmItemList.View.CssClass.ROOT,
                element
            ),
            map: this.getElementByClass(
                sm.bSmMap.View.CssClass.ROOT,
                element
            ),
            loader: this.getElementByClass(
                View.CssClass.LOADER,
                element
            ),
            showMoreButton: this.getElementByClass(
                View.CssClass.SHOW_MORE_BUTTON,
                element
            ),
            showMoreButtonWrap: this.getElementByClass(
                View.CssClass.SHOW_MORE_BUTTON_WRAP,
                element
            )
        };
    };


    /**
     * Init params from dom element
     * @private
     */
    View.prototype.initParams_ = function() {
        var rawParams = this.getRawDataParams_();
        this.params = this.transformParams_(rawParams);
    };


    /**
     * Return raw data-params from dom element
     * @return {Object}
     * @private
     */
    View.prototype.getRawDataParams_ = function() {
        var dataParams = goog.dom.dataset.get(
            this.getElement(),
            'params'
        );

        return JSON.parse(dataParams);
    };


    /**
     * Transform raw params from dom element to sm.lSearch.View.Params
     * @param  {Object} rawParams
     * @return {sm.lSearch.View.Params}
     * @private
     */
    View.prototype.transformParams_ = function(rawParams) {
        return {
            searchParams: rawParams['searchParams'],
            isUserAuthorzed: rawParams['isUserAuthorzed'],
            authSocialLinks: {
                vk: rawParams['authSocialLinks']['vk'],
                fb: rawParams['authSocialLinks']['fb']
            },
            declensionEntityType: {
                nom: rawParams['declensionEntityType']['nom'],
                gen: rawParams['declensionEntityType']['gen'],
                plu: rawParams['declensionEntityType']['plu']
            },
            type: rawParams['type']
        };
    };
});  // goog.scope
