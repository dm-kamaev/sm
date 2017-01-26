goog.provide('sm.bSmItem.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.dom.classes');



/**
 * Item View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItem.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItem.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);
};
goog.inherits(sm.bSmItem.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmItem.View;


    /**
     * @typedef {{
     *     data: {
     *         id: number,
     *         type: string,
     *         name: {
     *             light: string,
     *             bold: ?string
     *         },
     *         alias: ?string,
     *         score: sm.bSmScore.SmScore.RenderParams,
     *         description: (string|undefined),
     *         metro: sm.bSmBadge.Badge.RenderParams,
     *         area: sm.bSmBadge.Badge.RenderParams,
     *         category: string
     *     },
     *     config: {
     *         enableCover: boolean
     *     }
     * }}
     */
    sm.bSmItem.View.RenderParams;


    /**
     * @typedef {{
     *     id: number,
     *     name: string,
     *     type: string,
     *     category: string
     * }}
     */
    sm.bSmItem.View.DataParams;


    /**
     * Css class enum
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-item',
        COVER_IMAGE: 'b-sm-item__cover-image',
        NAME_LINK: 'b-sm-item__link-name'
    };


    /**
     * Event enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLICK: goog.events.getUniqueId('click')
    };


    /**
     * @param {Element} element
     * @override
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom();
    };


    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string|number|Object)>} rawParams
     * @return {sm.bSmItem.View.RenderParams}
     * @public
     */
    View.getRenderParams = function(rawParams) {
        var metroParams = rawParams['metro'] ?
            sm.bSmBadge.SmBadge.getRenderParams(rawParams['metro']) :
            {};
        var areaParams = rawParams['area'] ?
            sm.bSmBadge.SmBadge.getRenderParams(rawParams['area']) :
            {};
        var name = rawParams['name'] || {};

        return {
            data: {
                id: rawParams['id'],
                type: rawParams['type'],
                imageUrl: rawParams['imageUrl'],
                name: {
                    light: name['light'],
                    bold: name['bold']
                },
                alias: rawParams['alias'],
                score: rawParams['score'],
                description: rawParams['description'],
                metro: metroParams.data,
                area: areaParams.data,
                category: rawParams['category'],
                url: rawParams['url']
            },
            config: {
                enableCover: rawParams['enableCover']
            }
        };
    };


    /**
     * Getter for params
     * @return {sm.bSmItem.View.DataParams}
     * @override
     * @public
     */
    View.prototype.getParams = function() {
        if (!this.params || goog.object.isEmpty(this.params)) {
            var elem = this.getElement(),
                data = elem && elem.getAttribute('data-params');
            if (data) {
                this.params = this.transformParams(JSON.parse(data));
            }
        }

        return this.params;
    };


    /**
     * @override
     * @protected
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initLinkElementsListeners();
    };


    /**
     * Initializes listeners for root Element
     * @protected
     */
    View.prototype.initLinkElementsListeners = function() {
        this.getHandler().listen(
            this.dom.nameLink,
            goog.events.EventType.CLICK,
            this.onClick
        );

        if (this.dom.coverImage) {
            this.getHandler().listen(
                this.dom.coverImage,
                goog.events.EventType.CLICK,
                this.onClick
            );
        }
    };


    /**
     * Handler click on root Element
     * @param {goog.events.Event} event
     * @protected
     */
    View.prototype.onClick = function(event) {
        if (!event.defaultPrevented) {
            this.dispatchEvent(View.Event.CLICK);
        }
    };


    /**
     * Transform params to compressed ones
     * @param {Object<string>} rawParams
     * @return {sm.bSmItem.View.DataParams}
     * @protected
     */
    View.prototype.transformParams = function(rawParams) {
        return {
            id: rawParams['id'],
            name: rawParams['name'],
            category: rawParams['category']
        };
    };


    /**
     * Initializes dom elements
     * @protected
     */
    View.prototype.initDom = function() {
        this.dom = {
            coverImage: this.getElementByClass(
                View.CssClass.COVER_IMAGE
            ),
            nameLink: this.getElementByClass(
                View.CssClass.NAME_LINK
            )
        };
    };
});  // goog.scope
