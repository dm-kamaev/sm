goog.provide('sm.lSearch.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classlist');
goog.require('goog.style');
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
        SEARCH_RESULTS: 'l-search__search-results',
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
     * Show or hide map section
     * @param {boolean} visibility
     * @public
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
     * Init dom elements
     * @protected
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(
            this.dom,
            {
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
     * Transform raw params from dom element to sm.lSearch.View.Params
     * @param  {Object} rawParams
     * @return {sm.lSearch.View.Params}
     * @protected
     * @override
     */
    View.prototype.transformParams = function(rawParams) {
        var params = View.base(this, 'transformParams', rawParams);

        goog.object.extend(params, {
            searchParams: rawParams['searchParams']
        });

        return params;
    };
});  // goog.scope
