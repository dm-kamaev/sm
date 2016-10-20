goog.provide('sm.gList.ViewStendhal');

goog.require('cl.gList.ListMode');
goog.require('cl.gList.View');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.object');



/**
 * List Stendhal view
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gList.View}
 */
sm.gList.ViewStendhal = function(opt_params, opt_template, opt_domHelper) {
    sm.gList.ViewStendhal.base(
        this, 'constructor', opt_params, opt_template, opt_domHelper
    );
};
goog.inherits(sm.gList.ViewStendhal, cl.gList.View);


goog.scope(function() {
    var View = sm.gList.ViewStendhal,
        ListMode = cl.gList.ListMode;


    /** @const */
    View.DEFAULT_MODE = ListMode.SELECTION;

    /** @const */
    View.DEFAULT_MAX_SELECTION = null;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-list_stendhal',
        ITEM: 'g-list__item',
        ITEM_SELECTED: 'g-list__item_selected',
        ITEM_DISABLED: 'g-list__item_disabled'
    };


    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        ITEM_SELECT: cl.gList.View.Event.ITEM_SELECT,
        ITEM_CLICK: cl.gList.View.Event.ITEM_CLICK
    };


    /**
     * Resolve params from multiple sources
     * @param {Element} element
     */
    View.prototype.resolveParams = function(element) {
        var params = {
            config: {
                mode: ListMode.DEFAULT_MODE,
                maxSelection: ListMode.DEFAULT_MAX_SELECTION
            }
        };

        var dataParams = goog.json.parse(
            goog.dom.dataset.get(element, 'params') || '{}'
        );

        var transformedParams = this.transformParams(dataParams);

        goog.object.extend(params, transformedParams, this.params || {});
        this.params = params;
    };


    /**
     * Transform raw params from dom element
     * @param {Object} rawParams
     * @return {Object}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            data: {
                items: rawParams['data']['items'].map(function(item) {
                    return {
                        label: item['label'],
                        val: item['val'],
                        url: item['url']
                    };
                }),
                isSelected: rawParams['data']['isSelected'],
                isDisabled: rawParams['data']['isDisabled']
            },
            config: {
                mode: rawParams['config']['mode'],
                maxSelection: rawParams['config']['maxSelection']
            }
        };
    };
});  // goog.scope
