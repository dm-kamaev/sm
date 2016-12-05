goog.provide('sm.bSmBalloon.View');

goog.require('cl.iControl.View');
goog.require('goog.array');
goog.require('goog.dom.dataset');
goog.require('sm.bSmItem.View');
goog.require('sm.bSmLink.View');



goog.scope(function() {
    var Link = sm.bSmLink.View,
        Item = sm.bSmItem.View;



    /**
     * View for Ymaps ballon content template block
     * @param {Object=} opt_params
     * @param {string=} opt_type
     * @param {String=} opt_modifier
     * @constructor
     * @extends {cl.iControl.View}
     */
     sm.bSmBalloon.View = function(opt_params, opt_type, opt_modifier) {
         sm.bSmBalloon.View.base(
            this, 'constructor', opt_params, opt_type, opt_modifier
        );
    };
    goog.inherits(sm.bSmBalloon.View, cl.iControl.View);
    var View = sm.bSmBalloon.View;


    /**
     * List of CSS classes
     * @enum {string}
     * @const
     */
    View.CssClass = {
        ROOT: 'b-sm-balloon',
        CLOSE_BUTTON: 'b-sm-balloon__close-wrap',
        ITEM_LIST: 'b-sm-balloon__item-list',
        DESCRIPTION_LINK: 'b-sm-balloon__description-link'
    };


    /**
     * Possible events enum
     * @enum {string}
     * @const
     */
    View.Event = {
        CLOSE_BUTTON_CLICK: goog.events.getUniqueId('close-button-click'),
        TITLE_LINK_CLICK: goog.events.getUniqueId('title-link-click')
    };


    /**
     * @typedef {{
     *     data: {
     *         title: {
     *             id: number,
     *             text: string,
     *             url: ?string
     *         },
     *         subtitle: string,
     *         items: Array<{
     *             id: number,
     *             content: string,
     *             url: ?string
     *         }>,
     *         description: string
     *     }
     * }}
     */
    sm.bSmBalloon.View.RenderParams;



    /**
     * Transform raw params to compressed ones
     * @param {Object<string, (string, number, Array)>} rawParams
     * @return {sm.bSmBalloon.View.RenderParams}
     */
    View.getRenderParams = function(rawParams) {
        var header = rawParams['header'],
            description = rawParams['description'],
            content = rawParams['content'],
            footer = rawParams['footer'],
            res = {};

        if (header) {
            res.header = {
                title: header['title'] || null,
                description: header['description'] || null
            };
        }
        if (description) {
            res.description = {
                text: description['text'] || null
            };

            if (description['link']) {
                res.description.link = {
                    text: description['link']['text'] || null,
                    url: description['link']['url'] || null
                };
            }
        }
        if (content) {
            res.content = {
                title: content['title'] || null
            };

            res.content.items =
                content['items'] ?
                goog.array.map(content['items'], function(rawLinkParams) {
                        return Item.getRenderParams(rawLinkParams).data;
                }) : null;
        }
        if (footer) {
            res.footer = {
                title: footer['title'] || null
            };
        }
        return {
            data: res
        };
    };


    /**
     * Transform raw params items to compressed ones
     * @param {Array<Object>} rawParamsItems
     * @return {sm.bSmLink.SmLink.RenderParams}
     */
    View.getItemsRenderParams = function(rawParamsItems) {
        var params = [];

        if (rawParamsItems) {
            params = goog.array.map(rawParamsItems,
                function(rawLinkParams) {
                    return Link.getRenderParams(rawLinkParams).data;
                }
            );
        }
        return params;
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initDom_();
    };


    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        View.base(this, 'enterDocument');

        this.initListeners_();
    };


    /**
     * Init listeners for dom elements
     * @private
     */
    View.prototype.initListeners_ = function() {
        var handler = this.getHandler();
        var dom = this.getDom();

        handler.listen(
            dom.closeButton,
            goog.events.EventType.CLICK,
            this.onCloseButtonClick_
        );
    };


    /**
     * Close button click handler
     * @private
     */
    View.prototype.onCloseButtonClick_ = function() {
        this.dispatchEvent(View.Event.CLOSE_BUTTON_CLICK);
    };


    /**
     * Title click handler
     * @private
     */
    View.prototype.onTitleLinkClick_ = function() {
        this.dispatchEvent(View.Event.TITLE_LINK_CLICK);
    };


    /**
     * Init dom elements
     * @private
     */
    View.prototype.initDom_ = function() {
        this.dom = {
            closeButton: this.getElementByClass(
                View.CssClass.CLOSE_BUTTON
            ),
            itemList: this.getElementByClass(
                View.CssClass.ITEM_LIST
            ),
            descriptionLink: this.getElementByClass(
                View.CssClass.DESCRIPTION_LINK
            )
        };
    };
});  // goog.scope
