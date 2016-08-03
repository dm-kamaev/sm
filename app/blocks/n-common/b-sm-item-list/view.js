goog.provide('sm.bSmItemList.View');

goog.require('cl.iControl.View');

goog.require('cl.iUtils.Utils');
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
     * Parameters
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
        ITEM_CONTAINER: 'b-sm-item-list__item'
    };


    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        View.base(this, 'decorateInternal', element);

        this.initList_(element);
        this.initParams_();
    };


    /**
     * Insert item on index (Dom Element)
     * @param {Object} data
     * @param {number} index
     */
    View.prototype.addItem = function(data, index) {
        var item = this.renderItem_(data);

        goog.dom.insertChildAt(
            this.dom.list,
            item,
            index
        );
    };


    /**
     * Remove item (Dom Element)
     * @param {Element} item
     */
    View.prototype.removeItem = function(item) {
        var itemContainer = goog.dom.getAncestorByClass(
            item,
            sm.bSmItemList.View.CssClass.ITEM_CONTAINER
        );

        goog.dom.removeNode(
            itemContainer
        );
    };


    /**
     * Set page (show amount items = countItemsPerPage)
     * @param {number} pageNumber
     */
    View.prototype.setPage = function(pageNumber) {

        this.hideItems_(0, this.dom.itemContainers.length);

        var start = (pageNumber - 1) * this.params.countItemsPerPage,
            end = start + this.params.countItemsPerPage;

        this.showItems_(start, end);
    };


    /**
     * Initializes items (Dom elements)
     * @param {Element} element
     */
    View.prototype.initItems = function(element) {
        var element = element || this.getElement();

        this.dom.items = this.getElementsByClass(
            sm.bSmItem.View.CssClass.ROOT,
            element
        );

        this.dom.itemContainers = this.getElementsByClass(
            sm.bSmItemList.View.CssClass.ITEM_CONTAINER,
            element
        );
    };


    /**
     * Show items (from start to end)
     * @param {number} start
     * @param {number} end
     * @private
     */
    View.prototype.showItems_ = function(start, end) {
        for (var i = start; i < end; i++) {
            itemContainer = this.dom.itemContainers[i];

            if (itemContainer) {
                this.show_(itemContainer);
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
        for (var i = start; i < end; i++) {
            itemContainer = this.dom.itemContainers[i];

            if (itemContainer) {
                this.hide_(itemContainer);
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
     * @return {bool}
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
     * @return {Element}
     * @private
     */
    View.prototype.renderItem_ = function(data) {
        return goog.soy.renderAsElement(
            sm.bSmItemList.Template.item, {
                params: {
                    'data': {
                        'item': data
                    },
                    'config': {
                        'type': this.params.itemType
                    }
                }
            }
        );
    };


    /**
     * Initializes list (container for items)
     * @param {Element} element
     * @private
     */
    View.prototype.initList_ = function(element) {
        var element = element || this.getElement();

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
        this.params = JSON.parse(
            goog.dom.dataset.get(
                this.getElement(),
                'params'
            )
        );

        if (this.params.countItemsPerPage) {
            this.params.pageNumber = 1;
        }
    };
});  // goog.scope
