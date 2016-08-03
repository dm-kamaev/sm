goog.provide('sm.bSmItem.ViewEntity');

goog.require('sm.bBadge.Badge');
goog.require('sm.bSmItem.View');



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
     *         isFavorite: ?boolean,
     *         position: (number|undefined)
     *     },
     *     config: {
     *         stylizationModifier: (string|undefined)
     *     }
     * }}
     */
    sm.bSmItem.TemplateEntity.Params;


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
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-item_entity',
        DETAILS_SECTION: 'b-sm-item_entity__section_details'
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_(element);
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initDetailsListeners_();
    };


    /**
     * Initializes listeners for details section
     * @private
     */
    View.prototype.initDetailsListeners_ = function() {
        this.getHandler().listen(
            this.dom.detailsSection,
            goog.events.EventType.CLICK,
            this.onDetailsSectionClick_
        );
    };


    /**
     * Click on details section
     * @param {Object} event
     * @private
     */
    View.prototype.onDetailsSectionClick_ = function(event) {
        event.preventDefault();
    };


    /**
     * Initializes dom elements
     * @param {Element} element
     * @private
     */
    View.prototype.initDom_ = function(element) {
        this.dom = {
            score: this.getElementByClass(
                sm.bSmScore.ViewBrief.View.CssClass.ROOT,
                element
            ),
            detailsSection: this.getElementByClass(
                View.CssClass.DETAILS_SECTION,
                element
            ),
            badges: this.getElementsByClass(
                sm.bBadge.Badge.CssClass.ROOT,
                element
            ),
            favoriteLink: this.getElementByClass(
                sm.bFavoriteLink.View.CssClass.ROOT,
                element
            )
        };
    };
});  // goog.scope
