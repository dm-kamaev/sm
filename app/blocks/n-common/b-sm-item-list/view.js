goog.provide('sm.bSmItemList.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
goog.require('goog.array');
goog.require('goog.dom.classes');



/**
 * Items List View
 * @param {Object=} opt_params
 * @param {string=} opt_type
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sm.bSmItemList.View = function(opt_params, opt_type, opt_modifier) {
    sm.bSmItemList.View.base(this, 'constructor', opt_params,
        opt_type, opt_modifier);

    /**
     * @type {{
     *     itemType: (smItem|smItemEntity),
     *     countItemsPerPage: (number|undefined),
     *     pageNumber: (number|undefined)
     * }}
     * @protected
     */
    this.params = opt_params || {};
};
goog.inherits(sm.bSmItemList.View, cl.iControl.View);


goog.scope(function() {
    var View = sm.bSmItemList.View;


    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-sm-item-list',
        LIST: 'b-sm-item-list__list',
        ITEM: 'b-sm-item-list__item',
        ITEM_WRAP: 'b-sm-item-list__item-wrap'
    };


    /**
     * @typedef {{
     *     itemType: string,
     *     itemConfig: (sm.bSmItem.Template.Params.Config|
     *         sm.bSmItem.TemplateEntity.Params.Config|
     *         sm.bSmLink.Template.Params.Config|
     *         undefined
     *     ),
     *     countItemsPerPage: number
     * }}
     */
    View.Params;


    /**
     * Insert item on index (Dom Element)
     * @param {Object} data
     * @param {Object} config
     * @param {number=} opt_index
     * @public
     */
    View.prototype.addItem = function(data, config, opt_index) {
        var item = this.renderItem_(data, config);

        goog.dom.insertChildAt(
            this.dom.list,
            item,
            opt_index
        );
    };


    /**
     * Remove item (Dom Element)
     * @param {Element} item
     * @public
     */
    View.prototype.removeItem = function(item) {
        var itemWrapper = goog.dom.getAncestorByClass(
            item,
            sm.bSmItemList.View.CssClass.ITEM_WRAP
        );

        goog.dom.removeNode(
            itemWrapper
        );
    };


    /**
     * Remove all items dom elements
     * @public
     */
    View.prototype.removeAllItems = function() {
        goog.array.forEach(this.dom.itemWrappers, function(itemWrapper) {
            goog.dom.removeNode(itemWrapper);
        });
    };


    /**
     * Set page (show amount items = countItemsPerPage)
     * @param {number} pageNumber
     * @public
     */
    View.prototype.setPage = function(pageNumber) {

        this.hideItems_(0, this.dom.itemWrappers.length);

        var start = (pageNumber - 1) * this.params.countItemsPerPage,
            end = start + this.params.countItemsPerPage;

        this.showItems_(start, end);
    };


    /**
     * Initializes items (Dom elements)
     * @param {Element=} opt_element
     * @public
     */
    View.prototype.initItems = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.items = this.getElementsByClass(
            sm.bSmItemList.View.CssClass.ITEM,
            element
        );

        this.dom.itemWrappers = this.getElementsByClass(
            sm.bSmItemList.View.CssClass.ITEM_WRAP,
            element
        );
    };


    /**
     * @override
     * @param {Element} element
     * @protected
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initList_(element);
        this.initParams_();
    };


    /**
     * Show items (from start to end)
     * @param {number} start
     * @param {number} end
     * @private
     */
    View.prototype.showItems_ = function(start, end) {
        for (var i = start, itemWrapper; i < end; i++) {
            itemWrapper = this.dom.itemWrappers[i];

            if (itemWrapper) {
                this.show_(itemWrapper);
            }
        }
    };


    /**
     * Hide items (from start to end)
     * @param {number} start
     * @param {number} end
     * @private
     */
    View.prototype.hideItems_ = function(start, end) {
        for (var i = start, itemWrapper; i < end; i++) {
            itemWrapper = this.dom.itemWrappers[i];

            if (itemWrapper) {
                this.hide_(itemWrapper);
            }
        }
    };


    /**
     * Hide shown Dom Element
     * @param {Element} element
     * @private
     */
    View.prototype.hide_ = function(element) {
        var isShown = this.isShown_(element);

        if (isShown) {
            goog.dom.classlist.add(
                element,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Show hidden Dom Element
     * @param {Element} element
     * @private
     */
    View.prototype.show_ = function(element) {
        var isHidden = !this.isShown_(element);

        if (isHidden) {
            goog.dom.classlist.remove(
                element,
                cl.iUtils.Utils.CssClass.HIDDEN
            );
        }
    };


    /**
     * Check contains an element of class HIDDEN or not
     * @param {Element} element
     * @return {boolean}
     * @private
     */
    View.prototype.isShown_ = function(element) {
        return !goog.dom.classlist.contains(
            element,
            cl.iUtils.Utils.CssClass.HIDDEN
        );
    };


    /**
     * Render Item
     * @param {Object} data
     * @param {Object} config
     * @return {Element}
     * @private
     */
    View.prototype.renderItem_ = function(data, config) {
        return goog.soy.renderAsElement(
            sm.bSmItemList.Template.item, {
                params: {
                    data: {
                        item: data,
                        itemConfig: config
                    },
                    config: {
                        type: this.params.itemType
                    }
                }
            },
            {
                factoryIndex: this.getFactory().getIndex()
            }
        );
    };


    /**
     * Initializes list (Wrapper for items)
     * @param {Element=} opt_element
     * @private
     */
    View.prototype.initList_ = function(opt_element) {
        var element = opt_element || this.getElement();

        this.dom.list = this.getElementByClass(
            sm.bSmItemList.View.CssClass.LIST,
            element
        );
    };


    /**
     * Initializes params from attributes data-params
     * @private
     */
    View.prototype.initParams_ = function() {
        var rawParams = this.getRawDataParams_();

        this.params = this.transformParams_(rawParams);

        if (this.params.countItemsPerPage) {
            this.params.pageNumber = 1;
        }
    };


    /**
     * Return raw data params from dom element
     * @return {Object}
     * @private
     */
    View.prototype.getRawDataParams_ = function() {
        return JSON.parse(
            goog.dom.dataset.get(
                this.getElement(),
                'params'
            )
        );
    };


    /**
     * Transform raw params object to compiled one
     * Item config stay in uncompressed state as in view we dont know
     * about transformation function for it
     * @param  {Object} rawParams
     * @return {sm.bSmItemList.View.Params}
     * @private
     */
    View.prototype.transformParams_ = function(rawParams) {
        return {
            itemType: rawParams['itemType'],
            countItemsPerPage: rawParams['countItemsPerPage'],
            itemConfig: rawParams['itemConfig']
        };
    };
});  // goog.scope
