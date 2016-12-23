goog.provide('sm.bSmItem.ViewEntity');

goog.require('cl.iUtils.Utils');
goog.require('goog.object');
goog.require('sm.bSmItem.View');
goog.require('sm.bSmScore.SmScoreBrief');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sm.bSmItem.View}
 */
sm.bSmItem.ViewEntity = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.ViewEntity.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /**
     * Parameters
     * @type {sm.bSmItem.TemplateEntity.Params}
     * @protected
     */
    this.params = opt_params || {};
};
goog.inherits(sm.bSmItem.ViewEntity, sm.bSmItem.View);


goog.scope(function() {
    var View = sm.bSmItem.ViewEntity;


    /**
     * @typedef {{
     *     data: {
     *         id: ?number,
     *         type: string,
     *         name: {
     *             light: string,
     *             bold: ?string
     *         },
     *         alias: ?string,
     *         score: ?sm.bSmScore.Template.Params.Data,
     *         description: (string|undefined),
     *         metro: ?Array<{
     *             id: number,
     *             name: string
     *         }>,
     *         area: ?Array<{
     *             id: number,
     *             name: string
     *         }>,
     *         online: ('only'|available'|undefidned),
     *         isFavorite: ?boolean,
     *         countDepartment: ?number,
     *         position: (number|undefined)
     *     },
     *     config: {
     *         stylizationModifier: string
     *     }
     * }}
     */
    sm.bSmItem.ViewEntity.RenderParams;


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.SmItemEntity.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        var params = sm.bSmItem.View.getRenderParams(rawParams);
        var score = rawParams['score'] ?
            sm.bSmScore.SmScoreBrief.getRenderParams(rawParams['score']) :
            {};
        goog.object.extend(params.data, {
            cost: rawParams['cost'],
            score: score,
            brand: rawParams['brand'],
            online: rawParams['online'],
            isFavorite: rawParams['isFavorite'],
            countDepartment: rawParams['countDepartment'],
            position: rawParams['position']
        });

        return params;
    };


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-item_entity',
        DETAILS_SECTION: 'b-sm-item__section_details',
        SCORE_WRAP: 'b-sm-item__score',
        COST_SIZE_L: 'b-sm-item__cost_size_l'
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');
    };


    /**
     * adds or deletes class to show cost size l
     * @param {bool} visible
     */
    View.prototype.setCostVisibility = function(visible) {
        if (this.dom.costSizeL) {
            visible ?
                goog.dom.classlist.remove(
                    this.dom.costSizeL,
                    cl.iUtils.Utils.CssClass.HIDDEN
                ) :
                goog.dom.classlist.add(
                    this.dom.costSizeL,
                    cl.iUtils.Utils.CssClass.HIDDEN
                );
        }
    };


    /**
     * Initializes dom elements
     * @protected
     * @override
     */
    View.prototype.initDom = function() {
        View.base(this, 'initDom');

        goog.object.extend(this.dom, {
            score: this.getElementByClass(
                sm.bSmScore.ViewBrief.CssClass.ROOT
            ),
            badges: this.getElementsByClass(
                sm.bSmBadge.View.CssClass.ROOT
            ),
            favoriteLink: this.getElementByClass(
                sm.bFavoriteLink.View.CssClass.ROOT
            ),
            costSizeL: this.getElementByClass(
                View.CssClass.COST_SIZE_L
            )
        });
    };
});  // goog.scope
